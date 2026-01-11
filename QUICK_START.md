# 🚀 Quick Start: Polar.sh Integration

Get your payment system running in 5 minutes!

## Step 1: Get Your Polar Credentials (2 minutes)

1. Go to https://polar.sh/dashboard/numba-inc
2. **Settings → Developers** → Click "New Token" → Copy it
3. **Settings → Profile** → Copy the "Identifier"

## Step 2: Add to `.env.local` (1 minute)

```bash
POLAR_ACCESS_TOKEN=polar_oat_YOUR_TOKEN_HERE
POLAR_ORGANIZATION_ID=YOUR_ORG_ID_HERE
POLAR_SERVER=sandbox
```

## Step 3: Run Setup Script (1 minute)

```bash
npm run setup:polar
```

Copy the product IDs it outputs and add them to `.env.local`:

```bash
POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID=prod_xxxxx
POLAR_VINYL_PRODUCT_ID=prod_xxxxx
```

## Step 4: Restart & Test (1 minute)

```bash
npm run dev
```

Visit http://localhost:3000/release/midnight-dreams and click "Add to Cart"!

## ✅ Done!

Your checkout is now live. See `POLAR_SETUP_GUIDE.md` for detailed documentation.
