const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Test frontend at localhost:3016
  console.log('Navigating to http://localhost:3016...');
  await page.goto('http://localhost:3016', { waitUntil: 'networkidle', timeout: 15000 });
  
  // Count interactive elements
  const buttons = await page.locator('button').count();
  const inputs = await page.locator('input').count();
  const links = await page.locator('a').count();
  
  console.log(`Page loaded: /`);
  console.log(`  Buttons: ${buttons}`);
  console.log(`  Inputs: ${inputs}`);
  console.log(`  Links: ${links}`);
  
  // Take screenshot
  await page.screenshot({ path: 'screenshot_shop.png', fullPage: false });
  console.log('Screenshot saved: screenshot_shop.png');
  
  // Navigate to /shop
  try {
    await page.goto('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 15000 });
    const shopButtons = await page.locator('button').count();
    const shopInputs = await page.locator('input').count();
    const shopLinks = await page.locator('a').count();
    console.log(`\nPage loaded: /shop`);
    console.log(`  Buttons: ${shopButtons}`);
    console.log(`  Inputs: ${shopInputs}`);
    console.log(`  Links: ${shopLinks}`);
    await page.screenshot({ path: 'screenshot_shop_page.png', fullPage: false });
    console.log('Screenshot saved: screenshot_shop_page.png');
  } catch(e) {
    console.log(`/shop navigation failed: ${e.message}`);
  }
  
  await browser.close();
  console.log('\nVerification complete.');
})();
