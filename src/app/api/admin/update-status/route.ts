import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { complaints, audit_logs } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // TODO: Check admin session cookie
    const body = await request.json();
    const { case_id, status, admin_id } = body;
    
    if (!case_id || !status || !admin_id) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    // Get current status for audit log
    const currentComplaint = await db.select().from(complaints).where(eq(complaints.case_id, case_id)).limit(1);
    const oldStatus = currentComplaint[0]?.status || 'Unknown';
    
    // Update complaint status
    await db.update(complaints).set({ status }).where(eq(complaints.case_id, case_id));
    
    // Log the action
    await db.insert(audit_logs).values({
      case_id,
      admin_id,
      action: `Status updated to ${status}`,
      old_status: oldStatus,
      new_status: status,
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
