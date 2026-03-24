"use client"

import { useCartStore, selectCartCount, selectCartTotal } from "@/lib/stores/cart-store"

export function useCart() {
  const items = useCartStore((state) => state.items)
  const isOpen = useCartStore((state) => state.isOpen)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const openCart = useCartStore((state) => state.openCart)
  const closeCart = useCartStore((state) => state.closeCart)
  const toggleCart = useCartStore((state) => state.toggleCart)
  const count = useCartStore(selectCartCount)
  const total = useCartStore(selectCartTotal)

  return {
    items,
    isOpen,
    count,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  }
}
