const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const networkErrors = [];
  const consoleErrors = [];
  const apiResponses = [];
  
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/api/')) {
      const status = response.status();
      const body = await response.text().catch(() => 'FAILED_TO_READ');
      apiResponses.push({ url, status, bodyLength: body.length, bodyPreview: body.slice(0, 100) });
    }
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('requestfailed', req => {
    networkErrors.push(`${req.url()} — ${req.failure()?.errorText}`);
  });
  
  console.log('Navigating to /shop...');
  await page.goto('http://localhost:3016/shop', { waitUntil: 'domcontentloaded', timeout: 20000 });
  
  // Wait for network to be idle, but with a timeout
  try {
    await page.waitForTimeout(5000);
  } catch(e) {}
  
  console.log(`\nAPI responses captured: ${apiResponses.length}`);
  for (const r of apiResponses) {
    console.log(`  ${r.status} ${r.url} (len=${r.bodyLength}): ${r.bodyPreview}`);
  }
  
  console.log(`\nNetwork failures: ${networkErrors.length}`);
  networkErrors.forEach(e => console.log(`  ${e}`));
  
  console.log(`\nConsole errors: ${consoleErrors.length}`);
  consoleErrors.slice(0, 5).forEach(e => console.log(`  ${e.slice(0, 200)}`));
  
  const bodyText = await page.locator('body').innerText().catch(() => 'FAILED');
  console.log(`\nPage text: ${bodyText.slice(0, 300)}`);
  
  await page.screenshot({ path: 'screenshot_api_debug.png', fullPage: true });
  console.log('\nScreenshot: screenshot_api_debug.png');
  
  await browser.close();
})();
