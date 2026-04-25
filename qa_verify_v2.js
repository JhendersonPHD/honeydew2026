const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--window-size=1920,1080'] });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  console.log('=== HoneyDew QA Verification 2026-04-25 ===\n');
  
  // 1. Home page
  console.log('1. HOME PAGE:');
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Try pressing Escape to close modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  
  // Or click on overlay to dismiss
  const overlay = page.locator('.fixed.inset-0.z-50');
  if (await overlay.count() > 0) {
    await page.click('.fixed.inset-0.z-50', { position: { x: 10, y: 10 } });
    await page.waitForTimeout(500);
  }
  
  const homeH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const homeButtons = await page.locator('button').count();
  const homeLinks = await page.locator('a').count();
  const homeImgs = await page.locator('img').count();
  console.log(`   H1: "${homeH1}"`);
  console.log(`   Buttons: ${homeButtons}, Links: ${homeLinks}, Images: ${homeImgs}`);
  
  // 2. Shop page
  console.log('\n2. SHOP PAGE:');
  await page.goto('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(5000);
  
  const shopH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const shopButtons = await page.locator('button').count();
  const shopInputs = await page.locator('input').count();
  const shopLinks = await page.locator('a').count();
  const shopImgs = await page.locator('img').count();
  console.log(`   H1: "${shopH1}"`);
  console.log(`   Buttons: ${shopButtons}, Inputs: ${shopInputs}, Links: ${shopLinks}, Images: ${shopImgs}`);
  
  // 3. Product detail
  console.log('\n3. PRODUCT DETAIL:');
  await page.goto('http://localhost:3016/products/organic-tomatoes', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000);
  const prodH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const prodButtons = await page.locator('button').count();
  const prodLinks = await page.locator('a').count();
  console.log(`   H1: "${prodH1}"`);
  console.log(`   Buttons: ${prodButtons}, Links: ${prodLinks}`);
  
  // 4. Login page
  console.log('\n4. LOGIN PAGE:');
  await page.goto('http://localhost:3016/login', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  const loginH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const loginInputs = await page.locator('input').count();
  const loginButtons = await page.locator('button').count();
  console.log(`   H1: "${loginH1}"`);
  console.log(`   Inputs: ${loginInputs}, Buttons: ${loginButtons}`);
  
  await browser.close();
  console.log('\n=== Complete ===');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });