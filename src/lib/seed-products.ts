import prisma from './prisma';

async function seedProducts() {
  const products = [
    {
      title: 'Slash POS',
      description:
        'A comprehensive, cloud-based POS solution designed for modern businesses. Manage inventory, process sales, track analytics, and streamline operations from anywhere.',
      image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Slash+POS',
      features: [
        'Inventory Management',
        'Real-time Analytics',
        'Multi-location Support',
        'Cloud-based',
      ],
      price: null,
      order: 1,
      featured: true,
      active: true,
    },
    {
      title: 'Tourer',
      description:
        'Your ultimate companion for exploring South Africa. Discover amazing places, hire expert tour guides, and create unforgettable experiences.',
      image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Tourer+App',
      features: [
        'Place Discovery',
        'Tour Guide Booking',
        'Offline Maps',
        'Local Experiences',
      ],
      price: null,
      order: 2,
      featured: true,
      active: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Seeded', products.length, 'products');
}

seedProducts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
