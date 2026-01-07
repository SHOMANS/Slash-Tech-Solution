const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Fetching products...');
  const products = await prisma.product.findMany();

  if (products.length === 0) {
    console.log(
      'No products found. Please create products in the admin panel first.'
    );
    return;
  }

  console.log(`Found ${products.length} product(s)\n`);

  for (const product of products) {
    console.log(`Product: ${product.title}`);
    console.log(`  Current slug: ${product.slug || '(none)'}`);

    if (!product.slug) {
      // Generate slug based on title
      let slug;
      const titleLower = product.title.toLowerCase();

      if (titleLower.includes('pos') || titleLower.includes('slash')) {
        slug = 'slash-pos';
      } else if (titleLower.includes('tourer') || titleLower.includes('tour')) {
        slug = 'tourer';
      } else {
        // Generate from title
        slug = titleLower
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
      }

      console.log(`  → Updating with slug: "${slug}"`);

      await prisma.product.update({
        where: { id: product.id },
        data: { slug },
      });
    }
    console.log('');
  }

  console.log('✓ All products updated!\n');

  const updated = await prisma.product.findMany({
    select: { title: true, slug: true, active: true },
  });

  console.log('Current products:');
  updated.forEach((p) => {
    console.log(
      `  - ${p.title}: /${p.slug} ${p.active ? '(active)' : '(inactive)'}`
    );
  });
}

main()
  .catch((e) => {
    console.error('Error:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
