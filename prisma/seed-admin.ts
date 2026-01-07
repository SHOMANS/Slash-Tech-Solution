import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  host: 'aws-1-eu-west-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.mbauatxjibpbudczwllq',
  password: 'SHoman10*$S',
  database: 'postgres',
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Creating admin user...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@slashtech.com' },
    update: {},
    create: {
      email: 'admin@slashtech.com',
      password: hashedPassword,
      name: 'Admin User',
      active: true,
    },
  });

  console.log('Admin user created!');
  console.log('Email: admin@slashtech.com');
  console.log('Password: admin123');
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
