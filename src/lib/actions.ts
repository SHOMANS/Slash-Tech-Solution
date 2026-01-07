'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(1000),
});

export async function submitContact(data: z.infer<typeof contactSchema>) {
  try {
    const validated = contactSchema.parse(data);

    const contact = await prisma.contact.create({
      data: validated,
    });

    return { success: true, id: contact.id };
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { success: false, error: 'Failed to submit contact form' };
  }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getPortfolioProjects() {
  try {
    const projects = await prisma.portfolio.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
}

export async function getClients() {
  try {
    const clients = await prisma.client.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return clients;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        active: true,
        approved: true, // Only show approved testimonials
      },
      orderBy: { createdAt: 'desc' },
      take: 3, // Only get the 3 newest testimonials
    });

    // Map database fields to expected interface
    return testimonials.map((t) => ({
      ...t,
      name: t.author,
      message: t.quote,
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getAllTestimonials(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where: { active: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.testimonial.count({ where: { active: true } }),
    ]);

    return {
      testimonials,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    return { testimonials: [], total: 0, pages: 0, currentPage: 1 };
  }
}

const testimonialSchema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100),
  role: z.string().min(2, 'Role must be at least 2 characters').max(100),
  rating: z.number().min(1).max(5),
  quote: z.string().min(20, 'Review must be at least 20 characters').max(1000),
});

export async function submitTestimonial(
  data: z.infer<typeof testimonialSchema>
) {
  try {
    const validated = testimonialSchema.parse(data);

    // Generate avatar with initials
    const initials = validated.author
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const colors = ['3b82f6', '8b5cf6', '06b6d4', '10b981', 'f59e0b', 'ef4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const testimonial = await prisma.testimonial.create({
      data: {
        ...validated,
        avatar: `https://placehold.co/100x100/${randomColor}/ffffff?text=${initials}`,
        approved: true, // Auto-approve for immediate display
      },
    });

    revalidatePath('/reviews');
    return { success: true, id: testimonial.id };
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return { success: false, error: 'Failed to submit review' };
  }
}
