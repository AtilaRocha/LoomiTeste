import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@loomi.com.br';

  const adminExists = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminExists) {
    const password = await bcrypt.hash('admin123', 10);

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password,
        type: 'admin',
        email_verified: true,
      },
    });

    console.log('✅ Admin created!');
  } else {
    console.log('ℹ️ Admin already exists');
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
