const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture console messages
  const logs = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[PAGE ERROR] ${err.message}`));
  
  console.log('=== Debug Shop Page Load ===\n');
  
  // Go to shop
  await page.goto('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(5000);
  
  // Check env
  const apiUrl = await page.evaluate(() => {
    return {
      VITE_API_URL: import.meta.env.VITE_API_URL,
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD
    };
  });
  console.log('Environment:', JSON.stringify(apiUrl, null, 2));
  
  // Check for API calls
  const apiCalls = [];
  page.on('request', req => {
    if (req.url().includes('api') || req.url().includes('render')) {
      apiCalls.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText || 'OK'}`);
    }
  });
  
  // Reload and capture
  await page.reload({ waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000);
  
  console.log('\nAPI-related requests:');
  apiCalls.forEach(c => console.log(`  ${c}`));
  
  console.log('\nConsole logs:');
  logs.forEach(l => console.log(`  ${l}`));
  
  // Check what root contains
  const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 500));
  console.log(`\nRoot HTML: "${rootHTML}"`);
  
  await browser.close();
})().catch(e => { console.error('Error:', e.message); process.exit(1); });