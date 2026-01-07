'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Services
const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  order: z.number().int().min(0),
  active: z.boolean(),
});

export async function getServices(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const [services, total] = await Promise.all([
    prisma.service.findMany({
      orderBy: { order: 'asc' },
      skip,
      take: limit,
    }),
    prisma.service.count(),
  ]);
  return {
    services,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function createService(data: z.infer<typeof serviceSchema>) {
  const validated = serviceSchema.parse(data);
  await prisma.service.create({ data: validated });
  revalidatePath('/admin/services');
  revalidatePath('/');
}

export async function updateService(
  id: string,
  data: z.infer<typeof serviceSchema>
) {
  const validated = serviceSchema.parse(data);
  await prisma.service.update({ where: { id }, data: validated });
  revalidatePath('/admin/services');
  revalidatePath('/');
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath('/admin/services');
  revalidatePath('/');
}

export async function toggleServiceActive(id: string, active: boolean) {
  await prisma.service.update({ where: { id }, data: { active } });
  revalidatePath('/admin/services');
  revalidatePath('/');
}

// Portfolio
const portfolioSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Must be a valid URL'),
  technologies: z.array(z.string()).min(1, 'At least one technology required'),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  order: z.number().int().min(0),
  featured: z.boolean(),
  active: z.boolean(),
});

export async function getPortfolioProjects(
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;
  const [projects, total] = await Promise.all([
    prisma.portfolio.findMany({
      orderBy: { order: 'asc' },
      skip,
      take: limit,
    }),
    prisma.portfolio.count(),
  ]);
  return {
    projects,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function createPortfolio(data: z.infer<typeof portfolioSchema>) {
  const validated = portfolioSchema.parse(data);
  await prisma.portfolio.create({ data: validated });
  revalidatePath('/admin/portfolio');
  revalidatePath('/');
}

export async function updatePortfolio(
  id: string,
  data: z.infer<typeof portfolioSchema>
) {
  const validated = portfolioSchema.parse(data);
  await prisma.portfolio.update({ where: { id }, data: validated });
  revalidatePath('/admin/portfolio');
  revalidatePath('/');
}

export async function deletePortfolio(id: string) {
  await prisma.portfolio.delete({ where: { id } });
  revalidatePath('/admin/portfolio');
  revalidatePath('/');
}

export async function togglePortfolioActive(id: string, active: boolean) {
  await prisma.portfolio.update({ where: { id }, data: { active } });
  revalidatePath('/admin/portfolio');
  revalidatePath('/');
}

// Clients
const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logo: z.string().url('Must be a valid URL'),
  order: z.number().int().min(0),
  active: z.boolean(),
});

export async function getClients(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      orderBy: { order: 'asc' },
      skip,
      take: limit,
    }),
    prisma.client.count(),
  ]);
  return { clients, total, pages: Math.ceil(total / limit), currentPage: page };
}

export async function createClient(data: z.infer<typeof clientSchema>) {
  const validated = clientSchema.parse(data);
  await prisma.client.create({ data: validated });
  revalidatePath('/admin/clients');
  revalidatePath('/');
}

export async function updateClient(
  id: string,
  data: z.infer<typeof clientSchema>
) {
  const validated = clientSchema.parse(data);
  await prisma.client.update({ where: { id }, data: validated });
  revalidatePath('/admin/clients');
  revalidatePath('/');
}

export async function deleteClient(id: string) {
  await prisma.client.delete({ where: { id } });
  revalidatePath('/admin/clients');
  revalidatePath('/');
}

export async function toggleClientActive(id: string, active: boolean) {
  await prisma.client.update({ where: { id }, data: { active } });
  revalidatePath('/admin/clients');
  revalidatePath('/');
}

// Testimonials
export async function getTestimonialsAdmin(
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;
  const [testimonials, total] = await Promise.all([
    prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.testimonial.count(),
  ]);
  return {
    testimonials,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function toggleTestimonialApproved(id: string, approved: boolean) {
  await prisma.testimonial.update({ where: { id }, data: { approved } });
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

export async function toggleTestimonialActive(id: string, active: boolean) {
  await prisma.testimonial.update({ where: { id }, data: { active } });
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

// Contacts
export async function getContacts(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.contact.count(),
  ]);
  return {
    contacts,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function toggleContactRead(id: string, read: boolean) {
  await prisma.contact.update({ where: { id }, data: { read } });
  revalidatePath('/admin/contacts');
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({ where: { id } });
  revalidatePath('/admin/contacts');
}

// Products
const productSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only')
    .optional()
    .or(z.literal('')),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional().or(z.literal('')),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Must be a valid URL'),
  heroImage: z.string().url().optional().or(z.literal('')),
  productType: z.enum(['web', 'mobile']).default('web'),
  features: z.array(z.string()).min(1, 'At least one feature required'),
  benefits: z.array(z.string()),
  price: z.string().optional().or(z.literal('')),
  order: z.number().int().min(0),
  featured: z.boolean(),
  active: z.boolean(),
});

export async function getProducts(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      orderBy: { order: 'asc' },
      skip,
      take: limit,
    }),
    prisma.product.count(),
  ]);
  return {
    products,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function createProduct(data: z.infer<typeof productSchema>) {
  const validated = productSchema.parse(data);
  await prisma.product.create({ data: validated });
  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function updateProduct(
  id: string,
  data: z.infer<typeof productSchema>
) {
  const validated = productSchema.parse(data);
  await prisma.product.update({ where: { id }, data: validated });
  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function toggleProductActive(id: string, active: boolean) {
  await prisma.product.update({ where: { id }, data: { active } });
  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function toggleProductFeatured(id: string, featured: boolean) {
  await prisma.product.update({ where: { id }, data: { featured } });
  revalidatePath('/admin/products');
  revalidatePath('/');
}
