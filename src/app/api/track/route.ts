import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, referrer } = body;

    // Only track home page and product pages
    if (page !== '/' && !page.startsWith('/product/')) {
      return NextResponse.json({ success: true, skipped: true });
    }

    // Get IP address
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Skip localhost/development traffic
    if (
      ip.startsWith('127.0.0') ||
      ip === '::1' ||
      ip === 'localhost' ||
      ip === 'unknown'
    ) {
      return NextResponse.json({ success: true, skipped: true });
    }

    // Get user agent
    const userAgent = request.headers.get('user-agent') || undefined;

    // Get country and city from Vercel/Cloudflare headers if available
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      undefined;

    const city = request.headers.get('x-vercel-ip-city') || undefined;

    // Create visit record
    await prisma.visit.create({
      data: {
        ip,
        userAgent,
        page,
        referrer: referrer || undefined,
        country,
        city,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}
