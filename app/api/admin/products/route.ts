import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { productSchema } from "@/lib/validators"

export async function GET() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))

    return NextResponse.json(allProducts)
  } catch (err) {
    console.error("[Admin Products] GET error:", err)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Map form field names to schema field names
    const parsed = productSchema.safeParse({
      ...body,
      priceCents: body.priceCents,
      compareAtPriceCents: body.compareAtPriceCents,
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid data" },
        { status: 400 }
      )
    }

    const [product] = await db
      .insert(products)
      .values({
        ...parsed.data,
        printifyBlueprintId: body.blueprintId || null,
        printifyPrintProviderId: body.printProviderId || null,
      })
      .returning()

    return NextResponse.json(product, { status: 201 })
  } catch (err: unknown) {
    console.error("[Admin Products] POST error:", err)
    const msg = err instanceof Error ? err.message : ""
    if (msg.includes("unique")) {
      return NextResponse.json({ error: "A product with that slug already exists" }, { status: 409 })
    }
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
