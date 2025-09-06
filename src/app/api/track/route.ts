import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { complaints } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { case_id, pin } = body;
    
    if (!case_id || !pin) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const complaint = await db.select().from(complaints).where(eq(complaints.case_id, case_id)).limit(1);
    
    if (!complaint.length) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    
    const valid = complaint[0].pin_hash && await bcrypt.compare(pin, complaint[0].pin_hash);
    
    if (!valid) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 403 });
    }
    
    return NextResponse.json({ complaint: complaint[0] }, { status: 200 });
  } catch (error) {
    console.error('Error tracking complaint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
