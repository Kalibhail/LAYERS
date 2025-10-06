const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      slug: 'layer-tee',
      title: 'Layer Tee',
      description: 'Premium cotton tee with layered graphic print.',
      price: 3800,
      currency: 'USD',
      image: '/products/layer-tee.svg',
      stock: 100,
      active: true,
    },
    {
      slug: 'layer-hoodie',
      title: 'Layer Hoodie',
      description: 'Heavyweight fleece hoodie with subtle logo embroidery.',
      price: 8900,
      currency: 'USD',
      image: '/products/layer-hoodie.svg',
      stock: 75,
      active: true,
    },
    {
      slug: 'layer-cap',
      title: 'Layer Cap',
      description: 'Structured cap with adjustable strap and tonal logo.',
      price: 3200,
      currency: 'USD',
      image: '/products/layer-cap.svg',
      stock: 150,
      active: true,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  const adminEmail = 'admin@example.com';
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN', hashedPassword: adminPassword, name: 'Admin' },
    create: { email: adminEmail, role: 'ADMIN', hashedPassword: adminPassword, name: 'Admin' },
  });
}

main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); return prisma.$disconnect(); });
