export const farms = [
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

export const categories = [
  { id: 1, name: 'Vegetables', slug: 'vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400', parent_id: null, sort_order: 1 },
  { id: 2, name: 'Fruits', slug: 'fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400', parent_id: null, sort_order: 2 },
  { id: 3, name: 'Dairy', slug: 'dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', parent_id: null, sort_order: 3 },
  { id: 4, name: 'Eggs', slug: 'eggs', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', parent_id: null, sort_order: 4 },
  { id: 5, name: 'Herbs', slug: 'herbs', image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=400', parent_id: null, sort_order: 5 },
  { id: 6, name: 'Honey', slug: 'honey', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', parent_id: null, sort_order: 6 },
  { id: 7, name: '3D Printed', slug: '3d-printed', image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=400', parent_id: null, sort_order: 7 }
]

export const products = [
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

export let users = []
export let orders = []
export const carts = new Map();
