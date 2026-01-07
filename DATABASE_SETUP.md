# Database Setup Guide

## 🚀 Quick Start with Supabase (Recommended)

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: slash-tech-solution
   - **Database Password**: (choose a strong password - save this!)
   - **Region**: Choose closest to your location
4. Click "Create new project"

### 2. Get Your Database URL

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string** → **Connection pooling** (Recommended for serverless)
3. Copy the connection string (it will look like):
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
4. Replace `[YOUR-PASSWORD]` with your actual database password

### 3. Update Your .env File

Update `/Users/shoman/coding/Slash/slash-tech-solution/.env`:

```env
DATABASE_URL="postgresql://postgres.xxx:your-password@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### 4. Push Database Schema

```bash
# Generate Prisma Client
pnpm db:generate

# Push schema to database (creates tables)
pnpm db:push
```

### 5. Seed Initial Data

```bash
# Populate database with sample data
pnpm db:seed
```

### 6. Verify Database

```bash
# Open Prisma Studio to view your data
pnpm db:studio
```

Or check in Supabase Dashboard → Table Editor

## 📊 Database Schema

We have 5 tables:

1. **contacts** - Contact form submissions
2. **services** - Services offered (Web Dev, Mobile, etc.)
3. **portfolio** - Portfolio projects showcase
4. **clients** - Client logos
5. **testimonials** - Client testimonials

## 🔄 Alternative: Local PostgreSQL with Docker

If you prefer running locally:

```bash
# Run PostgreSQL in Docker
docker run -d \
  --name slash-tech-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=slash_tech_dev \
  -p 5432:5432 \
  postgres:15

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/slash_tech_dev"

# Then run:
pnpm db:push
pnpm db:seed
```

## 🛠️ Available Commands

```bash
pnpm db:generate  # Generate Prisma Client
pnpm db:push      # Push schema changes to database
pnpm db:seed      # Seed database with sample data
pnpm db:studio    # Open Prisma Studio (database GUI)
```

## 📝 Next Steps

After setting up the database, the following sections will automatically fetch data:

- ✅ Services Section (dynamic from DB)
- ✅ Portfolio Section (dynamic from DB)
- ✅ Clients Section (dynamic from DB)
- ✅ Testimonials Section (dynamic from DB)
- ✅ Contact Form (saves to DB)

## 🔒 Security Notes

- Never commit your `.env` file
- Use strong database passwords
- Enable Row Level Security in Supabase for production
- Consider adding database backups

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
