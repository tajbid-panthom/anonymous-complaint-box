import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

async function markMigrationAsApplied() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Read the journal to get the migration info
    const journalPath = path.join(process.cwd(), 'drizzle/meta/_journal.json');
    const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
    
    console.log('Journal entries:', journal.entries);
    
    // Get the first (and should be only) migration entry
    const migration = journal.entries[0];
    if (!migration) {
      console.error('No migrations found in journal');
      return;
    }
    
    // Read the actual migration file
    const migrationPath = path.join(process.cwd(), `drizzle/${migration.tag}.sql`);
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Migration tag:', migration.tag);
    console.log('Migration when:', migration.when);
    
    // Clear existing migration records
    await sql`DELETE FROM __drizzle_migrations WHERE 1=1`;
    
    // Insert the migration record with the exact metadata Drizzle expects
    await sql`
      INSERT INTO __drizzle_migrations (hash, created_at) 
      VALUES (${migrationSQL}, ${migration.when});
    `;
    
    console.log('✅ Migration marked as applied successfully');
    
    // Verify
    const migrations = await sql`SELECT hash, created_at FROM __drizzle_migrations`;
    console.log('Applied migrations count:', migrations.length);
    
  } catch (error) {
    console.error('❌ Error marking migration as applied:', error);
    process.exit(1);
  }
}

markMigrationAsApplied();
