import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-extrabold tracking-tight">NOREN</span>
              <span className="text-lg text-muted-foreground font-light">暖簾</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium Japanese-inspired apparel where art, mythology, and ramen obsession collide.
              Each design is a wearable piece of culture, printed on the softest garment-dyed cotton.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { label: "All Designs", href: "/products" },
                { label: "New Arrivals", href: "/products?sort=newest" },
                { label: "Best Sellers", href: "/products?sort=popular" },
                { label: "Sale", href: "/products?filter=sale" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Help
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Size Guide", href: "/faq#sizing" },
                { label: "Shipping", href: "/policies/shipping" },
                { label: "Returns", href: "/policies/returns" },
                { label: "Track Order", href: "/track-order" },
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Follow
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "TikTok", href: "#" },
                { label: "Pinterest", href: "#" },
                { label: "Twitter", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2">
              <Link
                href="/policies/privacy"
                className="block text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/policies/terms"
                className="block text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 NOREN. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Made with 🍜 in the USA</p>
        </div>
      </div>
    </footer>
  )
}
