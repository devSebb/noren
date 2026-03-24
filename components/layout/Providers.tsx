"use client"

import { Toaster } from "@/components/ui/sonner"
import { CartDrawer } from "@/components/storefront/CartDrawer"
import { MobileCartButton } from "@/components/storefront/MobileCartButton"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
      <MobileCartButton />
      <Toaster position="bottom-center" richColors />
    </>
  )
}
