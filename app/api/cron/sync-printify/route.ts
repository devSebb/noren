import { NextRequest, NextResponse } from "next/server"
import { PRINTIFY_PRODUCT_MAP } from "@/lib/printify/config"

export const runtime = "nodejs"

// Vercel Cron: runs daily
// Add to vercel.json: { "crons": [{ "path": "/api/cron/sync-printify", "schedule": "0 6 * * *" }] }

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const configured = PRINTIFY_PRODUCT_MAP.filter(
      (p) => p.blueprintId !== 0 && Object.keys(p.variantMapping).length > 0
    )

    // Log configuration status
    console.log(`[Printify Sync] ${configured.length}/${PRINTIFY_PRODUCT_MAP.length} products fully configured`)

    // Future: sync variant stock status from Printify API
    // For now, just verify the config is set up

    return NextResponse.json({
      success: true,
      totalProducts: PRINTIFY_PRODUCT_MAP.length,
      configuredProducts: configured.length,
      unconfiguredProducts: PRINTIFY_PRODUCT_MAP.filter(
        (p) => p.blueprintId === 0 || Object.keys(p.variantMapping).length === 0
      ).map((p) => p.slug),
    })
  } catch (err) {
    console.error("[Printify Sync Cron] Error:", err)
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 })
  }
}
