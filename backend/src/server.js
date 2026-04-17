import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { apiLimiter } from './middleware/rateLimiter.js'
import authRoutes from './routes/auth.js'
import { authenticate } from './middleware/auth.js'
import { generateAuthUrl, exchangeToken, verifyWebhook } from './services/shopifyOAuth.js'
import { auditLog } from './utils/security.js'

// Import new growth and engagement routes
import loyaltyRoutes from '../app/routes/loyalty.js'
import referralRoutes from '../app/routes/referral.js'
import gamificationRoutes from '../app/routes/gamification.js'

// Import services for integrating with orders
import { awardPoints } from '../app/services/loyaltyService.js'
import { processAction } from '../app/services/gamificationService.js'

const app = express()
const PORT = 8018

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Apply rate limiting to all API routes
app.use('/api', apiLimiter)

// Mount webhook routes before express.json() to get raw body
app.post('/api/shopify/webhooks/products/create', express.raw({type: 'application/json'}), (req, res) => {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const body = req.body; // Buffer from express.raw

  if (!verifyWebhook(body.toString(), hmac)) {
    auditLog('SHOPIFY_WEBHOOK_INVALID_SIGNATURE', null, req.ip);
    return res.status(401).send('Webhook validation failed');
  }

  auditLog('SHOPIFY_WEBHOOK_RECEIVED', null, req.ip, { topic: 'products/create' });
  res.status(200).send('OK');
})

app.use(express.json())
app.use(cookieParser())

// ─── Mock Data ───────────────────────────────────────────────────────────────

const farms = [
  {
    id: 1,
    name: 'Sunny Meadow Farm',
    slug: 'sunny-meadow-farm',
    description: 'Family-owned organic farm specializing in seasonal vegetables and free-range eggs.',
    story: 'Founded in 1985, Sunny Meadow has been providing fresh, organic produce to our community for over 35 years.',
    location: 'Willamette Valley, OR',
    lat: 45.2232,
    lng: -123.0764,
    images: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800'],
    contact_email: 'info@sunnymeadowfarm.com',
    contact_phone: '(503) 555-0142',
    rating: 4.8,
    is_verified: true,
    is_featured: true,
    created_at: '2025-01-15T00:00:00Z'
  },
  {
    id: 2,
    name: 'Green Valley Orchard',
    slug: 'green-valley-orchard',
    description: 'Premium apple and pear orchard with a focus on heirloom varieties.',
    story: 'Three generations of apple growers, dedicated to preserving heritage fruit varieties.',
    location: 'Hood River, OR',
    lat: 45.7053,
    lng: -121.5215,
    images: ['https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800'],
    contact_email: 'hello@greenvalleyorchard.com',
    contact_phone: '(541) 555-0198',
    rating: 4.6,
    is_verified: true,
    is_featured: true,
    created_at: '2025-02-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Happy Hen Homestead',
    slug: 'happy-hen-homestead',
    description: 'Pasture-raised poultry and fresh eggs from heritage breed chickens.',
    story: 'Our hens roam freely on 10 acres of certified organic pasture.',
    location: 'Portland, OR',
    lat: 45.5152,
    lng: -122.6784,
    images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800'],
    contact_email: 'eggs@happyhen.com',
    contact_phone: '(503) 555-0277',
    rating: 4.9,
    is_verified: true,
    is_featured: false,
    created_at: '2025-03-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'MakerSpace 3D',
    slug: 'makerspace-3d',
    description: 'Portland\'s premier 3D printing workshop crafting custom farm-to-home items.',
    story: 'Founded in 2024, MakerSpace 3D combines modern additive manufacturing with farm aesthetic. Every item is designed locally and printed with food-safe, eco-friendly materials.',
    location: 'Portland, OR',
    lat: 45.5152,
    lng: -122.6584,
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'],
    contact_email: 'hello@makerspace3d.com',
    contact_phone: '(503) 555-0399',
    rating: 4.7,
    is_verified: true,
    is_featured: true,
    created_at: '2025-04-01T00:00:00Z'
  }
]

const categories = [
  { id: 1, name: 'Vegetables', slug: 'vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400', parent_id: null, sort_order: 1 },
  { id: 2, name: 'Fruits', slug: 'fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400', parent_id: null, sort_order: 2 },
  { id: 3, name: 'Dairy', slug: 'dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', parent_id: null, sort_order: 3 },
  { id: 4, name: 'Eggs', slug: 'eggs', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', parent_id: null, sort_order: 4 },
  { id: 5, name: 'Herbs', slug: 'herbs', image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=400', parent_id: null, sort_order: 5 },
  { id: 6, name: 'Honey', slug: 'honey', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', parent_id: null, sort_order: 6 },
  { id: 7, name: '3D Printed', slug: '3d-printed', image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=400', parent_id: null, sort_order: 7 }
]

const products = [
  { id: 1, name: 'Organic Tomatoes', slug: 'organic-tomatoes', description: 'Vine-ripened organic tomatoes, perfect for salads and cooking.', price: 5.99, unit: 'lb', images: ['https://images.unsplash.com/photo-1546470427-227c7a715614?w=800'], farm: { name: 'Sunny Meadow Farm' }, category: { name: 'Vegetables' }, category_id: 1, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-01-20T00:00:00Z' },
  { id: 2, name: 'Fresh Spinach', slug: 'fresh-spinach', description: 'Tender baby spinach leaves, harvested daily.', price: 4.49, unit: 'bunch', images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800'], farm: { name: 'Sunny Meadow Farm' }, category: { name: 'Vegetables' }, category_id: 1, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-01-21T00:00:00Z' },
  { id: 3, name: 'Honeycrisp Apples', slug: 'honeycrisp-apples', description: 'Sweet and crisp Honeycrisp apples, orchard-fresh.', price: 3.99, unit: 'lb', images: ['https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800'], farm: { name: 'Green Valley Orchard' }, category: { name: 'Fruits' }, category_id: 2, is_seasonal: true, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-02-05T00:00:00Z' },
  { id: 4, name: 'Free-Range Eggs', slug: 'free-range-eggs', description: 'Pasture-raised eggs from heritage breed hens.', price: 7.99, unit: 'dozen', images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800'], farm: { name: 'Happy Hen Homestead' }, category: { name: 'Eggs' }, category_id: 4, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-03-05T00:00:00Z' },
  { id: 5, name: 'Raw Honey', slug: 'raw-honey', description: 'Pure, raw wildflower honey from local beehives.', price: 12.99, unit: 'jar', images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800'], farm: { name: 'Sunny Meadow Farm' }, category: { name: 'Honey' }, category_id: 6, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-01-25T00:00:00Z' },
  { id: 6, name: 'Fresh Basil', slug: 'fresh-basil', description: 'Aromatic fresh basil, perfect for Italian dishes.', price: 3.49, unit: 'bunch', images: ['https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=800'], farm: { name: 'Sunny Meadow Farm' }, category: { name: 'Herbs' }, category_id: 5, is_seasonal: true, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-01T00:00:00Z' },
  { id: 7, name: 'Carrots', slug: 'carrots', description: 'Sweet, crunchy organic carrots.', price: 3.99, unit: 'bunch', images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800'], farm: { name: 'Sunny Meadow Farm' }, category: { name: 'Vegetables' }, category_id: 1, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-01-22T00:00:00Z' },
  { id: 8, name: 'Butternut Squash', slug: 'butternut-squash', description: 'Sweet butternut squash, great for soups.', price: 4.99, unit: 'each', images: ['https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=800'], farm: { name: 'Sunny Meadow Farm' }, category: { name: 'Vegetables' }, category_id: 1, is_seasonal: true, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-09-15T00:00:00Z' },
  // 3D Printed Products
  { id: 9, name: 'Custom Honey Jar Lid Topper', slug: 'honey-jar-lid-topper', description: 'Hand-designed 3D printed lid topper for standard mason jars. Keeps honey fresh and adds a rustic charm. Food-safe PLA material. Fits most half-pint and pint jars.', price: 4.99, unit: 'each', images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-10T00:00:00Z' },
  { id: 10, name: 'Farm Sign Door Hanger', slug: 'farm-sign-door-hanger', description: 'Customizable 3D printed door hanger with your farm name or family name. Weather-resistant PLA. Perfect for barn doors, farm stands, or gift. Name customization available.', price: 24.99, unit: 'each', images: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-11T00:00:00Z' },
  { id: 11, name: 'Egg Carton Insert - Protective Dividers', slug: 'egg-carton-insert', description: '3D printed egg carton divider inserts that protect farm-fresh eggs during delivery. Set of 2 fits standard 12-egg cartons. Food-safe, washable PLA.', price: 3.99, unit: 'set', images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-12T00:00:00Z' },
  { id: 12, name: 'Geometric Herb Planter', slug: 'geometric-herb-planter', description: 'Modern geometric 3D printed herb planter. Stackable design for growing kitchen herbs. Drainage holes included. Food-safe PLA. Perfect gift for gardeners.', price: 18.99, unit: 'each', images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-13T00:00:00Z' },
  { id: 13, name: 'Custom Measuring Spoons - Farm Set', slug: 'custom-measuring-spoons', description: 'Engraved measuring spoon set with farm design. Includes 1/4, 1/2, 1 tsp, and 1 tbsp. Food-safe stainless steel with 3D printed farm-theme handle. Great gift item.', price: 12.99, unit: 'set', images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-14T00:00:00Z' },
  // ─── New 3D Printed Products – Research Gap Fillers ───────────────────────────
  { id: 14, name: 'Honeycomb Candle Holder', slug: 'honeycomb-candle-holder', description: 'Beautiful hexagonal honeycomb candle holder cast in beeswax-scented PLA. Holds standard pillar candles. The geometric honeycomb pattern creates stunning light effects when lit. A romantic dinner or farm table accent piece.', price: 22.99, unit: 'each', images: ['https://images.unsplash.com/photo-1602524808-8688f05d6d97?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-15T00:00:00Z' },
  { id: 15, name: 'Mason Bee House Mount', slug: 'mason-bee-house-mount', description: 'Precision-printed wall mount for mason bee houses. Weather-resistant PLA holds up year-round in all conditions. Designed for easy installation on fences, walls, or garden posts. Supports local pollinators!', price: 18.99, unit: 'each', images: ['https://images.unsplash.com/photo-1475754156104-c5e0b8a3e3b0?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 16, name: 'Honeycomb Soap Dish', slug: 'honeycomb-soap-dish', description: 'Hexagonal soap holder with drainage channels — keeps bar soap dry and lasting 2x longer. Bees and honeycomb themed design with subtle embossed bee pattern. Natural PLA finish. Dishwasher safe.', price: 14.99, unit: 'each', images: ['https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 17, name: 'Farm Logo Dog Food Scoop', slug: 'farm-logo-dog-food-scoop', description: 'Durable 3D printed scoop with farm name personalization option. Long handle keeps hands clean when filling dog bowls. Made from pet-safe, non-toxic PLA. Holds exactly 1 cup of kibble. Add your farm name at checkout!', price: 14.99, unit: 'each', images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 18, name: 'Veggie Garden Stake Set', slug: 'veggie-garden-stake-set', description: 'Set of 6 colorful plant markers in vegetable shapes — tomato, carrot, pepper, zucchini, corn, and bean. Weatherproof UV-resistant PLA lasts multiple seasons. Includes chalk-write surface for custom labels. Perfect spring planting gift!', price: 16.99, unit: 'set', images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: true, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 19, name: 'Butter Keeper Bell', slug: 'butter-keeper-bell', description: 'European-style butter keeper — the bell design keeps butter fresh and spreadable for up to 2 weeks. Just fill the base with a little water to create an airtight seal. Farmhouse aesthetic for your kitchen counter!', price: 18.99, unit: 'each', images: ['https://images.unsplash.com/photo-1550589400-64fd8da7c42a?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 20, name: 'Farm Animal Cookie Cutter Set', slug: 'farm-animal-cookie-cutters', description: 'Set of 6 farm animal shaped cookie cutters — cow, pig, chicken, sheep, horse, and duck. Rolled edges for comfortable grip. Food-safe PLA. Perfect for farm birthday parties, farmer\'s market baked goods, or holiday gift bags.', price: 15.99, unit: 'set', images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 21, name: 'Seedling Self-Watering Spike Set', slug: 'seedling-watering-spike', description: 'Set of 4 self-watering spikes for seedlings and potted plants. Thread onto standard plastic bottles for a simple drip irrigation system. Perfect for busy farmers market weekends! Great for the garden-to-table story.', price: 12.99, unit: 'set', images: ['https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: true, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 22, name: 'Honeycomb Toothbrush Holder', slug: 'honeycomb-toothbrush-holder', description: 'Modern hexagonal toothbrush holder with 4 slots and drainage base. Keeps toothbrushes organized and elevated for better hygiene. Honeycomb wall pattern is elegant in any bathroom. Dishwasher safe PLA.', price: 16.99, unit: 'each', images: ['https://images.unsplash.com/photo-1585500056547-1bb2a0c7a6f2?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 23, name: 'Queen Bee Gift Tag Set', slug: 'queen-bee-gift-tags', description: 'Set of 12 reusable honeycomb-shaped gift tags in natural kraft PLA. Perfect for farm stand produce boxes, CSA subscription boxes, and farmers market packaging. Handwrite the recipient name or farm message. Eco-friendly alternative to paper tags.', price: 9.99, unit: 'set', images: ['https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  { id: 24, name: 'Chicken Feed Scoop', slug: 'chicken-feed-scoop', description: 'Ergonomic 3D printed chicken feed scoop designed for farm coops. Long handle keeps you at a comfortable distance. Capacity: exactly 2 cups per scoop. Pet-safe PLA. The perfect accessory for Happy Hen Homestead customers!', price: 11.99, unit: 'each', images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-16T00:00:00Z' },
  // ─── New Products from Research – Board Game, Desk & Kitchen ─────────────────
  { id: 25, name: 'Adjustable Phone Stand Pro', slug: 'phone-stand-pro', description: 'Sleek adjustable phone and tablet stand for desk. Multiple viewing angles for video calls, streaming, and reading recipes. Non-slip base and cable management channel. Works with all phone sizes including Max/Mini. Farm-house white finish.', price: 18.99, unit: 'each', images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 26, name: 'Under-Desk Cable Management Tray', slug: 'cable-management-tray', description: 'Clean up your desk setup with this under-desk cable organizer tray. Screws mount or adhesive stick. Holds power bricks, hubs, and excess cable length. Eliminates cord clutter. Measures 12" x 4" x 3".', price: 22.99, unit: 'each', images: ['https://images.unsplash.com/photo-1593640408182-31c228f54abb?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 27, name: 'Catan Resource Tray Insert', slug: 'catan-insert', description: 'Custom-fit foam insert for Catan board game. Keeps resource cards,Development cards, and pieces organized during setup and play. No more spilled sheep! Fits standard Catan box. Adds professional feel to game night.', price: 32.99, unit: 'each', images: ['https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 28, name: 'Modular Drawer Organizer Set', slug: 'drawer-organizer-set', description: 'Customizable drawer organizer for kitchen utensils or desk supplies. 8-piece modular set with various compartments. Snap-together design fits any drawer size. Dishwasher safe PLA. Stop hunting for that spatula!', price: 28.99, unit: 'set', images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 29, name: 'Elevated Cat Food Bowl Stand', slug: 'cat-bowl-stand', description: 'Raised cat feeder stand promotes better digestion and reduces neck strain. Adjusts to 3 heights. Non-slip rubber feet. Removable stainless steel bowls (2 cups each). Modern farmhouse design looks great in any kitchen.', price: 24.99, unit: 'each', images: ['https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 30, name: 'Nintendo Switch Game Card Case', slug: 'switch-card-case', description: 'Store up to 12 Switch game cards in this slim, snap-shut case. Anti-scratch interior lining. Replaceable labels for each slot. Crush-proof design fits in back pocket. Perfect for traveling to game night or farmers market arcade events.', price: 15.99, unit: 'each', images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 31, name: 'Gaming Headphone Stand', slug: 'headphone-stand', description: 'Solid desktop headphone stand with weighted base. Fits all headset sizes including over-ear and on-ear. Cable routing channel built in. Farmhouse oak and white design matches any desk aesthetic. No more tangled cords!', price: 19.99, unit: 'each', images: ['https://images.unsplash.com/photo-1593640408182-31c228f54abb?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: true, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 32, name: 'Lazy Susan Bearing Insert - Heavy Duty', slug: 'lazy-susan-bearing', description: 'Professional-grade lazy susan bearing insert for cabinets and turntables. Supports up to 50 lbs. Smooth 360° rotation. Fits standard 16" and 18" cabinet openings. Whisper-quiet — no squeaking! Great for spice racks and corner cabinet solutions.', price: 18.99, unit: 'each', images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 33, name: 'Drone Prop Guard Set - Universal', slug: 'drone-prop-guard', description: 'Snap-on propeller guards for DJI Mini, Eachine, and other popular mini drones. Impact-absorbing PLA+ protects fingers and furniture during indoor flight practice. Lightweight design doesn\'t affect flight time. Set of 4 guards.', price: 14.99, unit: 'set', images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' },
  { id: 34, name: 'Adaptive Kitchen Utensil Grip', slug: 'adaptive-utensil-grip', description: 'Large-handle adapter that fits over standard utensils for arthritis or limited grip. Fits spoons, forks, pens, paintbrushes. Medical-grade food-safe silicone over durable PLA core. Set of 3 sizes. Makes cooking accessible again.', price: 16.99, unit: 'set', images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-17T00:00:00Z' }
]

let orders = []

// ─── Reviews Data (seeded) ────────────────────────────────────────────────────
const reviews = [
  { id: 1, product_id: 1, user_id: 1, user_name: 'Sarah M.', rating: 5, title: 'Freshest tomatoes ever!', body: 'These are the best tomatoes I\'ve had since my grandmother\'s garden. So flavorful and ripe.', created_at: '2025-02-15T10:30:00Z' },
  { id: 2, product_id: 1, user_id: 2, user_name: 'David K.', rating: 4, title: 'Great quality', body: 'Very fresh, arrived same day. Slightly pricier than grocery store but worth it.', created_at: '2025-02-20T14:00:00Z' },
  { id: 3, product_id: 1, user_id: 3, user_name: 'Mia R.', rating: 5, title: 'Perfect for pasta sauce', body: 'Made the most amazing marinara with these. Will order again!', created_at: '2025-03-01T09:15:00Z' },
  { id: 4, product_id: 2, user_id: 1, user_name: 'Sarah M.', rating: 5, title: 'Incredibly fresh', body: 'Baby spinach is so tender and clean. No grit at all.', created_at: '2025-02-18T11:00:00Z' },
  { id: 5, product_id: 2, user_id: 4, user_name: 'James T.', rating: 4, title: 'Great for smoothies', body: 'Used in my morning green smoothie. Fresh and delicious!', created_at: '2025-03-05T08:45:00Z' },
  { id: 6, product_id: 3, user_id: 5, user_name: 'Emily W.', rating: 5, title: 'Best apples in town', body: 'Crisp, sweet, and absolutely perfect. My kids devour these.', created_at: '2025-02-25T16:30:00Z' },
  { id: 7, product_id: 4, user_id: 2, user_name: 'David K.', rating: 5, title: 'Incredible eggs', body: 'The yolks are so orange and rich. You can really taste the difference from pasture-raised hens.', created_at: '2025-03-02T10:00:00Z' },
  { id: 8, product_id: 5, user_id: 6, user_name: 'Anna L.', rating: 5, title: 'Pure and delicious', body: 'Raw honey is amazing. You can tell it\'s real local honey. Great on toast!', created_at: '2025-02-28T13:20:00Z' },
  { id: 9, product_id: 9, user_id: 7, user_name: 'Chris P.', rating: 5, title: 'Perfect for my honey jars', body: 'These lid toppers are beautiful! Adds such a nice rustic touch to my farmer\'s market display. Well-made.', created_at: '2025-04-15T11:00:00Z' },
  { id: 10, product_id: 9, user_id: 8, user_name: 'Lisa M.', rating: 4, title: 'Cute and functional', body: 'Bought as a gift and they loved it. Fits standard mason jars perfectly.', created_at: '2025-04-18T15:30:00Z' },
  { id: 11, product_id: 10, user_id: 9, user_name: 'Tom H.', rating: 5, title: 'Outstanding quality', body: 'Had my farm name printed on it. It looks professional and really stands up to weather. Worth every penny.', created_at: '2025-04-16T09:00:00Z' },
  { id: 12, product_id: 12, user_id: 10, user_name: 'Rachel S.', rating: 5, title: 'Love these planters!', body: 'Stack them on my kitchen windowsill. Perfect for growing basil and mint. Looks very modern.', created_at: '2025-04-17T14:00:00Z' },
  { id: 13, product_id: 12, user_id: 11, user_name: 'Kevin J.', rating: 4, title: 'Great design', body: 'The drainage holes are perfectly sized. Plants have been thriving for 2 weeks now.', created_at: '2025-04-20T10:30:00Z' },
  { id: 14, product_id: 14, user_id: 12, user_name: 'Nicole B.', rating: 5, title: 'Stunning centerpiece', body: 'Made this for a dinner party. The honeycomb pattern with candlelight is absolutely magical. Everyone asked where I got it.', created_at: '2025-04-18T20:00:00Z' },
  { id: 15, product_id: 14, user_id: 13, user_name: 'Ben F.', rating: 4, title: 'Beautiful craftsmanship', body: 'Detailed honeycomb design. Sits perfectly on my farm table.', created_at: '2025-04-21T16:00:00Z' },
  { id: 16, product_id: 16, user_id: 14, user_name: 'Sandra G.', rating: 5, title: 'No more soggy soap', body: 'The drainage channels really work. Bar soap lasts twice as long now. Love the bee design!', created_at: '2025-04-19T11:45:00Z' },
  { id: 17, product_id: 16, user_id: 15, user_name: 'Mark D.', rating: 4, title: 'Nice gift', body: 'Bought for our wedding favors. Guests loved them!', created_at: '2025-04-22T13:00:00Z' },
  { id: 18, product_id: 20, user_id: 16, user_name: 'Jessica K.', rating: 5, title: 'Farm party hit!', body: 'Used these for our farm birthday party. Kids loved the animal shapes. Cookies looked so professional.', created_at: '2025-04-20T15:30:00Z' },
  { id: 19, product_id: 25, user_id: 17, user_name: 'Alex R.', rating: 5, title: 'Perfect desk accessory', body: 'Sturdy and well-designed. Cable management channel is a nice touch. Looks great with my farmhouse office.', created_at: '2025-04-18T09:30:00Z' },
  { id: 20, product_id: 27, user_id: 18, user_name: 'Tyler W.', rating: 5, title: 'Game changer for Catan', body: 'No more spilled resources! This insert fits perfectly and makes setup so much faster. Love it.', created_at: '2025-04-21T20:00:00Z' },
  { id: 21, product_id: 31, user_id: 19, user_name: 'Danielle H.', rating: 5, title: 'Solid headphone stand', body: 'Weighted base is perfect — doesn\'t tip over. The farmhouse design fits my desk perfectly.', created_at: '2025-04-22T11:15:00Z' },
]

// ─── Reviews Routes ───────────────────────────────────────────────────────────

// Helper: compute avg_rating and review_count for a product
const getProductReviewStats = (productId) => {
  const productReviews = reviews.filter(r => r.product_id === productId)
  if (productReviews.length === 0) return { avg_rating: null, review_count: 0 }
  const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
  return { avg_rating: Math.round(avg * 10) / 10, review_count: productReviews.length }
}

// GET /api/reviews?product_id=X — get reviews for a product
app.get('/api/reviews', (req, res) => {
  const { product_id } = req.query
  if (!product_id) return res.status(400).json({ error: 'product_id required' })
  const productReviews = reviews
    .filter(r => r.product_id === parseInt(product_id))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  const stats = getProductReviewStats(parseInt(product_id))
  res.json({ reviews: productReviews, ...stats })
})

// POST /api/reviews — submit a new review
app.post('/api/reviews', authenticate, (req, res) => {
  const { product_id, rating, title, body } = req.body
  if (!product_id || !rating || !title || !body) {
    return res.status(400).json({ error: 'product_id, rating, title, body required' })
  }
  const product = products.find(p => p.id === parseInt(product_id))
  if (!product) return res.status(404).json({ error: 'Product not found' })
  if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be 1-5' })

  const newReview = {
    id: reviews.length + 1,
    product_id: parseInt(product_id),
    user_id: req.user.id,
    user_name: req.user.name || 'Anonymous',
    rating: parseInt(rating),
    title: title.trim(),
    body: body.trim(),
    created_at: new Date().toISOString()
  }
  reviews.push(newReview)
  const stats = getProductReviewStats(parseInt(product_id))
  res.status(201).json({ review: newReview, ...stats })
})

// ─── Auth Routes ─────────────────────────────────────────────────────────────

app.use('/api/auth', authRoutes)

// ─── Growth & Engagement Routes ──────────────────────────────────────────────

app.use('/api/loyalty', authenticate, loyaltyRoutes)
app.use('/api/referrals', authenticate, referralRoutes)
app.use('/api/gamification', authenticate, gamificationRoutes)

// ─── Farms Routes ────────────────────────────────────────────────────────────

app.get('/api/farms', (req, res) => {
  res.json(farms)
})

app.get('/api/farms/:slug', (req, res) => {
  const farm = farms.find(f => f.slug === req.params.slug)
  if (!farm) return res.status(404).json({ error: 'Farm not found' })
  res.json(farm)
})

app.get('/api/farms/:slug/products', (req, res) => {
  const farm = farms.find(f => f.slug === req.params.slug)
  if (!farm) return res.status(404).json({ error: 'Farm not found' })
  const farmProducts = products.filter(p => p.farm.name === farm.name)
  res.json(farmProducts)
})

// ─── Categories Routes ────────────────────────────────────────────────────────

app.get('/api/categories', (req, res) => {
  res.json(categories)
})

app.get('/api/categories/:slug', (req, res) => {
  const category = categories.find(c => c.slug === req.params.slug)
  if (!category) return res.status(404).json({ error: 'Category not found' })
  const categoryProducts = products.filter(p => p.category_id === category.id)
  res.json({ ...category, products: categoryProducts })
})

// ─── Products Routes ─────────────────────────────────────────────────────────

app.get('/api/products', (req, res) => {
  const { category, farm, search } = req.query
  console.log('[DEBUG] category query:', JSON.stringify(category), 'farm:', farm, 'search:', search)
  let result = [...products]
  if (category) {
    const cat = categories.find(c => c.slug === category || (parseInt(category).toString() === category && c.id === parseInt(category)))
    console.log('[DEBUG] cat found:', JSON.stringify(cat))
    if (cat) result = result.filter(p => p.category_id === cat.id)
    console.log('[DEBUG] result count:', result.length)
  }
  if (farm) {
    result = result.filter(p => p.farm.name.toLowerCase().includes(farm.toLowerCase()))
  }
  if (search) {
    const q = search.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }
  // Inject avg_rating and review_count into each product
  result = result.map(p => ({ ...p, ...getProductReviewStats(p.id) }))
  res.json(result)
})

app.get('/api/products/featured', (req, res) => {
  const featured = products.filter(p => p.is_featured).map(p => ({ ...p, ...getProductReviewStats(p.id) }))
  res.json(featured)
})

app.get('/api/products/search', (req, res) => {
  const { q } = req.query
  if (!q) return res.json([])
  const query = q.toLowerCase()
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.category.name.toLowerCase().includes(query)
  )
  res.json(results)
})

app.get('/api/products/:slug', (req, res) => {
  const product = products.find(p => p.slug === req.params.slug)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  const stats = getProductReviewStats(product.id)
  res.json({ ...product, ...stats })
})

// ─── Cart Routes (session-based, no DB) ──────────────────────────────────────

const carts = new Map()

app.get('/api/cart', authenticate, (req, res) => {
  const cart = carts.get(req.user.id) || []
  res.json(cart)
})

app.post('/api/cart', authenticate, (req, res) => {
  const { product_id, quantity = 1 } = req.body
  const product = products.find(p => p.id === product_id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  const cart = carts.get(req.user.id) || []
  const existing = cart.find(item => item.product_id === product_id)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({ product_id, product, quantity })
  }
  carts.set(req.user.id, cart)
  res.json(cart)
})

app.patch('/api/cart/:id', authenticate, (req, res) => {
  const { quantity } = req.body
  const cart = carts.get(req.user.id) || []
  const item = cart.find(i => i.product_id === parseInt(req.params.id))
  if (!item) return res.status(404).json({ error: 'Item not found in cart' })
  item.quantity = quantity
  carts.set(req.user.id, cart)
  res.json(cart)
})

app.delete('/api/cart/:id', authenticate, (req, res) => {
  const cart = carts.get(req.user.id) || []
  const filtered = cart.filter(i => i.product_id !== parseInt(req.params.id))
  carts.set(req.user.id, filtered)
  res.json(filtered)
})

// ─── Orders Routes ────────────────────────────────────────────────────────────

app.post('/api/orders', authenticate, (req, res) => {
  const { items, shipping_address, payment_method } = req.body
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' })
  }
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const order = {
    id: orders.length + 1,
    order_number: `HD-${Date.now().toString(36).toUpperCase()}`,
    user_id: req.user.id,
    status: 'confirmed',
    subtotal,
    shipping_cost: 0,
    tax: 0,
    total: subtotal,
    shipping_address,
    payment_method: payment_method || 'mock',
    payment_status: 'paid',
    notes: '',
    items,
    created_at: new Date().toISOString()
  }
  orders.push(order)
  // Clear user's cart
  carts.delete(req.user.id)

  // Award points based on total
  try {
    awardPoints(req.user.id, subtotal, `Earned points on order ${order.order_number}`);

    // Process gamification check
    const farms = [...new Set(items.map(item => item.product?.farm?.name).filter(Boolean))];
    processAction(req.user.id, 'order', { farms });
  } catch (error) {
    console.error('Error processing loyalty/gamification for order', error);
  }

  res.json(order)
})

app.get('/api/orders', authenticate, (req, res) => {
  const userOrders = orders.filter(o => o.user_id === req.user.id)
  res.json(userOrders)
})

app.get('/api/orders/:id', authenticate, (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id) && o.user_id === req.user.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})

// ─── Shopify Sync (mock) ─────────────────────────────────────────────────────

app.get('/api/shopify/oauth/install', authenticate, (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(400).json({ error: 'Shop parameter missing' });
  const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:8018'}/api/shopify/oauth/callback`;
  const authUrl = generateAuthUrl(shop, redirectUri);
  res.json({ authUrl });
})

app.get('/api/shopify/oauth/callback', async (req, res) => {
  const { shop, code } = req.query;
  try {
    const tokenData = await exchangeToken(shop, code);
    auditLog('SHOPIFY_OAUTH_SUCCESS', null, req.ip, { shop });
    // In a real app, save tokenData to the user's DB record
    res.json({ success: true, message: 'Shopify OAuth successful' });
  } catch (error) {
    auditLog('SHOPIFY_OAUTH_FAILURE', null, req.ip, { shop, error: error.message });
    res.status(400).json({ error: 'OAuth failed' });
  }
})

app.post('/api/shopify/sync', authenticate, (req, res) => {
  res.json({ status: 'synced', products_synced: products.length, timestamp: new Date().toISOString() })
})

app.get('/api/shopify/status', authenticate, (req, res) => {
  res.json({ connected: true, last_sync: new Date().toISOString(), product_count: products.length })
})

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`HoneyDew 2026 API running on http://localhost:${PORT}`)
  console.log(`Health: http://localhost:${PORT}/api/health`)
})
