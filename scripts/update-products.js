const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // First, let's see what products we have
  const products = await prisma.product.findMany();
  console.log('Current products:', JSON.stringify(products, null, 2));

  // Update products with slugs if they don't have them
  if (products.length > 0) {
    for (const product of products) {
      if (!product.slug) {
        let slug = '';
        if (product.title.toLowerCase().includes('pos')) {
          slug = 'slash-pos';
        } else if (product.title.toLowerCase().includes('tourer')) {
          slug = 'tourer';
        } else {
          // Generate slug from title
          slug = product.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        }

        console.log(`Updating ${product.title} with slug: ${slug}`);
        await prisma.product.update({
          where: { id: product.id },
          data: {
            slug,
            subtitle: product.subtitle || null,
            heroImage: product.heroImage || null,
            benefits: product.benefits || [],
          },
        });
      }
    }

    console.log('\nUpdated products:');
    const updated = await prisma.product.findMany();
    console.log(JSON.stringify(updated, null, 2));
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
