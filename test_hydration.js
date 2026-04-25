const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('=== Testing React Hydration ===\n');
  
  // Test 1: Direct navigation to shop
  console.log('1. DIRECT NAVIGATION to /shop:');
  await page.goto('http://localhost:3016/shop', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(5000);
  let rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 300));
  console.log(`   Root HTML: "${rootHTML}"`);
  let buttons = await page.locator('button').count();
  console.log(`   Buttons after 5s: ${buttons}`);
  
  // Test 2: Navigate from home via click
  console.log('\n2. CLIENT-SIDE NAV from / to /shop:');
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Click the browse/shop link
  const shopLink = page.locator('a[href="/shop"]').first();
  const linkExists = await shopLink.count();
  console.log(`   Shop link found: ${linkExists > 0}`);
  
  if (linkExists > 0) {
    await shopLink.click();
    await page.waitForTimeout(3000);
    rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 300));
    console.log(`   Root HTML after click: "${rootHTML}"`);
    buttons = await page.locator('button').count();
    console.log(`   Buttons after click: ${buttons}`);
  }
  
  // Test 3: Check if there's a JS error preventing render
  console.log('\n3. CHECKING for JS ERRORS:');
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await page.reload('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(5000);
  console.log(`   Page errors: ${errors.length > 0 ? errors.join(', ') : 'None'}`);
  
  await browser.close();
  console.log('\nDone');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });