import { NextResponse } from 'next/server';
import { db } from '@/db';
import { complaints } from '@/db/schema';

export async function GET() {
  try {
    // TODO: Check admin session cookie
    // Analytics: complaint counts by category and status
    const allComplaints = await db.select().from(complaints);
    
    const byCategory: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    
    allComplaints.forEach(c => {
      const cat = c.category ?? 'Unknown';
      const stat = c.status ?? 'Unknown';
      byCategory[cat] = (byCategory[cat] || 0) + 1;
      byStatus[stat] = (byStatus[stat] || 0) + 1;
    });
    
    return NextResponse.json({ byCategory, byStatus }, { status: 200 });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
