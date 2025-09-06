import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { admins } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }
    
    const admin = await db.select().from(admins).where(eq(admins.username, username)).limit(1);
    
    if (!admin.length) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const valid = admin[0].password_hash && await bcrypt.compare(password, admin[0].password_hash);
    
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Create response with success
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    // Set a simple session cookie (for demo, use JWT for production)
    response.cookies.set('admin_session', admin[0].id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
