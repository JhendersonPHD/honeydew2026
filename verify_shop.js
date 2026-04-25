const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('=== HoneyDew QA Verification 2026-04-25 ===\n');
  
  // 1. Home page
  console.log('1. HOME PAGE (/):');
  await page.goto('http://localhost:3016/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  const homeH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const homeButtons = await page.locator('button').count();
  const homeLinks = await page.locator('a').count();
  const homeDivs = await page.locator('div').count();
  console.log(`   H1: "${homeH1}"`);
  console.log(`   Buttons: ${homeButtons}, Links: ${homeLinks}, Divs: ${homeDivs}`);
  
  // 2. Shop page - wait longer for React to hydrate
  console.log('\n2. SHOP PAGE (/shop):');
  await page.goto('http://localhost:3016/shop', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  
  // Wait for product cards to appear
  try {
    await page.waitForSelector('[class*="product"], [class*="Product"], .card', { timeout: 5000 });
    console.log('   Product elements found');
  } catch(e) {
    console.log('   No product elements found (waiting 5s)');
  }
  
  const shopButtons = await page.locator('button').count();
  const shopInputs = await page.locator('input').count();
  const shopLinks = await page.locator('a').count();
  const shopImgs = await page.locator('img').count();
  const shopDivs = await page.locator('div').count();
  console.log(`   Buttons: ${shopButtons}, Inputs: ${shopInputs}, Links: ${shopLinks}, Images: ${shopImgs}, Divs: ${shopDivs}`);
  
  // Check for specific category buttons
  const categoryBtns = await page.locator('button[class*="category"], button[class*="Category"]').count();
  console.log(`   Category buttons: ${categoryBtns}`);
  
  // 3. API check
  console.log('\n3. API BACKEND CHECK:');
  const apiResponse = await page.request.get('http://localhost:8018/api/products');
  const products = await apiResponse.json();
  console.log(`   /api/products: ${products.length} products`);
  
  // 4. Product detail page
  console.log('\n4. PRODUCT DETAIL PAGE:');
  await page.goto('http://localhost:3016/products/organic-tomatoes', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  const prodButtons = await page.locator('button').count();
  const prodLinks = await page.locator('a').count();
  const prodH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  console.log(`   H1: "${prodH1}"`);
  console.log(`   Buttons: ${prodButtons}, Links: ${prodLinks}`);
  
  // 5. Check if React is rendering
  console.log('\n5. DOM CHECK:');
  const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 200));
  console.log(`   Root div content: "${rootHTML}"`);
  
  await browser.close();
  console.log('\n=== Verification Complete ===');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });