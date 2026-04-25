const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  
  console.log('Navigating to http://localhost:3016...');
  const response = await page.goto('http://localhost:3016', { waitUntil: 'networkidle', timeout: 20000 });
  
  console.log(`HTTP status: ${response.status()}`);
  
  // Wait a bit more for React to hydrate
  await page.waitForTimeout(3000);
  
  const buttons = await page.locator('button').count();
  const inputs = await page.locator('input').count();
  const links = await page.locator('a').count();
  const divs = await page.locator('div').count();
  
  console.log(`\nAfter 3s wait:`);
  console.log(`  Buttons: ${buttons}`);
  console.log(`  Inputs: ${inputs}`);
  console.log(`  Links: ${links}`);
  console.log(`  Divs: ${divs}`);
  
  // Get page title
  const title = await page.title();
  console.log(`  Title: ${title}`);
  
  // Get body text
  const bodyText = await page.locator('body').innerText();
  console.log(`  Body text (first 300): ${bodyText.slice(0, 300)}`);
  
  console.log(`\nConsole errors: ${errors.length}`);
  errors.forEach(e => console.log(`  ERROR: ${e.slice(0, 200)}`));
  
  await page.screenshot({ path: 'screenshot_debug.png', fullPage: true });
  console.log('\nScreenshot: screenshot_debug.png');
  
  await browser.close();
})();
