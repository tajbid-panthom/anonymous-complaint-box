import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { db } from '@/db';
import { complaints } from '@/db/schema';

export async function GET() {
  try {
    // TODO: Check admin session cookie
  const allComplaints = await db.select().from(complaints).orderBy(desc(complaints.created_at));
    return NextResponse.json({ complaints: allComplaints }, { status: 200 });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
