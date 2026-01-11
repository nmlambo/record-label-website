#!/usr/bin/env tsx
/**
 * Create Dynamic Pricing Product for Polar.sh
 * This creates a single product that can accept custom amounts
 */

import { config } from "dotenv";
import { Polar } from "@polar-sh/sdk";

// Load environment variables from .env.local
config({ path: ".env.local" });

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;

if (!POLAR_ACCESS_TOKEN) {
  console.error("❌ POLAR_ACCESS_TOKEN is not set in .env.local");
  process.exit(1);
}

const polar = new Polar({
  accessToken: POLAR_ACCESS_TOKEN,
  server: process.env.POLAR_SERVER === "production" ? "production" : "sandbox",
});

async function createDynamicProduct() {
  console.log("🚀 Creating dynamic pricing product...\n");

  try {
    // Create a product with custom amount type
    const product = await polar.products.create({
      name: "Music Purchase",
      description: "Digital music, tracks, albums, EPs, and sample packs",
      prices: [
        {
          amountType: "custom",
          priceCurrency: "usd",
        },
      ],
      medias: [],
    });

    console.log("✅ Dynamic product created!");
    console.log(`   Product ID: ${product.id}`);
    console.log(`   Add to .env.local: NEXT_PUBLIC_POLAR_DYNAMIC_PRODUCT_ID=${product.id}\n`);

    console.log("🎉 Setup complete!");
    console.log("\n📋 Next steps:");
    console.log("1. Copy the product ID above to your .env.local file");
    console.log("2. Restart your development server");
    console.log("3. Test the checkout flow - it will now show a single combined total");

  } catch (error: any) {
    console.error("❌ Error creating product:", error.message);
    if (error.body) {
      console.error("Details:", JSON.stringify(error.body, null, 2));
    }
    process.exit(1);
  }
}

createDynamicProduct();
