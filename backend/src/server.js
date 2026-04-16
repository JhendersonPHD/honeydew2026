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
  { id: 13, name: 'Custom Measuring Spoons - Farm Set', slug: 'custom-measuring-spoons', description: 'Engraved measuring spoon set with farm design. Includes 1/4, 1/2, 1 tsp, and 1 tbsp. Food-safe stainless steel with 3D printed farm-theme handle. Great gift item.', price: 12.99, unit: 'set', images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'], farm: { name: 'MakerSpace 3D' }, category: { name: '3D Printed' }, category_id: 7, is_seasonal: false, is_featured: false, is_active: true, shopify_product_id: null, created_at: '2025-04-14T00:00:00Z' }
]

let orders = []

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
  let result = [...products]
  if (category) {
    const cat = categories.find(c => c.slug === category || c.id === parseInt(category))
    if (cat) result = result.filter(p => p.category_id === cat.id)
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
  res.json(result)
})

app.get('/api/products/featured', (req, res) => {
  res.json(products.filter(p => p.is_featured))
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
  res.json(product)
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
