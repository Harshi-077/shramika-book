export function formatCurrency(amount: number): string {
  const rounded = Math.round(amount)
  return `₹${rounded.toLocaleString('en-IN')}`
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
