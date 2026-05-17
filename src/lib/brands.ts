import { Brand } from '@/types'

export const BRANDS: Brand[] = [
  {
    id: 'carnelian',
    name: 'Carnelian Stores',
    tagline: 'Wear what endures.',
    description:
      'Premium basics built from exceptional materials. Anti-trend, anti-hype — just enduring quality for those who value craft over logos.',
    color: '#E0A800',
    accentColor: '#D93025',
    gradient: 'linear-gradient(135deg, #E0A800, #D93025)',
    href: '/collections/carnelian',
    emoji: '🔴',
  },
  {
    id: 'nerds-assemble',
    name: 'Nerds Assemble',
    tagline: 'Gear up. Geek out.',
    description:
      'Premium merch for the intellectually obsessed. Anime, board games, trading cards, sci-fi apparel, and collectibles for the culture.',
    color: '#6C63FF',
    accentColor: '#FF6584',
    gradient: 'linear-gradient(135deg, #6C63FF, #FF6584)',
    href: '/collections/nerds-assemble',
    emoji: '🎲',
  },
  {
    id: 'clutch-nation',
    name: 'Clutch Nation',
    tagline: 'Drive the culture.',
    description:
      'For those who live at wide-open throttle. Car culture merch, automotive books and guides, racing-inspired apparel, and diecast collectibles.',
    color: '#FF4D00',
    accentColor: '#FFB800',
    gradient: 'linear-gradient(135deg, #FF4D00, #FFB800)',
    href: '/collections/clutch-nation',
    emoji: '🏎️',
  },
  {
    id: 'field-notes',
    name: 'Field Notes',
    tagline: 'Built for the journey.',
    description:
      'Outdoor adventure gear, trail apparel, and exploration accessories for those who measure life in miles, mountains, and wide-open sky.',
    color: '#2D6A4F',
    accentColor: '#74C69D',
    gradient: 'linear-gradient(135deg, #2D6A4F, #74C69D)',
    href: '/collections/field-notes',
    emoji: '🏔️',
  },
  {
    id: 'the-vault',
    name: 'The Vault',
    tagline: 'Objects worth keeping.',
    description:
      'Premium lifestyle collectibles, art prints, and handcrafted objects selected for permanence. Things made to last a lifetime, not a season.',
    color: '#8B6914',
    accentColor: '#C9A84C',
    gradient: 'linear-gradient(135deg, #8B6914, #C9A84C)',
    href: '/collections/the-vault',
    emoji: '🏺',
  },
]

export const getBrand = (id: string): Brand =>
  BRANDS.find((b) => b.id === id) ?? BRANDS[0]

export const CATEGORIES: Record<string, string[]> = {
  carnelian: ['T-Shirts', 'Trousers', 'Outerwear', 'Knitwear', 'Accessories'],
  'nerds-assemble': ['Apparel', 'Board Games', 'Trading Cards', 'Collectibles', 'Anime', 'Books', 'Accessories'],
  'clutch-nation': ['Apparel', 'Diecast Models', 'Books & Guides', 'Accessories', 'Artwork', 'Games'],
  'field-notes': ['Trail Apparel', 'Gear', 'Accessories', 'Hydration', 'Navigation', 'Journals'],
  'the-vault': ['Art Prints', 'Sculptures', 'Ceramics', 'Leather Goods', 'Home Objects', 'Jewelry'],
}
