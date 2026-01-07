import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Parse connection string explicitly to avoid pg using system username
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
  console.log('Seeding database...');

  // Clear existing data
  await prisma.testimonial.deleteMany();
  await prisma.client.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.service.deleteMany();

  // Seed Services
  const services = await prisma.service.createMany({
    data: [
      {
        title: 'Web Development',
        description:
          'Custom web applications built with modern technologies like React, Next.js, and Node.js. We create responsive, fast, and scalable solutions.',
        icon: 'Code',
        order: 1,
      },
      {
        title: 'Mobile Development',
        description:
          'Native and cross-platform mobile apps for iOS and Android. Beautiful interfaces with seamless performance.',
        icon: 'Smartphone',
        order: 2,
      },
      {
        title: 'UI/UX Design',
        description:
          'User-centered design that combines aesthetics with functionality. We create intuitive interfaces that users love.',
        icon: 'Palette',
        order: 3,
      },
      {
        title: 'Cloud Solutions',
        description:
          'Scalable cloud infrastructure and deployment. AWS, Azure, and Google Cloud expertise for reliable hosting.',
        icon: 'Cloud',
        order: 4,
      },
      {
        title: 'Consulting',
        description:
          'Technical consulting and architecture planning. We help you make the right technology decisions for your business.',
        icon: 'Users',
        order: 5,
      },
      {
        title: 'Maintenance & Support',
        description:
          '24/7 support and ongoing maintenance. We ensure your systems run smoothly and stay up-to-date.',
        icon: 'Wrench',
        order: 6,
      },
    ],
  });

  // Seed Portfolio
  const portfolio = await prisma.portfolio.createMany({
    data: [
      {
        title: 'E-Commerce Dashboard',
        description:
          'A comprehensive admin dashboard for managing online stores with real-time analytics, inventory management, and order processing.',
        image:
          'https://placehold.co/600x400/3b82f6/ffffff?text=E-Commerce+Dashboard',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
        liveUrl: '#',
        githubUrl: '#',
        order: 1,
        featured: true,
      },
      {
        title: 'Mobile Banking App',
        description:
          'Secure and intuitive mobile banking solution with biometric authentication, transaction history, and instant transfers.',
        image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Banking+App',
        technologies: ['React Native', 'Firebase', 'Redux', 'Jest'],
        liveUrl: '#',
        githubUrl: '#',
        order: 2,
        featured: true,
      },
      {
        title: 'Restaurant Management System',
        description:
          'Complete restaurant management platform with table reservations, menu management, and integrated POS system.',
        image:
          'https://placehold.co/600x400/06b6d4/ffffff?text=Restaurant+System',
        technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
        liveUrl: '#',
        githubUrl: '#',
        order: 3,
      },
      {
        title: 'Healthcare Portal',
        description:
          'Patient management system with appointment scheduling, medical records, and telemedicine capabilities.',
        image:
          'https://placehold.co/600x400/10b981/ffffff?text=Healthcare+Portal',
        technologies: ['Vue.js', 'Express', 'MongoDB', 'WebRTC'],
        liveUrl: '#',
        githubUrl: '#',
        order: 4,
      },
      {
        title: 'Social Media Analytics',
        description:
          'Advanced analytics platform for tracking social media performance across multiple platforms with AI-powered insights.',
        image:
          'https://placehold.co/600x400/f59e0b/ffffff?text=Analytics+Platform',
        technologies: ['Angular', 'Python', 'TensorFlow', 'Redis'],
        liveUrl: '#',
        githubUrl: '#',
        order: 5,
      },
      {
        title: 'Logistics Tracking App',
        description:
          'Real-time package tracking and fleet management system with route optimization and delivery notifications.',
        image: 'https://placehold.co/600x400/ef4444/ffffff?text=Logistics+App',
        technologies: ['Flutter', 'Django', 'GraphQL', 'AWS'],
        liveUrl: '#',
        githubUrl: '#',
        order: 6,
      },
    ],
  });

  // Seed Clients
  const clients = await prisma.client.createMany({
    data: [
      {
        name: 'TechCorp',
        logo: 'https://placehold.co/200x80/e5e7eb/374151?text=TechCorp',
        order: 1,
      },
      {
        name: 'InnovateLabs',
        logo: 'https://placehold.co/200x80/e5e7eb/374151?text=InnovateLabs',
        order: 2,
      },
      {
        name: 'Digital Solutions',
        logo: 'https://placehold.co/200x80/e5e7eb/374151?text=Digital+Solutions',
        order: 3,
      },
      {
        name: 'CloudFirst',
        logo: 'https://placehold.co/200x80/e5e7eb/374151?text=CloudFirst',
        order: 4,
      },
      {
        name: 'StartupHub',
        logo: 'https://placehold.co/200x80/e5e7eb/374151?text=StartupHub',
        order: 5,
      },
      {
        name: 'Enterprise Co',
        logo: 'https://placehold.co/200x80/e5e7eb/374151?text=Enterprise+Co',
        order: 6,
      },
    ],
  });

  // Seed Testimonials
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        quote:
          "Slash Tech Solution transformed our business operations with their innovative POS system. The team's expertise and dedication are unmatched.",
        author: 'Sarah Johnson',
        email: 'sarah.johnson@retailexcellence.com',
        role: 'CEO',
        company: 'Retail Excellence',
        rating: 5,
        avatar: 'https://placehold.co/100x100/3b82f6/ffffff?text=SJ',
        approved: true,
        order: 1,
      },
      {
        quote:
          'Working with Slash Tech was a game-changer. They delivered a mobile app that exceeded our expectations and continues to delight our users.',
        author: 'Michael Chen',
        email: 'michael@tourguidepro.com',
        role: 'Founder',
        company: 'TourGuide Pro',
        rating: 5,
        avatar: 'https://placehold.co/100x100/8b5cf6/ffffff?text=MC',
        approved: true,
        order: 2,
      },
      {
        quote:
          'Professional, creative, and reliable. The team at Slash Tech Solution brings ideas to life with precision and care.',
        author: 'Emily Davis',
        email: 'emily@digitalinnovations.com',
        role: 'CTO',
        company: 'Digital Innovations',
        rating: 5,
        avatar: 'https://placehold.co/100x100/06b6d4/ffffff?text=ED',
        approved: true,
        order: 3,
      },
    ],
  });

  console.log('Database seeded successfully!');
  console.log(`Created ${services.count} services`);
  console.log(`Created ${portfolio.count} portfolio projects`);
  console.log(`Created ${clients.count} clients`);
  console.log(`Created ${testimonials.count} testimonials`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
