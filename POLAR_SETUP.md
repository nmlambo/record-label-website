# Polar.sh Integration Setup

Numba uses [Polar.sh](https://polar.sh) for payment processing and digital product sales.

## Setup Steps

### 1. Create a Polar Account

1. Go to [polar.sh](https://polar.sh) and sign up
2. Create an organization for Numba
3. Start in **Sandbox mode** for testing

### 2. Create Products

In your Polar dashboard, create products for:

- **Digital Downloads** (MP3/WAV albums)
  - Set price (e.g., $9.99)
  - Add product description
  - Copy the Product ID

- **Physical Products** (Vinyl, CDs, Merch)
  - Set price (e.g., $24.99)
  - Add shipping options
  - Copy the Product ID

- **Subscriptions** (Optional - for exclusive content)
  - Set monthly/yearly pricing
  - Define benefits
  - Copy the Product ID

### 3. Get Your Access Token

1. Go to your organization settings in Polar
2. Navigate to "Access Tokens"
3. Create a new **Organization Access Token (OAT)**
4. Copy the token (starts with `polar_oat_`)

### 4. Configure Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
POLAR_ACCESS_TOKEN=polar_oat_your_token_here
POLAR_SERVER=sandbox
POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID=prod_xxxxx
POLAR_VINYL_PRODUCT_ID=prod_xxxxx
NEXT_PUBLIC_URL=http://localhost:3000
\`\`\`

### 5. Update Product Links

In `app/release/[id]/page.tsx`, replace the placeholder product IDs:

\`\`\`tsx
<a href="/api/checkout?products=YOUR_ACTUAL_PRODUCT_ID">
\`\`\`

### 6. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to a release page
3. Click "Digital Download" or "Vinyl"
4. You'll be redirected to Polar's checkout
5. Use test card: `4242 4242 4242 4242`
6. Complete the purchase
7. You'll be redirected to the success page

### 7. Go Live

When ready for production:

1. Switch Polar to **Production mode**
2. Create real products in production
3. Update `.env.local`:
   \`\`\`env
   POLAR_SERVER=production
   \`\`\`
4. Update product IDs to production IDs
5. Deploy to Vercel

## Features

- **Secure Checkout**: Polar handles all payment processing
- **Customer Portal**: Users can view their purchases at `/api/portal`
- **Global Payments**: Accepts cards worldwide
- **Tax Compliance**: Polar acts as Merchant of Record
- **Digital Delivery**: Automatic download links after purchase

## Customer Portal

Customers can access their purchases by clicking the user icon in the header or visiting `/api/portal`. They can:

- View order history
- Download purchased files
- Manage subscriptions
- Update payment methods

## Webhooks (Optional)

To receive real-time updates about purchases, set up webhooks in your Polar dashboard pointing to:

\`\`\`
https://yourdomain.com/api/webhooks/polar
\`\`\`

## Support

- [Polar Documentation](https://docs.polar.sh)
- [Polar Discord](https://discord.gg/polar)
- [Contact Polar Support](https://polar.sh/support)
\`\`\`

```json file="" isHidden
