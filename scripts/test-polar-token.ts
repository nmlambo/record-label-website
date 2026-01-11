#!/usr/bin/env tsx
import { config } from "dotenv";
import { Polar } from "@polar-sh/sdk";

config({ path: ".env.local" });

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
const POLAR_ORGANIZATION_ID = process.env.POLAR_ORGANIZATION_ID;

console.log("🔍 Testing Polar.sh connection...\n");
console.log("Token (first 20 chars):", POLAR_ACCESS_TOKEN?.substring(0, 20) + "...");
console.log("Organization ID:", POLAR_ORGANIZATION_ID);
console.log("Server:", process.env.POLAR_SERVER || "sandbox");
console.log("");

const polar = new Polar({
  accessToken: POLAR_ACCESS_TOKEN,
  server: process.env.POLAR_SERVER === "production" ? "production" : "sandbox",
});

async function testConnection() {
  try {
    console.log("📋 Attempting to list existing products...\n");
    
    const products = await polar.products.list({
      organizationId: POLAR_ORGANIZATION_ID,
    });

    console.log("✅ Connection successful!");
    console.log(`Found ${products.result.items.length} existing products:\n`);
    
    products.result.items.forEach((product) => {
      console.log(`  - ${product.name} (${product.id})`);
    });

    if (products.result.items.length === 0) {
      console.log("\n💡 No products found. Ready to create new products!");
    }

  } catch (error: any) {
    console.error("❌ Connection failed!");
    console.error("Error:", error.message);
    if (error.body) {
      console.error("Details:", JSON.stringify(error.body, null, 2));
    }
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Verify your token has 'products:read' scope");
    console.log("2. Check that the token hasn't been revoked");
    console.log("3. Ensure you're using the correct organization ID");
    process.exit(1);
  }
}

testConnection();
