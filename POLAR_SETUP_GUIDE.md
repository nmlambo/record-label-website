# Polar.sh Integration Setup Guide

This guide will help you integrate Polar.sh payments into your music platform using automated scripts.

## Prerequisites

1. Polar.sh account created at https://polar.sh/dashboard/numba-inc
2. Node.js and npm installed

## Step 1: Get Your Polar.sh Credentials

### 1.1 Get Access Token
1. Go to https://polar.sh/dashboard/numba-inc
2. Navigate to **Settings → Developers**
3. Click **"New Token"**
4. Give it a name like "Numba Website Production"
5. Copy the token (starts with `polar_oat_...`)

### 1.2 Get Organization ID
1. Go to **Settings → Profile**
2. Copy the **Identifier** value (e.g., `2256da26-34b9-4bcb-bcb3-...`)

### 1.3 Complete Account Setup
1. Click **"Complete Setup"** from the home dashboard
2. Verify your identity to enable payment processing

## Step 2: Configure Environment Variables

Update your `.env.local` file with the credentials from Step 1:

```bash
# Polar.sh Configuration
POLAR_ACCESS_TOKEN=polar_oat_YOUR_ACTUAL_TOKEN_HERE
POLAR_SERVER=sandbox  # Use "production" when ready to go live
POLAR_ORGANIZATION_ID=2256da26-34b9-4bcb-bcb3-YOUR_ORG_ID

# These will be auto-filled by the setup script
POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID=
POLAR_VINYL_PRODUCT_ID=

# Application URL
NEXT_PUBLIC_URL=http://localhost:3000
```

## Step 3: Run the Setup Script

The setup script will automatically create products in your Polar.sh account:

```bash
npm run setup:polar
```

This will create:
- **Digital Music Download** - $9.99
- **Vinyl Record** - $24.99

The script will output product IDs. Copy them to your `.env.local` file.

## Step 4: Verify Products

List all products to verify they were created:

```bash
npm run polar:list
```

## Step 5: Set Up Webhooks (Optional but Recommended)

1. Go to **Settings → Webhooks** in Polar dashboard
2. Add webhook URL:
   - Development: `http://localhost:3000/api/webhooks/polar`
   - Production: `https://your-domain.com/api/webhooks/polar`
3. Enable these events:
   - Order confirmation
   - Order created
   - Subscription events (if using subscriptions)
4. Copy the webhook secret and add to `.env.local`:
   ```bash
   POLAR_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
   ```

## Step 6: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to a release page (e.g., http://localhost:3000/release/midnight-dreams)

3. Click **"Add to Cart"** button

4. Go to cart page and click **"Check Out"**

5. You should be redirected to Polar's checkout page

## Troubleshooting

### "Payment processing is not yet available"
- Complete account setup in Polar dashboard
- Verify your identity

### "POLAR_ACCESS_TOKEN is not set"
- Make sure you've added the token to `.env.local`
- Restart your development server after adding environment variables

### Products not created
- Check that `POLAR_ORGANIZATION_ID` is correct
- Verify your access token has the correct permissions
- Check the error message from the setup script

### Checkout not working
- Verify all environment variables are set correctly
- Check that product IDs in `.env.local` match those in Polar dashboard
- Look at browser console and terminal for error messages

## Going to Production

When ready to go live:

1. Switch to production mode:
   ```bash
   POLAR_SERVER=production
   ```

2. Complete Stripe Connect setup in Polar dashboard

3. Update webhook URL to your production domain

4. Test checkout flow thoroughly in production

5. Monitor orders in Polar dashboard

## Useful Commands

```bash
# Create products
npm run setup:polar

# List existing products
npm run polar:list

# Start development server
npm run dev

# Build for production
npm run build
```

## Support

- Polar.sh Documentation: https://docs.polar.sh
- Polar.sh Dashboard: https://polar.sh/dashboard/numba-inc
- API Reference: https://docs.polar.sh/api

## Next Steps

After completing this setup:

1. ✅ Products are created in Polar
2. ✅ Checkout flow is working
3. ✅ Webhooks are configured
4. 🎵 Start selling music!

For custom product configurations or advanced features, visit the Polar.sh dashboard.
