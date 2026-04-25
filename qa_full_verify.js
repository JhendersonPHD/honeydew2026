const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('=== HoneyDew Full QA Verification 2026-04-25 ===\n');
  
  // 1. Home page - dismiss modal first
  console.log('1. HOME PAGE:');
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Close modal if present
  const closeBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
  const closeBtnCount = await closeBtn.count();
  if (closeBtnCount > 0) {
    console.log('   Modal detected, closing...');
    await closeBtn.click();
    await page.waitForTimeout(1000);
  }
  
  const homeH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const homeButtons = await page.locator('button').count();
  const homeLinks = await page.locator('a').count();
  const homeImgs = await page.locator('img').count();
  console.log(`   H1: "${homeH1}"`);
  console.log(`   Buttons: ${homeButtons}, Links: ${homeLinks}, Images: ${homeImgs}`);
  
  // Click "Browse Products" link
  const browseLink = page.locator('a[href="/shop"]');
  const browseExists = await browseLink.count();
  console.log(`   Browse link (/shop): ${browseExists > 0 ? 'FOUND' : 'NOT FOUND'}`);
  
  // 2. Shop page - via direct navigation
  console.log('\n2. SHOP PAGE (/shop) - Direct Nav:');
  await page.goto('http://localhost:3016/shop', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(5000);
  
  const shopH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const shopButtons = await page.locator('button').count();
  const shopInputs = await page.locator('input').count();
  const shopLinks = await page.locator('a').count();
  const shopImgs = await page.locator('img').count();
  const shopDivs = await page.locator('div').count();
  console.log(`   H1: "${shopH1}"`);
  console.log(`   Buttons: ${shopButtons}, Inputs: ${shopInputs}, Links: ${shopLinks}, Images: ${shopImgs}, Divs: ${shopDivs}`);
  
  // 3. Shop via client-side nav
  console.log('\n3. SHOP PAGE - Via Client-Side Nav:');
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(1000);
  
  // Close modal
  const closeBtn2 = page.locator('button').filter({ has: page.locator('svg') }).first();
  if (await closeBtn2.count() > 0) {
    await closeBtn2.click();
    await page.waitForTimeout(500);
  }
  
  const shopLink2 = page.locator('a[href="/shop"]');
  if (await shopLink2.count() > 0) {
    await shopLink2.click();
    await page.waitForTimeout(3000);
    const shopH1Client = await page.locator('h1').first().textContent().catch(() => 'not found');
    const shopButtonsClient = await page.locator('button').count();
    console.log(`   H1: "${shopH1Client}"`);
    console.log(`   Buttons: ${shopButtonsClient}`);
  } else {
    console.log('   Shop link not found');
  }
  
  // 4. Product detail
  console.log('\n4. PRODUCT DETAIL (/products/organic-tomatoes):');
  await page.goto('http://localhost:3016/products/organic-tomatoes', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000);
  const prodH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const prodButtons = await page.locator('button').count();
  const prodLinks = await page.locator('a').count();
  console.log(`   H1: "${prodH1}"`);
  console.log(`   Buttons: ${prodButtons}, Links: ${prodLinks}`);
  
  // 5. Login page
  console.log('\n5. LOGIN PAGE (/login):');
  await page.goto('http://localhost:3016/login', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  const loginH1 = await page.locator('h1').first().textContent().catch(() => 'not found');
  const loginInputs = await page.locator('input').count();
  const loginButtons = await page.locator('button').count();
  console.log(`   H1: "${loginH1}"`);
  console.log(`   Inputs: ${loginInputs}, Buttons: ${loginButtons}`);
  
  await browser.close();
  console.log('\n=== Verification Complete ===');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });