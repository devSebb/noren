import Image from "next/image"
import { formatCents } from "@/lib/utils/format"
import type { ProductWithDetails } from "@/lib/types/product"

interface Props {
  products: ProductWithDetails[]
}

export function RelatedProducts({ products }: Props) {
  if (products.length === 0) return null

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-extrabold tracking-tight mb-8">Complete the Look</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => {
            const primaryImage = p.images.find((img) => img.isPrimary) ?? p.images[0]
            return (
              <a
                key={p.id}
                href={`/products/${p.slug}`}
                className="group bg-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform"
              >
                <div className="relative aspect-square">
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.altText ?? p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  {p.badge && (
                    <span className={`absolute top-3 left-3 ${p.badgeColor ?? "bg-primary text-primary-foreground"} text-xs font-bold px-2 py-1 rounded-full`}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs tracking-widest text-muted-foreground uppercase mb-1">
                    {p.subtitle}
                  </p>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {formatCents(p.priceCents)}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
