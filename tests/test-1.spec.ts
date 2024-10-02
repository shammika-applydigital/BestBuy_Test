import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://www.bestbuy.ca/en-ca');
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: 'Shop' }).click();
  await page.getByRole('link', { name: 'Appliances' }).click();
  await page.getByRole('link', { name: 'Major Appliances' }).click();
  await page.getByRole('link', { name: 'Refrigerators' }).click();
  await expect(page.locator('h1')).toContainText('Refrigerators');
  //ßawait expect(page.getByTestId('category-page-container').locator('img').first()).toBeVisible();
  await expect(page.locator('h1')).toContainText('Refrigerators');
  await page.getByRole('button', { name: 'Price' }).click();
  await page.getByLabel('$250 - $499.99, 18 results').check();
  await page.getByRole('link', { name: 'Galanz Retro 24" 10 Cu. Ft. Freestanding Top Freezer Refrigerator (GLR10TBKEFR' }).click();
  await expect(page.getByRole('button', { name: 'Galanz Retro 24" 10 Cu. Ft.' })).toBeVisible();
  await expect(page.locator('h1')).toContainText('Galanz Retro 24" 10 Cu. Ft. Freestanding Top Freezer Refrigerator (GLR10TBKEFR) - Vinyl Black');
  await expect(page.locator('#root')).toContainText('$499.99');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
});