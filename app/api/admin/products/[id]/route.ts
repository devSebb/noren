import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { productSchema } from "@/lib/validators"

interface Props {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { id } = await params
  try {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1)
    if (!result[0]) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (err) {
    console.error("[Admin Products] GET error:", err)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { id } = await params
  try {
    const body = await req.json()

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

    const [updated] = await db
      .update(products)
      .set({
        ...parsed.data,
        printifyBlueprintId: body.blueprintId || null,
        printifyPrintProviderId: body.printProviderId || null,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (err: unknown) {
    console.error("[Admin Products] PUT error:", err)
    const msg = err instanceof Error ? err.message : ""
    if (msg.includes("unique")) {
      return NextResponse.json({ error: "A product with that slug already exists" }, { status: 409 })
    }
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params
  try {
    const [deleted] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning()

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[Admin Products] DELETE error:", err)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
