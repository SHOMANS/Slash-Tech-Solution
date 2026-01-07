const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log('Found', products.length, 'products\n');
  
  for (const product of products) {
    let slug = product.slug;
    
    if (!slug) {
      if (product.title.toLowerCase().includes('pos')) {
        slug = 'slash-pos';
      } else if (product.title.toLowerCase().includes('tourer')) {
        slug = 'tourer';
      } else {
        slug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      
      await prisma.product.update({
        where: { id: product.id },
        data: { slug }
      });
      console.log('✓ Updated', product.title, '→', slug);
    } else {
      console.log('→', product.title, 'already has:', slug);
    }
  }
  
  await prisma.$disconnect();
  console.log('\n✓ Done!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
