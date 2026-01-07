const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  
  if (products.length === 0) {
    console.log('No products found.');
    return;
  }

  for (const product of products) {
    if (!product.slug) {
      let slug;
      const titleLower = product.title.toLowerCase();
      
      if (titleLower.includes('pos')) {
        slug = 'slash-pos';
      } else if (titleLower.includes('tourer')) {
        slug = 'tourer';
      } else {
        slug = titleLower.replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
      }

      await prisma.product.update({
        where: { id: product.id },
        data: { slug }
      });
      console.log('Updated:', product.title, '→', slug);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
