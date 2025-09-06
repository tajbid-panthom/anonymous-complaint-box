import { neon } from '@neondatabase/serverless';

async function checkMigrationStatus() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Check if migration table exists
    const migrationTableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '__drizzle_migrations'
      );
    `;
    
    console.log('Migration table exists:', migrationTableExists[0].exists);
    
    if (migrationTableExists[0].exists) {
      const migrations = await sql`SELECT * FROM __drizzle_migrations ORDER BY created_at`;
      console.log('Applied migrations:', migrations);
    }
    
    // Check existing tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    console.log('Existing tables:', tables.map(t => t.table_name));
    
    // Check if our tables have the correct structure
    const complaintsColumns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'complaints' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;
    
    console.log('Complaints table structure:');
    complaintsColumns.forEach(col => {
      console.log(`  ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'} ${col.column_default ? `DEFAULT ${col.column_default}` : ''}`);
    });
    
  } catch (error) {
    console.error('Error checking migration status:', error);
  }
}

checkMigrationStatus();
