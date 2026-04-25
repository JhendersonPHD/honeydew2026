const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  const logs = [];
  
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => errors.push(err.message));
  page.on('crash', () => console.log('PAGE CRASHED!'));
  
  console.log('Loading shop page...\n');
  
  try {
    const response = await page.goto('http://localhost:3016/shop', { 
      waitUntil: 'load',
      timeout: 20000 
    });
    console.log(`HTTP Status: ${response.status()}`);
    
    // Wait for any JS to execute
    await page.waitForTimeout(8000);
    
    // Check if React loaded
    const reactLoaded = await page.evaluate(() => {
      return typeof window.React !== 'undefined' || 
             document.querySelectorAll('div').length > 5 ||
             document.getElementById('root')?.children?.length > 0;
    });
    console.log(`React appears loaded: ${reactLoaded}`);
    
    // Check root element
    const rootInfo = await page.evaluate(() => {
      const root = document.getElementById('root');
      return {
        hasChildren: root?.children?.length > 0,
        childCount: root?.children?.length || 0,
        innerHTML: root?.innerHTML?.substring(0, 200) || 'empty'
      };
    });
    console.log(`Root element:`, rootInfo);
    
  } catch (e) {
    console.log(`Navigation error: ${e.message}`);
  }
  
  console.log(`\nPage errors (${errors.length}):`);
  errors.forEach(e => console.log(`  ${e}`));
  
  console.log(`\nConsole logs (${logs.length}):`);
  logs.slice(0, 20).forEach(l => console.log(`  ${l}`));
  
  await browser.close();
})().catch(e => { console.error('Fatal Error:', e.message); process.exit(1); });