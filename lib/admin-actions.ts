'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function login(formData: FormData) {
  const validated = loginSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const admin = await prisma.admin.findUnique({
    where: { email: validated.email, active: true },
  });

  if (!admin || !(await bcrypt.compare(validated.password, admin.password))) {
    return { error: 'Invalid email or password' };
  }

  await createSession(admin.id, admin.email, admin.name);
  redirect('/admin');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
