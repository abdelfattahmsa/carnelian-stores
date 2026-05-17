import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount / 100)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return `${text.slice(0, length)}...`
}

export function calculateDiscount(price: number, compareAtPrice: number): number {
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}

export function generateOrderNumber(): string {
  const prefix = 'CS'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function parseSearchParams(searchParams: URLSearchParams) {
  return {
    brands: searchParams.getAll('brand'),
    categories: searchParams.getAll('category'),
    priceMin: Number(searchParams.get('priceMin') ?? 0),
    priceMax: Number(searchParams.get('priceMax') ?? 100000),
    sizes: searchParams.getAll('size'),
    colors: searchParams.getAll('color'),
    rating: Number(searchParams.get('rating') ?? 0),
    inStock: searchParams.get('inStock') === 'true',
    onSale: searchParams.get('onSale') === 'true',
    sortBy: (searchParams.get('sortBy') ?? 'featured') as string,
    q: searchParams.get('q') ?? '',
    page: Number(searchParams.get('page') ?? 1),
  }
}
