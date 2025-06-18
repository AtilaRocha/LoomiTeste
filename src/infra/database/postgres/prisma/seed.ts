import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@loomi.com.br';
  const clientEmail = 'cliente@loomi.com.br';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: hashedAdminPassword,
        type: 'admin',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log('✅ Admin user created successfully!');
  } else {
    console.log('ℹ️ Admin already exists');
  }

  const existingClient = await prisma.user.findUnique({
    where: { email: clientEmail },
  });

  if (!existingClient) {
    const hashedClientPassword = await bcrypt.hash('cliente123', 10);

    await prisma.user.create({
      data: {
        name: 'Client',
        email: clientEmail,
        password: hashedClientPassword,
        type: 'client',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log('✅ Client user created successfully!');
  } else {
    console.log('ℹ️ Client already exists');
  }
}

main()
  .catch((error) => {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
