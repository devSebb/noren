import type { Metadata } from "next"
import { ProductSection } from "@/components/storefront/ProductSection"
import { buildMetadata } from "@/lib/utils/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Shop All Designs",
    description: "Browse our full collection of premium Japanese-inspired graphic tees. Cats, dragons, samurai, and more.",
    path: "/products",
  })
}

export default function ProductsPage() {
  return (
    <div className="pt-8">
      <ProductSection />
    </div>
  )
}
