# Slash Tech Solution Website

A modern, responsive landing page and product showcase for Slash Tech Solution, built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

## 🚀 Features

- **Modern Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Smooth Animations**: Framer Motion for engaging scroll animations and transitions
- **Dark Mode**: System-aware theme switching with manual toggle
- **Responsive Design**: Mobile-first approach with beautiful layouts on all devices
- **Product Pages**: Dedicated pages for Slash POS and Tourer products
- **Portfolio Section**: Showcase of demo projects and case studies
- **Form Validation**: React Hook Form with Zod schema validation
- **Optimized Performance**: Fast loading times and smooth interactions

## 📦 Tech Stack

- **Framework**: Next.js 16.1.1
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Form Management**: React Hook Form + Zod
- **Icons**: Lucide React
- **Theme**: next-themes
- **Language**: TypeScript 5
- **Package Manager**: pnpm 10.13.1

## 🎨 Sections

### Home Page (`/`)

- Hero Section with animated gradient background
- About Us section with company information
- Services showcase (6 core services)
- Products overview (Slash POS & Tourer)
- Portfolio with demo projects
- Client testimonials and logos
- Contact form with validation

### Dynamic Product Pages

- **Product Details** (`/product/[id]`) - Dynamic product pages with type-based rendering (web/mobile)
  - Web products display with browser mockup and blue/cyan theme
  - Mobile products display with phone mockup and purple/pink theme

### Admin Panel

- **Analytics Dashboard** (`/admin/analytics`) - Track website visits and user analytics
- **Content Management** - Manage products, services, portfolio, clients, and testimonials
- **Secure Login** - Protected admin routes with JWT authentication

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 10.x or higher

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd slash-tech-solution

# Install dependencies
pnpm install

# Copy environment variables (optional)
cp .env.example .env.local

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## 🎨 Customization

### Update Content

1. **Company Information**: Edit content in component files under `/src/components/sections/`
2. **Product Details**: Use the admin panel at `/admin/products` to manage products
3. **Portfolio Projects**: Use the admin panel at `/admin/portfolio` to manage projects
4. **Contact Info**: Update details in `/src/components/sections/contact-section.tsx`

### Update Styling

- **Colors**: Modify brand colors in `/src/app/globals.css` under `@theme inline`
- **Components**: Customize UI components in `/src/components/ui/`
- **Typography**: Update font settings in `/src/app/layout.tsx`

### Configure Contact Form

Replace the placeholder submission logic in `/components/sections/contact-section.tsx`:

```typescript
// TODO: Replace with actual API endpoint
await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

## 🌙 Dark/Light Mode

The website includes a fully functional dark/light mode system:

- **System Preference**: Automatically detects your system theme on first visit
- **Manual Toggle**: Click the sun/moon icon in the navbar to switch themes
- **Persistent**: Theme choice is saved in local storage
- **Smooth Transitions**: Animated theme changes with icon rotations

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Navigation automatically switches to mobile menu below 1024px.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Other Platforms

```bash
# Build the application
pnpm build

# The output will be in the `.next` folder
# Start the production server
pnpm start
```

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support, email info@slashtech.com

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
