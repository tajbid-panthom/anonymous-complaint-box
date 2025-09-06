import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

async function setupDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Read and execute the schema SQL file
    const schemaPath = path.join(process.cwd(), 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Setting up database schema...');
    
    // Split the SQL into individual statements and execute them
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await sql`${statement}`;
        console.log('✓ Executed statement');
      }
    }
    
    console.log('✅ Database setup completed successfully!');
    
    // Test the setup by checking if tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('📋 Created tables:', tables.map(t => t.table_name).join(', '));
    
    // Check if admin user exists
    const admins = await sql`SELECT username FROM admins`;
    console.log('👤 Admin users:', admins.map(a => a.username).join(', '));
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
