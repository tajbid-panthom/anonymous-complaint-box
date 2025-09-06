import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { complaints } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, location, description, evidence_url, pin } = body;
    
    if (!category || !location || !description || !pin) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const case_id = nanoid(10);
    const pin_hash = await bcrypt.hash(pin, 10);
    
    await db.insert(complaints).values({
      category,
      location,
      description,
      evidence_url,
      status: 'Received',
      case_id,
      pin_hash,
    }).returning();
    
    return NextResponse.json({ case_id, pin }, { status: 201 });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
