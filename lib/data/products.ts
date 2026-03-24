export interface Product {
  id: number
  name: string
  subtitle: string
  price: number
  originalPrice: number
  badge: string
  badgeColor: string
  category: string
  tags: string[]
  color: string
  colorHex: string
  emoji: string
  description: string
  image: string
  slug: string
}

export const products: Product[] = [
  {
    id: 1,
    slug: "the-ramen-connoisseur",
    name: "The Ramen Connoisseur",
    subtitle: "KIMONO GUINEA PIG",
    price: 34.99,
    originalPrice: 44.99,
    badge: "BEST SELLER",
    badgeColor: "bg-accent text-accent-foreground",
    category: "Kawaii",
    tags: ["#kawaii", "#guineapig", "#kimono"],
    color: "Seafoam",
    colorHex: "#7ac9b3",
    emoji: "🐹",
    description: "This dapper little fluffball takes ramen VERY seriously. Dressed in traditional florals, chopsticks poised.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy1-%20Kawaii%20Guinea%20Pig%20in%20Kimono%20Eating%20Ramen%20%284%29-AOkgjGwcZbGSAzhAZnesFHLXoMfsnV.jpg",
  },
  {
    id: 2,
    slug: "black-cat-ramen",
    name: "Black Cat Ramen",
    subtitle: "MIDNIGHT SLURP",
    price: 32.99,
    originalPrice: 42.99,
    badge: "FAN FAVORITE",
    badgeColor: "bg-primary text-primary-foreground",
    category: "Cats",
    tags: ["#cat", "#minimal", "#cute"],
    color: "Yam",
    colorHex: "#c97b63",
    emoji: "🐈‍⬛",
    description: "Those eyes have seen things. Specifically, they've seen the perfect bowl of ramen and they WILL have it.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy2-%20Funny%20black%20cat%20ramen%20%282%29-F51BrLneGeMqinUjzdzLccG4i2EEBi.jpg",
  },
  {
    id: 3,
    slug: "warriors-feast",
    name: "Warrior's Feast",
    subtitle: "NEKO SAMURAI",
    price: 36.99,
    originalPrice: 46.99,
    badge: "NEW DROP",
    badgeColor: "bg-[#4ade80] text-[#0f0f0f]",
    category: "Warriors",
    tags: ["#samurai", "#cat", "#ukiyoe"],
    color: "Washed Denim",
    colorHex: "#8b9dc3",
    emoji: "⚔️",
    description: "Even the mightiest warriors need fuel. This battle-hardened tabby knows the way of the noodle.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy1-%20Cat%20ramen%20samurai%20%283%29-Po682cqN910jWLXcligFy9VUltCHAr.jpg",
  },
  {
    id: 4,
    slug: "city-sized-hunger",
    name: "City-Sized Hunger",
    subtitle: "KAIJU APPETITE",
    price: 36.99,
    originalPrice: 46.99,
    badge: "EPIC",
    badgeColor: "bg-primary text-primary-foreground",
    category: "Dragons",
    tags: ["#dragon", "#kaiju", "#epic"],
    color: "Washed Denim",
    colorHex: "#8b9dc3",
    emoji: "🦖",
    description: "When you're the size of a skyscraper, you need a proportionally massive bowl of noodles. Obviously.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy1-%20Dragon%20ramen%20%284%29-fd7kHj5ETwIqohuNd9DJyTjnJswx4c.jpg",
  },
  {
    id: 5,
    slug: "black-cat-at-golden-hour",
    name: "Black Cat at Golden Hour",
    subtitle: "SUNSET NOODLES",
    price: 34.99,
    originalPrice: 44.99,
    badge: "TRENDING",
    badgeColor: "bg-accent text-accent-foreground",
    category: "Cats",
    tags: ["#cat", "#sunset", "#scenic"],
    color: "Moss",
    colorHex: "#7d8c75",
    emoji: "🌅",
    description: "There's no better time to enjoy ramen than when the sun dips low over the Japanese countryside.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy2-%20Black%20Cat%20ramen%20%282%29-GM0qnVUSrem4oVDvcYkDniB8I8BqhD.jpg",
  },
  {
    id: 6,
    slug: "hokusais-ramen",
    name: "Hokusai's Ramen",
    subtitle: "THE GREAT SLURP",
    price: 38.99,
    originalPrice: 48.99,
    badge: "COLLECTOR'S",
    badgeColor: "bg-primary text-primary-foreground",
    category: "Fine Art",
    tags: ["#wave", "#hokusai", "#art"],
    color: "Washed Denim",
    colorHex: "#8b9dc3",
    emoji: "🌊",
    description: "The Great Wave off Kanagawa, but make it delicious. Koi fish swim through the world's most epic noodle soup.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy2-%20Ramen%20Japanese%20%281%29-eaPY2oUGvJ7XLYRw4SHYBcsCBVh8gb.jpg",
  },
  {
    id: 7,
    slug: "blossom-and-broth",
    name: "Blossom & Broth",
    subtitle: "SAKURA DRAGON",
    price: 36.99,
    originalPrice: 46.99,
    badge: "LIMITED",
    badgeColor: "bg-primary text-primary-foreground",
    category: "Dragons",
    tags: ["#dragon", "#sakura", "#sunset"],
    color: "Mustard",
    colorHex: "#d4a84b",
    emoji: "🐉",
    description: "A majestic horned dragon coils protectively around its precious bowl, cherry blossoms falling all around.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy2-%20Dragon%20ramen%20%284%29-UDuirzpDBv4HxtvQSEajSh7D4mUloh.jpg",
  },
]

export const categories = ["All Designs", "Cats", "Dragons", "Kawaii", "Warriors", "Fine Art"]

export const announcements = [
  "🚚 FREE SHIPPING on orders over $75",
  "🆕 New designs drop every Friday",
  "✨ Use code SLURP25 for 25% off your first order",
  "👕 100% Garment-Dyed Heavyweight Cotton",
]

export const FREE_SHIPPING_THRESHOLD = 75
export const SIZES = ["S", "M", "L", "XL", "2XL"] as const
export type Size = typeof SIZES[number]
