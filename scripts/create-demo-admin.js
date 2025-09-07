import { db } from './src/db/index.js';
import { admins } from './src/db/schema.js';
import bcrypt from 'bcryptjs';

async function createDemoAdmin() {
  try {
    const username = 'admin';
    const password = 'admin123';
    const role = 'super_admin';
    
    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);
    
    // Insert demo admin
    const result = await db.insert(admins).values({
      username,
      password_hash,
      role
    }).returning();
    
    console.log('✅ Demo admin created successfully!');
    console.log('📧 Username:', username);
    console.log('🔑 Password:', password);
    console.log('👤 Role:', role);
    console.log('🆔 Admin ID:', result[0].id);
    console.log('\n🎯 You can now login at: http://localhost:3000/admin');
    
    process.exit(0);
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      console.log('⚠️  Demo admin already exists!');
      console.log('📧 Username: admin');
      console.log('🔑 Password: admin123');
      console.log('🎯 Login at: http://localhost:3000/admin');
    } else {
      console.error('❌ Error creating demo admin:', error);
    }
    process.exit(1);
  }
}

createDemoAdmin();
