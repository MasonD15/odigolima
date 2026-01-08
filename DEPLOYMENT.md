# Deployment Guide - Odigolima

This guide covers deploying the Odigolima sales site independently from Lovable.

## Project Information

- **New Supabase Project ID**: `mmjoucpdftjvpdmiamfo`
- **Supabase URL**: `https://mmjoucpdftjvpdmiamfo.supabase.co`
- **Tech Stack**: React + Vite + Supabase + shadcn/ui

---

## Prerequisites

1. **Node.js & npm** installed (recommend using nvm)
2. **Supabase CLI** installed globally:
   ```bash
   npm install -g supabase
   ```
3. **Vercel CLI** (for frontend deployment):
   ```bash
   npm install -g vercel
   ```

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Link to Supabase Project

Link this project to your Supabase account:

```bash
npx supabase link --project-ref mmjoucpdftjvpdmiamfo
```

When prompted, enter your Supabase database password.

---

## Step 3: Set Supabase Secrets

You need to set these environment variables in Supabase for the edge function:

### Required Secrets:

1. **BETA_INVITE_CODE** - The invite code users need to enter
2. **EXTERNAL_SIGNUP_API_KEY** - API key for calling the ad-orchestrator
3. **ADORCH_SUPABASE_ANON_KEY** - Anon key from your ad-orchestrator Supabase project (https://tnxdhrjfpmrvajvlejjv.supabase.co)
4. **RESEND_API_KEY** (optional) - If using Resend for emails

### Set them with:

```bash
# Set invite code
npx supabase secrets set BETA_INVITE_CODE="your-invite-code-here"

# Set external signup API key
npx supabase secrets set EXTERNAL_SIGNUP_API_KEY="your-api-key-here"

# Set ad-orchestrator anon key (get from https://tnxdhrjfpmrvajvlejjv.supabase.co settings)
npx supabase secrets set ADORCH_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Set Resend API key (optional)
npx supabase secrets set RESEND_API_KEY="re_..."
```

To view all secrets:
```bash
npx supabase secrets list
```

---

## Step 4: Deploy Edge Function

Deploy the `external-signup` edge function:

```bash
npx supabase functions deploy external-signup
```

After deployment, test it:
```bash
npx supabase functions invoke external-signup --body '{"name":"Test User","email":"test@example.com","inviteCode":"your-code","plan":"free"}'
```

---

## Step 5: Run Database Migrations

If you have any database migrations, run them:

```bash
npx supabase db push
```

---

## Step 6: Update Frontend Environment Variables

The `.env` file has already been updated with:
```
VITE_SUPABASE_PROJECT_ID="mmjoucpdftjvpdmiamfo"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_XrACq49TNBZyqXRCqZBexw_b1YrZvGi"
VITE_SUPABASE_URL="https://mmjoucpdftjvpdmiamfo.supabase.co"
```

**IMPORTANT**: Verify that `VITE_SUPABASE_PUBLISHABLE_KEY` is the correct anon key from your Supabase project. You can find it in:
- Supabase Dashboard > Settings > API > Project API keys > `anon` `public`

If it's different, update the `.env` file.

---

## Step 7: Test Locally

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` and test the signup flow.

---

## Step 8: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. On first deployment, configure:
   - **Project Name**: odigolima
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Set environment variables in Vercel:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
   vercel env add VITE_SUPABASE_PROJECT_ID
   ```

5. Deploy to production:
   ```bash
   vercel --prod
   ```

### Option B: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub: `https://github.com/MasonD15/odigolima`
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL` = `https://mmjoucpdftjvpdmiamfo.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = (your anon key)
   - `VITE_SUPABASE_PROJECT_ID` = `mmjoucpdftjvpdmiamfo`
6. Click "Deploy"

---

## Step 9: Configure Custom Domain

### On Vercel:
1. Go to your project > Settings > Domains
2. Add `odigoleads.com` and `www.odigoleads.com`
3. Vercel will provide DNS records

### On your DNS provider:
1. Add an A record pointing `@` to Vercel's IP (76.76.21.21)
2. Add a CNAME record pointing `www` to your Vercel deployment

---

## Troubleshooting

### Edge Function Issues

View logs:
```bash
npx supabase functions logs external-signup
```

### Check if secrets are set:
```bash
npx supabase secrets list
```

### Frontend not connecting to Supabase:
1. Check `.env` file has correct values
2. Restart dev server after changing `.env`
3. Verify anon key in Supabase dashboard matches `.env`

---

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy edge function
npx supabase functions deploy external-signup

# View function logs
npx supabase functions logs external-signup

# Deploy to Vercel
vercel --prod

# Check Supabase status
npx supabase status
```

---

## Next Steps

1. ✅ Update all configuration files to new Supabase project
2. ⏳ Deploy edge function with proper secrets
3. ⏳ Test signup flow end-to-end
4. ⏳ Deploy frontend to Vercel
5. ⏳ Configure custom domain (odigoleads.com)
6. ⏳ Monitor logs and fix any issues

---

## Notes

- The edge function calls the ad-orchestrator API at `https://tnxdhrjfpmrvajvlejjv.supabase.co/functions/v1/external-signup`
- You're no longer using Lovable, so all deployments are manual
- Database migrations are in `supabase/migrations/`
- Edge function code is in `supabase/functions/external-signup/index.ts`
