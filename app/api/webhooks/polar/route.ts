import { type NextRequest, NextResponse } from "next/server"
import { databases, DATABASE_ID, COLLECTIONS } from "@/lib/appwrite"
import { ID, Query } from "appwrite"

// Polar webhook events
type PolarWebhookEvent = {
  type: string
  data: {
    id: string
    customer_id?: string
    customer_email?: string
    product_id?: string
    amount?: number
    status?: string
    metadata?: {
      user_id?: string
      release_id?: string
    }
    [key: string]: any
  }
}

// Verify webhook signature (if Polar provides one)
function verifyWebhookSignature(request: NextRequest): boolean {
  const signature = request.headers.get("x-polar-signature")
  const secret = process.env.POLAR_WEBHOOK_SECRET
  
  if (!secret) {
    console.warn("POLAR_WEBHOOK_SECRET not configured")
    return true // Allow in development
  }
  
  // TODO: Implement actual signature verification based on Polar's documentation
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    if (!verifyWebhookSignature(request)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event: PolarWebhookEvent = await request.json()
    console.log("Polar webhook received:", event.type)

    // Handle different event types
    switch (event.type) {
      case "order.created":
      case "order.completed":
        await handleOrderCreated(event)
        break

      case "subscription.created":
        await handleSubscriptionCreated(event)
        break

      case "subscription.updated":
        await handleSubscriptionUpdated(event)
        break

      case "subscription.cancelled":
        await handleSubscriptionCancelled(event)
        break

      case "order.refunded":
        await handleOrderRefunded(event)
        break

      default:
        console.log("Unhandled webhook event:", event.type)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleOrderCreated(event: PolarWebhookEvent) {
  try {
    const { id, customer_id, customer_email, product_id, amount, status, metadata } = event.data
    
    console.log("Processing order:", id)

    // Create order record in Appwrite
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.ORDERS,
      ID.unique(),
      {
        polar_order_id: id,
        user_id: metadata?.user_id || "",
        release_id: metadata?.release_id || "",
        product_type: "digital", // Determine from product_id
        amount: amount || 0,
        status: status || "completed",
        created_at: new Date().toISOString()
      }
    )

    // If order is completed, grant access to the release
    if (status === "completed" && metadata?.user_id && metadata?.release_id) {
      await grantReleaseAccess(metadata.user_id, metadata.release_id)
    }

    console.log("Order processed successfully:", id)
  } catch (error) {
    console.error("Error handling order:", error)
    throw error
  }
}

async function grantReleaseAccess(userId: string, releaseId: string) {
  try {
    // Find user profile
    const userProfiles = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [Query.equal("user_id", userId)]
    )

    if (userProfiles.documents.length === 0) {
      console.error("User profile not found:", userId)
      return
    }

    const userProfile = userProfiles.documents[0]
    const purchasedReleases = userProfile.purchased_releases || []

    // Add release to purchased list if not already there
    if (!purchasedReleases.includes(releaseId)) {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userProfile.$id,
        {
          purchased_releases: [...purchasedReleases, releaseId],
          updated_at: new Date().toISOString()
        }
      )
      console.log("Granted access to release:", releaseId, "for user:", userId)
    }
  } catch (error) {
    console.error("Error granting release access:", error)
    throw error
  }
}

async function handleSubscriptionCreated(event: PolarWebhookEvent) {
  console.log("Subscription created:", event.data.id)
  // TODO: Implement subscription handling
}

async function handleSubscriptionUpdated(event: PolarWebhookEvent) {
  console.log("Subscription updated:", event.data.id)
  // TODO: Implement subscription update handling
}

async function handleSubscriptionCancelled(event: PolarWebhookEvent) {
  console.log("Subscription cancelled:", event.data.id)
  // TODO: Implement subscription cancellation handling
}

async function handleOrderRefunded(event: PolarWebhookEvent) {
  try {
    const { id, metadata } = event.data
    console.log("Processing refund:", id)

    // Update order status
    const orders = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.ORDERS,
      [Query.equal("polar_order_id", id)]
    )

    if (orders.documents.length > 0) {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORDERS,
        orders.documents[0].$id,
        { status: "refunded" }
      )
    }

    // Optionally revoke access (depending on your policy)
    if (metadata?.user_id && metadata?.release_id) {
      await revokeReleaseAccess(metadata.user_id, metadata.release_id)
    }
  } catch (error) {
    console.error("Error handling refund:", error)
    throw error
  }
}

async function revokeReleaseAccess(userId: string, releaseId: string) {
  try {
    const userProfiles = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [Query.equal("user_id", userId)]
    )

    if (userProfiles.documents.length === 0) return

    const userProfile = userProfiles.documents[0]
    const purchasedReleases = userProfile.purchased_releases || []

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      userProfile.$id,
      {
        purchased_releases: purchasedReleases.filter((id: string) => id !== releaseId),
        updated_at: new Date().toISOString()
      }
    )
    console.log("Revoked access to release:", releaseId, "for user:", userId)
  } catch (error) {
    console.error("Error revoking release access:", error)
    throw error
  }
}
