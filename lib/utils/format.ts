export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatCents(cents: number): string {
  return formatPrice(cents / 100)
}

export function discountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100)
}
