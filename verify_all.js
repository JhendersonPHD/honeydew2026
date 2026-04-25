const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', err => errors.push(`[pageerror] ${err.message}`));
  
  console.log('=== HOME PAGE ===');
  await page.goto('http://localhost:3016', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(2000);
  console.log(`Buttons: ${await page.locator('button').count()}`);
  console.log(`Inputs: ${await page.locator('input').count()}`);
  console.log(`Links: ${await page.locator('a').count()}`);
  console.log(`Divs: ${await page.locator('div').count()}`);
  const homeText = await page.locator('body').innerText();
  console.log(`Text (200): ${homeText.slice(0, 200)}`);
  
  console.log('\n=== SHOP PAGE ===');
  await page.goto('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(3000);
  console.log(`Buttons: ${await page.locator('button').count()}`);
  console.log(`Inputs: ${await page.locator('input').count()}`);
  console.log(`Links: ${await page.locator('a').count()}`);
  console.log(`Divs: ${await page.locator('div').count()}`);
  const shopText = await page.locator('body').innerText();
  console.log(`Text (300): ${shopText.slice(0, 300)}`);
  
  console.log('\n=== CONSOLE ERRORS ===');
  console.log(`Total: ${errors.length}`);
  errors.slice(0, 10).forEach(e => console.log(`  ${e.slice(0, 200)}`));
  
  await page.screenshot({ path: 'screenshot_final_debug.png', fullPage: true });
  console.log('\nScreenshot: screenshot_final_debug.png');
  
  await browser.close();
})();
