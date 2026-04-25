const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Testing HoneyDew app...');
  
  // Test /shop page
  await page.goto('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 15000 });
  const buttons = await page.locator('button').count();
  const inputs = await page.locator('input').count();
  const links = await page.locator('a').count();
  const images = await page.locator('img').count();
  console.log(`Shop page - Buttons: ${buttons}, Inputs: ${inputs}, Links: ${links}, Images: ${images}`);
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  await page.screenshot({ path: `/tmp/honeydew_shop_${timestamp}.png` });
  
  // Test home page
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 15000 });
  const homeH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const homeButtons = await page.locator('button').count();
  const homeLinks = await page.locator('a').count();
  console.log(`Home page - H1: "${homeH1}", Buttons: ${homeButtons}, Links: ${homeLinks}`);
  await page.screenshot({ path: `/tmp/honeydew_home_${timestamp}.png` });
  
  await browser.close();
  console.log('Verification complete');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });