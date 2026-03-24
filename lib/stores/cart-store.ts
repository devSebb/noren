"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  size: string
  color: string
  colorHex: string
  emoji: string
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, delta: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const { items } = get()
        const existing = items.find(
          (item) => item.id === newItem.id && item.size === newItem.size
        )
        if (existing) {
          set({
            items: items.map((item) =>
              item.id === newItem.id && item.size === newItem.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { ...newItem, quantity: 1 }] })
        }
      },

      removeItem: (id, size) => {
        set({ items: get().items.filter((item) => !(item.id === id && item.size === size)) })
      },

      updateQuantity: (id, size, delta) => {
        set({
          items: get()
            .items.map((item) =>
              item.id === id && item.size === size
                ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "noren-cart",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persisted, version) => {
        // v1 used numeric ids — clear the cart on upgrade
        if (version < 2) {
          return { items: [], isOpen: false }
        }
        return persisted as CartStore
      },
    }
  )
)

// Derived selectors
export const selectCartCount = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartTotal = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
