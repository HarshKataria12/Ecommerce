import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding database...');

  // 1. Clear out any existing data to avoid duplicates if you run this multiple times
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // 2. Create Product 1 (With variants)
  await prisma.product.create({
    data: {
      name: "Classic White T-Shirt",
      category: "Apparel",
      priceCents: 2500, // $25.00
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      inStock: true,
      variants: {
        create: [
          { label: "Small" },
          { label: "Medium" },
          { label: "Large" }
        ]
      }
    }
  });

  // 3. Create Product 2 (With variants)
  await prisma.product.create({
    data: {
      name: "Leather Sneakers",
      category: "Footwear",
      priceCents: 8900, // $89.00
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      inStock: true,
      variants: {
        create: [
          { label: "US 9" },
          { label: "US 10" },
          { label: "US 11" }
        ]
      }
    }
  });

  // 4. Create Product 3 (Out of stock, no variants)
  await prisma.product.create({
    data: {
      name: "Wireless Headphones",
      category: "Electronics",
      priceCents: 15000, // $150.00
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      inStock: false, 
    }
  });

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });