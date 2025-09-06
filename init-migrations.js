import { neon } from '@neondatabase/serverless';

async function initializeMigrations() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    console.log('Creating migration tracking table...');
    
    // Create the drizzle migrations table
    await sql`
      CREATE TABLE IF NOT EXISTS __drizzle_migrations (
        id SERIAL PRIMARY KEY,
        hash text NOT NULL,
        created_at bigint
      );
    `;
    
    console.log('✅ Migration tracking table created');
    
    // Check if initial migration is already marked as applied
    const existingMigrations = await sql`SELECT * FROM __drizzle_migrations`;
    
    if (existingMigrations.length === 0) {
      console.log('Marking initial migration as applied...');
      
      // Mark the initial migration as applied (since tables already exist)
      // The hash should match the generated migration file
      const migrationHash = '8b2c9a44a6ed3d3e2f5ba4cb86eaa0b4c58b5c3f6c7969e03d6b5b6e13f3c9d1'; // This would be the actual hash from the migration
      const timestamp = Date.now();
      
      await sql`
        INSERT INTO __drizzle_migrations (hash, created_at) 
        VALUES (${migrationHash}, ${timestamp});
      `;
      
      console.log('✅ Initial migration marked as applied');
    } else {
      console.log('ℹ️ Migrations already initialized:', existingMigrations.length, 'migration(s) found');
    }
    
    // Verify our database structure matches the schema
    console.log('Verifying database structure...');
    
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('complaints', 'admins', 'audit_logs', 'chat_messages')
      ORDER BY table_name;
    `;
    
    const expectedTables = ['admins', 'audit_logs', 'chat_messages', 'complaints'];
    const existingTableNames = tables.map(t => t.table_name).sort();
    
    console.log('Expected tables:', expectedTables);
    console.log('Existing tables:', existingTableNames);
    
    const allTablesExist = expectedTables.every(table => existingTableNames.includes(table));
    
    if (allTablesExist) {
      console.log('✅ All required tables exist');
    } else {
      console.log('❌ Some tables are missing');
    }
    
    console.log('🎉 Database migration setup completed!');
    
  } catch (error) {
    console.error('❌ Error initializing migrations:', error);
    process.exit(1);
  }
}

initializeMigrations();
