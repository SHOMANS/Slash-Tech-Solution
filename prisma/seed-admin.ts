import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Creating admin user...');

  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@slashtech.com';

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin User',
      active: true,
    },
  });

  console.log('Admin user created!');
  console.log('Email:', adminEmail);
  console.log('Password:', defaultPassword);
  console.log('Please change this password after first login');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
