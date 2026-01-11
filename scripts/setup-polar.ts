#!/usr/bin/env tsx
/**
 * Polar.sh Setup Script
 * 
 * This script automates the creation of products in Polar.sh
 * Run with: npm run setup:polar
 */

import { config } from "dotenv";
import { Polar } from "@polar-sh/sdk";

// Load environment variables from .env.local
config({ path: ".env.local" });

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
const POLAR_ORGANIZATION_ID = process.env.POLAR_ORGANIZATION_ID;

if (!POLAR_ACCESS_TOKEN) {
  console.error("❌ POLAR_ACCESS_TOKEN is not set in .env.local");
  console.log("\n📝 To get your access token:");
  console.log("1. Go to https://polar.sh/dashboard/numba-inc");
  console.log("2. Navigate to Settings → Developers");
  console.log("3. Click 'New Token'");
  console.log("4. Copy the token and add it to .env.local as POLAR_ACCESS_TOKEN");
  process.exit(1);
}

if (!POLAR_ORGANIZATION_ID) {
  console.error("❌ POLAR_ORGANIZATION_ID is not set in .env.local");
  console.log("\n📝 To get your organization ID:");
  console.log("1. Go to https://polar.sh/dashboard/numba-inc");
  console.log("2. Navigate to Settings → Profile");
  console.log("3. Copy the 'Identifier' value");
  console.log("4. Add it to .env.local as POLAR_ORGANIZATION_ID");
  process.exit(1);
}

const polar = new Polar({
  accessToken: POLAR_ACCESS_TOKEN,
  server: process.env.POLAR_SERVER === "production" ? "production" : "sandbox",
});

async function setupProducts() {
  console.log("🚀 Setting up Polar.sh products...\n");

  try {
    // Create Track Product ($1.99)
    console.log("📦 Creating Track product ($1.99)...");
    const trackProduct = await polar.products.create({
      name: "Single Track",
      description: "Individual music track in MP3/WAV format",
      prices: [
        {
          amountType: "fixed",
          priceAmount: 199, // $1.99 in cents
          priceCurrency: "usd",
        },
      ],
      medias: [],
    });

    console.log("✅ Track product created!");
    console.log(`   Product ID: ${trackProduct.id}`);
    console.log(`   Add to .env.local: NEXT_PUBLIC_POLAR_TRACK_PRODUCT_ID=${trackProduct.id}\n`);

    // Create Single Product ($1.99)
    console.log("📦 Creating Single product ($1.99)...");
    const singleProduct = await polar.products.create({
      name: "Single Release",
      description: "Complete single release with digital download",
      prices: [
        {
          amountType: "fixed",
          priceAmount: 199, // $1.99 in cents
          priceCurrency: "usd",
        },
      ],
      medias: [],
    });

    console.log("✅ Single product created!");
    console.log(`   Product ID: ${singleProduct.id}`);
    console.log(`   Add to .env.local: NEXT_PUBLIC_POLAR_SINGLE_PRODUCT_ID=${singleProduct.id}\n`);

    // Create EP Product ($5.99)
    console.log("📦 Creating EP product ($5.99)...");
    const epProduct = await polar.products.create({
      name: "EP Release",
      description: "Extended Play release with digital download",
      prices: [
        {
          amountType: "fixed",
          priceAmount: 599, // $5.99 in cents
          priceCurrency: "usd",
        },
      ],
      medias: [],
    });

    console.log("✅ EP product created!");
    console.log(`   Product ID: ${epProduct.id}`);
    console.log(`   Add to .env.local: NEXT_PUBLIC_POLAR_EP_PRODUCT_ID=${epProduct.id}\n`);

    // Create Album Product ($9.99)
    console.log("📦 Creating Album product ($9.99)...");
    const albumProduct = await polar.products.create({
      name: "Album Release",
      description: "Full album release with digital download",
      prices: [
        {
          amountType: "fixed",
          priceAmount: 999, // $9.99 in cents
          priceCurrency: "usd",
        },
      ],
      medias: [],
    });

    console.log("✅ Album product created!");
    console.log(`   Product ID: ${albumProduct.id}`);
    console.log(`   Add to .env.local: NEXT_PUBLIC_POLAR_ALBUM_PRODUCT_ID=${albumProduct.id}\n`);

    // Create Sample Pack Product ($34.99)
    console.log("📦 Creating Sample Pack product ($34.99)...");
    const samplePackProduct = await polar.products.create({
      name: "Sample Pack",
      description: "Professional sound library and sample pack",
      prices: [
        {
          amountType: "fixed",
          priceAmount: 3499, // $34.99 in cents
          priceCurrency: "usd",
        },
      ],
      medias: [],
    });

    console.log("✅ Sample Pack product created!");
    console.log(`   Product ID: ${samplePackProduct.id}`);
    console.log(`   Add to .env.local: NEXT_PUBLIC_POLAR_SAMPLE_PACK_PRODUCT_ID=${samplePackProduct.id}\n`);

    // Create Vinyl Product ($24.99)
    console.log("📦 Creating Vinyl product ($24.99)...");
    const vinylProduct = await polar.products.create({
      name: "Vinyl Record",
      description: "Limited edition vinyl record with digital download included",
      prices: [
        {
          amountType: "fixed",
          priceAmount: 2499, // $24.99 in cents
          priceCurrency: "usd",
        },
      ],
      medias: [],
    });

    console.log("✅ Vinyl product created!");
    console.log(`   Product ID: ${vinylProduct.id}`);
    console.log(`   Add to .env.local: NEXT_PUBLIC_POLAR_VINYL_PRODUCT_ID=${vinylProduct.id}\n`);

    console.log("🎉 All products created successfully!");
    console.log("\n📋 Next steps:");
    console.log("1. Copy the product IDs above to your .env.local file");
    console.log("2. Update the product ID mappings in your code");
    console.log("3. Restart your development server");
    console.log("4. Test the checkout flow at /cart");

  } catch (error: any) {
    console.error("❌ Error creating products:", error.message);
    if (error.body) {
      console.error("Details:", JSON.stringify(error.body, null, 2));
    }
    process.exit(1);
  }
}

async function listProducts() {
  console.log("📋 Listing existing products...\n");

  try {
    const products = await polar.products.list({
      organizationId: POLAR_ORGANIZATION_ID,
    });

    if (products.result.items.length === 0) {
      console.log("No products found. Run setup to create products.");
      return;
    }

    products.result.items.forEach((product) => {
      console.log(`📦 ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Description: ${product.description || "N/A"}`);
      if (product.prices && product.prices.length > 0) {
        const price = product.prices[0] as any;
        if (price.priceAmount && price.priceCurrency) {
          const amount = price.priceAmount / 100;
          console.log(`   Price: $${amount.toFixed(2)} ${price.priceCurrency}`);
        }
      }
      console.log("");
    });

  } catch (error: any) {
    console.error("❌ Error listing products:", error.message);
    process.exit(1);
  }
}

// Main execution
const command = process.argv[2];

if (command === "list") {
  listProducts();
} else if (command === "setup" || !command) {
  setupProducts();
} else {
  console.log("Usage:");
  console.log("  npm run setup:polar        - Create products");
  console.log("  npm run setup:polar list   - List existing products");
}
