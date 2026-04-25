const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('=== Home Page Link Analysis ===\n');
  
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Get all links with href
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      href: a.href,
      text: a.textContent?.trim().substring(0, 50),
      class: a.className
    }));
  });
  
  console.log('Links found:');
  links.forEach(l => console.log(`  "${l.text}" -> ${l.href}`));
  
  // Check the rendered content
  const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 1000));
  console.log('\n--- Root HTML ---');
  console.log(rootHTML);
  
  await browser.close();
})().catch(e => { console.error('Error:', e.message); process.exit(1); });