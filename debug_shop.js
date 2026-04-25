const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleMessages.push(`[ERROR] ${msg.text()}`);
    }
  });
  
  // Capture network failures
  const networkFails = [];
  page.on('requestfailed', request => {
    networkFails.push(`${request.url()} - ${request.failure().errorText}`);
  });
  
  console.log('=== Deep Debug: Shop Page ===\n');
  
  // Go to home first
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 15000 });
  console.log('Home page loaded');
  
  // Now go to shop
  await page.goto('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000);
  
  // Get full HTML
  const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 1000));
  console.log('\nBody HTML (first 1000 chars):');
  console.log(bodyHTML);
  
  // Check network requests made
  console.log('\n--- Network Failures ---');
  if (networkFails.length === 0) {
    console.log('No network failures');
  } else {
    networkFails.forEach(f => console.log(f));
  }
  
  console.log('\n--- Console Errors ---');
  if (consoleMessages.length === 0) {
    console.log('No console errors');
  } else {
    consoleMessages.forEach(m => console.log(m));
  }
  
  // Try making API call directly from page context
  console.log('\n--- API Test from Page Context ---');
  const apiResult = await page.evaluate(async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      return { status: res.status, count: Array.isArray(data) ? data.length : 'not array', sample: data[0]?.name || 'no name' };
    } catch(e) {
      return { error: e.message };
    }
  });
  console.log('API Result:', JSON.stringify(apiResult));
  
  await browser.close();
})().catch(e => { console.error('Error:', e.message); process.exit(1); });