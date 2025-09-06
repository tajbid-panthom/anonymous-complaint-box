import { NextResponse } from 'next/server';
import { db } from '@/db';
import { complaints } from '@/db/schema';

export async function GET() {
  try {
    // TODO: Check admin session cookie
    const allComplaints = await db.select().from(complaints);
    
    const csv = [
      'CaseID,Category,Location,Description,Status,CreatedAt',
      ...allComplaints.map(c => 
        `${c.case_id},"${c.category}","${c.location}","${(c.description || '').replace(/"/g, '""')}","${c.status}","${c.created_at}"`
      )
    ].join('\n');
    
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="complaints.csv"',
      },
    });
  } catch (error) {
    console.error('Error exporting complaints:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
