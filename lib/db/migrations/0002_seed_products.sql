-- ============================================================
-- NOREN — Seed Products Migration
-- Run in Supabase SQL Editor
-- ============================================================

-- Products
INSERT INTO products (
  id, slug, title, subtitle, description,
  price_cents, compare_at_price_cents, category, tags,
  badge, badge_color, emoji, is_featured,
  seo_title, seo_description
) VALUES
(
  '11111111-0001-0000-0000-000000000001',
  'the-ramen-connoisseur',
  'The Ramen Connoisseur',
  'KIMONO GUINEA PIG',
  'Meet the most cultured rodent in all of Edo. Dressed in hand-painted florals and wielding chopsticks with the precision of a Michelin-starred chef, this guinea pig didn''t come to play — it came to slurp.

Inspired by the quiet dignity of a creature who knows exactly what it wants (hint: it''s ramen), this design captures the intersection of kawaii culture and Japanese culinary obsession. The detail in the kimono pattern alone will have strangers stopping you on the street.

Wear it to your next ramen crawl. Wear it to brunch. Wear it to assert dominance over anyone who thinks guinea pigs can''t be elegant.',
  3499, 4499, 'Kawaii', ARRAY['kawaii','guineapig','kimono'],
  'BEST SELLER', 'bg-accent text-accent-foreground', '🐹', true,
  'The Ramen Connoisseur T-Shirt | Kawaii Guinea Pig Kimono Tee | NOREN',
  'Hand-illustrated guinea pig in a traditional kimono eating ramen. Printed on premium garment-dyed heavyweight cotton. Free shipping over $75.'
),
(
  '11111111-0002-0000-0000-000000000002',
  'black-cat-ramen',
  'Black Cat Ramen',
  'MIDNIGHT SLURP',
  'Those unblinking golden eyes have witnessed the rise and fall of empires. But right now, they''re locked onto something far more important: a steaming bowl of tonkotsu ramen with extra chashu.

This black cat doesn''t just eat ramen — it judges you while doing it. The minimal composition and bold contrast make this one of our most striking designs, perfect for cat people who appreciate clean aesthetics with a side of attitude.

A fan favorite for a reason. If you''ve ever made eye contact with a cat and felt like it was reading your soul, this tee gets it.',
  3299, 4299, 'Cats', ARRAY['cat','minimal','cute'],
  'FAN FAVORITE', 'bg-primary text-primary-foreground', '🐈‍⬛', true,
  'Black Cat Ramen T-Shirt | Japanese Cat Graphic Tee | NOREN',
  'A mysterious black cat enjoying ramen in this hand-illustrated Japanese-inspired graphic tee. Premium garment-dyed heavyweight cotton.'
),
(
  '11111111-0003-0000-0000-000000000003',
  'warriors-feast',
  'Warrior''s Feast',
  'NEKO SAMURAI',
  'Between battles, even the fiercest samurai must eat. This armored tabby has traded its katana for chopsticks — temporarily — because a warrior fights on an empty stomach exactly zero times.

Drawn in the style of traditional ukiyo-e woodblock prints, this design channels centuries of Japanese art history through a distinctly NOREN lens. The intricate armor detailing and dramatic pose would make Miyamoto Musashi himself crack a smile.

For those who carry themselves with quiet strength and loud ramen orders. The way of the noodle demands nothing less.',
  3699, 4699, 'Warriors', ARRAY['samurai','cat','ukiyoe'],
  'NEW DROP', 'bg-[#4ade80] text-[#0f0f0f]', '⚔️', false,
  'Warrior''s Feast T-Shirt | Samurai Cat Ramen Tee | NOREN',
  'Samurai cat eating ramen in ukiyo-e style. Hand-illustrated on premium garment-dyed Comfort Colors heavyweight cotton tee.'
),
(
  '11111111-0004-0000-0000-000000000004',
  'city-sized-hunger',
  'City-Sized Hunger',
  'KAIJU APPETITE',
  'When you''re the size of a skyscraper and your hunger matches your stature, only one thing will do: a bowl of ramen the size of a city block. The buildings are just garnish.

This kaiju-inspired design reimagines the classic monster movie genre through a noodle-obsessed lens. The sense of scale is absurd, intentional, and deeply satisfying. Tiny skyscrapers. Massive chopsticks. Steam rising like storm clouds.

Perfect for anyone who''s ever said "I could eat a whole building" and meant it literally. Go big or go home. Preferably with leftovers.',
  3699, 4699, 'Dragons', ARRAY['dragon','kaiju','epic'],
  'EPIC', 'bg-primary text-primary-foreground', '🦖', false,
  'City-Sized Hunger T-Shirt | Kaiju Dragon Ramen Tee | NOREN',
  'A massive dragon devouring ramen over a cityscape. Hand-illustrated Japanese-inspired graphic on premium heavyweight cotton.'
),
(
  '11111111-0005-0000-0000-000000000005',
  'black-cat-at-golden-hour',
  'Black Cat at Golden Hour',
  'SUNSET NOODLES',
  'The sun dips below the Japanese countryside. Rice paddies glow amber. A black cat sits in perfect silhouette, chopsticks raised, savoring the last warm bowl of the day. There''s no rush. There''s nowhere else to be.

This is our most atmospheric design — a love letter to the golden hour ritual of slowing down. The warm palette and serene composition make it the kind of shirt that starts conversations with "where did you get that?"

For the contemplative ramen lover. The one who knows that the best meals happen when you stop trying to be somewhere else.',
  3499, 4499, 'Cats', ARRAY['cat','sunset','scenic'],
  'TRENDING', 'bg-accent text-accent-foreground', '🌅', false,
  'Black Cat at Golden Hour T-Shirt | Sunset Ramen Cat Tee | NOREN',
  'Black cat enjoying ramen at sunset in the Japanese countryside. Hand-illustrated on garment-dyed heavyweight cotton tee.'
),
(
  '11111111-0006-0000-0000-000000000006',
  'hokusais-ramen',
  'Hokusai''s Ramen',
  'THE GREAT SLURP',
  'Katsushika Hokusai''s "The Great Wave off Kanagawa" is arguably the most iconic piece of Japanese art ever created. We asked a simple question: what if it was soup?

Koi fish leap through towering waves of broth. Noodles cascade like seafoam. The entire composition reimagines one of art history''s greatest works as the world''s most epic bowl of ramen. It''s absurd. It''s beautiful. It''s everything NOREN stands for.

This is our collector''s piece — the one that art history nerds and ramen fanatics agree on. Hang-worthy, but we put it on a shirt instead because art belongs on your back, not your wall.',
  3899, 4899, 'Fine Art', ARRAY['wave','hokusai','art'],
  'COLLECTOR''S', 'bg-primary text-primary-foreground', '🌊', false,
  'Hokusai''s Ramen T-Shirt | Great Wave Ramen Tee | NOREN',
  'The Great Wave off Kanagawa reimagined as ramen. Koi fish swim through broth in this hand-illustrated collector''s tee on premium cotton.'
),
(
  '11111111-0007-0000-0000-000000000007',
  'blossom-and-broth',
  'Blossom & Broth',
  'SAKURA DRAGON',
  'A horned dragon coils protectively around its precious bowl of ramen as cherry blossoms fall like confetti at a celebration for one. This is tenderness and power in the same breath — a mythical guardian whose treasure isn''t gold, but perfectly seasoned broth.

The sakura petals add a fleeting, seasonal beauty that makes this design feel alive. Every time you look at it, you''ll notice a new detail — a scale, a blossom, a wisp of steam curling through ancient horns.

Limited for a reason. Some designs are too special to mass-produce. This is one of them.',
  3699, 4699, 'Dragons', ARRAY['dragon','sakura','sunset'],
  'LIMITED', 'bg-primary text-primary-foreground', '🐉', false,
  'Blossom & Broth T-Shirt | Sakura Dragon Ramen Tee | NOREN',
  'A majestic dragon guards its ramen bowl among falling cherry blossoms. Hand-illustrated limited edition on premium heavyweight cotton.'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  price_cents = EXCLUDED.price_cents,
  compare_at_price_cents = EXCLUDED.compare_at_price_cents,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  badge = EXCLUDED.badge,
  badge_color = EXCLUDED.badge_color,
  emoji = EXCLUDED.emoji,
  is_featured = EXCLUDED.is_featured,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  updated_at = now();

-- Product Variants (5 sizes per product)
INSERT INTO product_variants (product_id, size, color, color_hex, sku, stock_status) VALUES
-- The Ramen Connoisseur (Seafoam)
('11111111-0001-0000-0000-000000000001', 'S',   'Seafoam', '#7ac9b3', 'NOR-RC-SEA-S',   'in_stock'),
('11111111-0001-0000-0000-000000000001', 'M',   'Seafoam', '#7ac9b3', 'NOR-RC-SEA-M',   'in_stock'),
('11111111-0001-0000-0000-000000000001', 'L',   'Seafoam', '#7ac9b3', 'NOR-RC-SEA-L',   'in_stock'),
('11111111-0001-0000-0000-000000000001', 'XL',  'Seafoam', '#7ac9b3', 'NOR-RC-SEA-XL',  'in_stock'),
('11111111-0001-0000-0000-000000000001', '2XL', 'Seafoam', '#7ac9b3', 'NOR-RC-SEA-2XL', 'in_stock'),
-- Black Cat Ramen (Yam)
('11111111-0002-0000-0000-000000000002', 'S',   'Yam', '#c97b63', 'NOR-BCR-YAM-S',   'in_stock'),
('11111111-0002-0000-0000-000000000002', 'M',   'Yam', '#c97b63', 'NOR-BCR-YAM-M',   'in_stock'),
('11111111-0002-0000-0000-000000000002', 'L',   'Yam', '#c97b63', 'NOR-BCR-YAM-L',   'in_stock'),
('11111111-0002-0000-0000-000000000002', 'XL',  'Yam', '#c97b63', 'NOR-BCR-YAM-XL',  'in_stock'),
('11111111-0002-0000-0000-000000000002', '2XL', 'Yam', '#c97b63', 'NOR-BCR-YAM-2XL', 'in_stock'),
-- Warrior's Feast (Washed Denim)
('11111111-0003-0000-0000-000000000003', 'S',   'Washed Denim', '#8b9dc3', 'NOR-WF-DEN-S',   'in_stock'),
('11111111-0003-0000-0000-000000000003', 'M',   'Washed Denim', '#8b9dc3', 'NOR-WF-DEN-M',   'in_stock'),
('11111111-0003-0000-0000-000000000003', 'L',   'Washed Denim', '#8b9dc3', 'NOR-WF-DEN-L',   'in_stock'),
('11111111-0003-0000-0000-000000000003', 'XL',  'Washed Denim', '#8b9dc3', 'NOR-WF-DEN-XL',  'in_stock'),
('11111111-0003-0000-0000-000000000003', '2XL', 'Washed Denim', '#8b9dc3', 'NOR-WF-DEN-2XL', 'in_stock'),
-- City-Sized Hunger (Washed Denim)
('11111111-0004-0000-0000-000000000004', 'S',   'Washed Denim', '#8b9dc3', 'NOR-CSH-DEN-S',   'in_stock'),
('11111111-0004-0000-0000-000000000004', 'M',   'Washed Denim', '#8b9dc3', 'NOR-CSH-DEN-M',   'in_stock'),
('11111111-0004-0000-0000-000000000004', 'L',   'Washed Denim', '#8b9dc3', 'NOR-CSH-DEN-L',   'in_stock'),
('11111111-0004-0000-0000-000000000004', 'XL',  'Washed Denim', '#8b9dc3', 'NOR-CSH-DEN-XL',  'in_stock'),
('11111111-0004-0000-0000-000000000004', '2XL', 'Washed Denim', '#8b9dc3', 'NOR-CSH-DEN-2XL', 'in_stock'),
-- Black Cat at Golden Hour (Moss)
('11111111-0005-0000-0000-000000000005', 'S',   'Moss', '#7d8c75', 'NOR-BCG-MOS-S',   'in_stock'),
('11111111-0005-0000-0000-000000000005', 'M',   'Moss', '#7d8c75', 'NOR-BCG-MOS-M',   'in_stock'),
('11111111-0005-0000-0000-000000000005', 'L',   'Moss', '#7d8c75', 'NOR-BCG-MOS-L',   'in_stock'),
('11111111-0005-0000-0000-000000000005', 'XL',  'Moss', '#7d8c75', 'NOR-BCG-MOS-XL',  'in_stock'),
('11111111-0005-0000-0000-000000000005', '2XL', 'Moss', '#7d8c75', 'NOR-BCG-MOS-2XL', 'in_stock'),
-- Hokusai's Ramen (Washed Denim)
('11111111-0006-0000-0000-000000000006', 'S',   'Washed Denim', '#8b9dc3', 'NOR-HR-DEN-S',   'in_stock'),
('11111111-0006-0000-0000-000000000006', 'M',   'Washed Denim', '#8b9dc3', 'NOR-HR-DEN-M',   'in_stock'),
('11111111-0006-0000-0000-000000000006', 'L',   'Washed Denim', '#8b9dc3', 'NOR-HR-DEN-L',   'in_stock'),
('11111111-0006-0000-0000-000000000006', 'XL',  'Washed Denim', '#8b9dc3', 'NOR-HR-DEN-XL',  'in_stock'),
('11111111-0006-0000-0000-000000000006', '2XL', 'Washed Denim', '#8b9dc3', 'NOR-HR-DEN-2XL', 'in_stock'),
-- Blossom & Broth (Mustard)
('11111111-0007-0000-0000-000000000007', 'S',   'Mustard', '#d4a84b', 'NOR-BB-MUS-S',   'in_stock'),
('11111111-0007-0000-0000-000000000007', 'M',   'Mustard', '#d4a84b', 'NOR-BB-MUS-M',   'in_stock'),
('11111111-0007-0000-0000-000000000007', 'L',   'Mustard', '#d4a84b', 'NOR-BB-MUS-L',   'in_stock'),
('11111111-0007-0000-0000-000000000007', 'XL',  'Mustard', '#d4a84b', 'NOR-BB-MUS-XL',  'in_stock'),
('11111111-0007-0000-0000-000000000007', '2XL', 'Mustard', '#d4a84b', 'NOR-BB-MUS-2XL', 'in_stock')
ON CONFLICT (sku) DO NOTHING;

-- Product Images (1 primary image per product)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
(
  '11111111-0001-0000-0000-000000000001',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy1-%20Kawaii%20Guinea%20Pig%20in%20Kimono%20Eating%20Ramen%20%284%29-AOkgjGwcZbGSAzhAZnesFHLXoMfsnV.jpg',
  'Kawaii guinea pig wearing a traditional Japanese kimono, holding chopsticks over a steaming bowl of ramen',
  0, true
),
(
  '11111111-0002-0000-0000-000000000002',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy2-%20Funny%20black%20cat%20ramen%20%282%29-F51BrLneGeMqinUjzdzLccG4i2EEBi.jpg',
  'Black cat with glowing eyes sitting before a bowl of ramen, midnight aesthetic',
  0, true
),
(
  '11111111-0003-0000-0000-000000000003',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy1-%20Cat%20ramen%20samurai%20%283%29-Po682cqN910jWLXcligFy9VUltCHAr.jpg',
  'Armored samurai cat in full battle regalia eating ramen, ukiyo-e woodblock print style',
  0, true
),
(
  '11111111-0004-0000-0000-000000000004',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy1-%20Dragon%20ramen%20%284%29-fd7kHj5ETwIqohuNd9DJyTjnJswx4c.jpg',
  'Giant kaiju dragon eating a massive bowl of ramen over a cityscape skyline',
  0, true
),
(
  '11111111-0005-0000-0000-000000000005',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy2-%20Black%20Cat%20ramen%20%282%29-GM0qnVUSrem4oVDvcYkDniB8I8BqhD.jpg',
  'Black cat silhouette eating ramen at golden hour, Japanese countryside sunset backdrop',
  0, true
),
(
  '11111111-0006-0000-0000-000000000006',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy2-%20Ramen%20Japanese%20%281%29-eaPY2oUGvJ7XLYRw4SHYBcsCBVh8gb.jpg',
  'The Great Wave off Kanagawa reimagined as a towering wave of ramen broth with koi fish swimming through noodles',
  0, true
),
(
  '11111111-0007-0000-0000-000000000007',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-03-2026-%20Etsy2-%20Dragon%20ramen%20%284%29-UDuirzpDBv4HxtvQSEajSh7D4mUloh.jpg',
  'Majestic horned dragon coiled around a ramen bowl with sakura cherry blossoms falling',
  0, true
)
ON CONFLICT DO NOTHING;
