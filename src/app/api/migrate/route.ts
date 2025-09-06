import { NextResponse } from 'next/server';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { db } from '@/db';

export async function POST() {
  try {
    console.log('Starting migration...');
    
    await migrate(db, { 
      migrationsFolder: './drizzle',
      migrationsTable: '__drizzle_migrations',
    });
    
    console.log('Migration completed successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database migration completed successfully' 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Migration failed:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Migration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint is available. Use POST to run migrations.',
    usage: 'curl -X POST https://your-app.vercel.app/api/migrate'
  });
}
