const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const requests = [];
  page.on('request', req => {
    requests.push({ method: req.method(), url: req.url(), type: req.resourceType() });
  });
  page.on('response', res => {
    if (res.url().includes('api') || res.url().includes('render')) {
      console.log(`  ${res.request().method()} ${res.url()} -> ${res.status()}`);
    }
  });
  
  console.log('=== Network Debug: Shop Page ===\n');
  
  await page.goto('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(5000);
  
  console.log('\nAll API/Render requests:');
  requests.filter(r => r.url.includes('api') || r.url.includes('render') || r.url.includes('8018'))
    .forEach(r => console.log(`  ${r.method} ${r.url}`));
  
  console.log(`\nTotal requests: ${requests.length}`);
  
  // What does the page show?
  const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
  console.log(`\nBody: "${bodyHTML}"`);
  
  await browser.close();
})().catch(e => { console.error('Error:', e.message); process.exit(1); });