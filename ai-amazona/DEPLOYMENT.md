# Netlify Deployment Guide

## Prerequisites

1. ✅ Build is working locally (`npm run build` completes successfully)
2. ✅ Code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Important Database Consideration ⚠️

Your app currently uses **SQLite** with Prisma, but SQLite doesn't work in serverless environments like Netlify. You'll need to:

**Option 1: Use a Cloud Database (Recommended)**
- Switch to PostgreSQL with a service like:
  - [Supabase](https://supabase.com) (free tier available)
  - [Neon](https://neon.tech) (free tier available)
  - [Railway](https://railway.app) (affordable PostgreSQL)
  - [PlanetScale](https://planetscale.com) (MySQL)

**Option 2: Use SQLite with File Storage**
- Use a service like [Turso](https://turso.tech) for SQLite in the cloud

## Environment Variables Setup

You'll need to configure these environment variables in Netlify:

```env
# Database
DATABASE_URL="your_database_url_here"

# NextAuth Configuration
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="https://your-site-name.netlify.app"

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"

# Email Configuration (Resend)
RESEND_API_KEY="your_resend_api_key"

# UploadThing Configuration
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

## Deployment Steps

### 1. Prepare Your Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Sign in with your Git provider
3. Click "New site from Git"
4. Choose your repository

### 3. Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Base directory**: (leave empty)

### 4. Environment Variables
In Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add all the environment variables listed above

### 5. Deploy
Click "Deploy site" - Netlify will automatically build and deploy your app!

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test user authentication
- [ ] Test product browsing
- [ ] Test cart functionality
- [ ] Test checkout process (with test Stripe keys)
- [ ] Verify API routes work
- [ ] Check database connectivity

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all environment variables are set
- Verify database connection

### 404 Errors
- Check that redirects in `netlify.toml` are correct
- Ensure `@netlify/plugin-nextjs` is working

### API Routes Not Working
- Verify environment variables are set
- Check function logs in Netlify dashboard
- Ensure database is accessible from serverless environment

## Custom Domain (Optional)
1. Go to Domain management in Netlify
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable 