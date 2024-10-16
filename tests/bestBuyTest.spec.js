const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/homePage');
const ProductPage = require('../page-objects/productPage');
const DataDrivenUtil = require('../utils/data-driven-util');
const { BASE_URL } = require('../utils/envUtil');

let testData;
let homePage;
let productPage;

test.describe('BestBuy Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    homePage = new HomePage(page);
    productPage = new ProductPage(page);

    // Load test data (use the same data row across all tests)
    testData = await DataDrivenUtil.getTestData(process.env.ENV);


    // Navigate to base URL and close any popups
    await homePage.navigate();

    try {
      await page.getByLabel('Close').click();
    } catch (error) {
      console.warn('No close button found, skipping:', error.message);
    }
  });

  test('Select First Available Product of the Refrigerators category and Add to Cart', async ({ page }) => {
    try {
    const category = 'Appliances';
    const subCategory = 'Major Appliances';
    const productType = 'Refrigerators';

    await homePage.selectFirstAvailableProduct(category, subCategory, productType);
    await productPage.selectProduct();
    await productPage.addToCart();

  } catch (error) {
    console.error('Error in test - Navigate, Select a Product Category, and Choose a Product:', error);
    throw error;
  }
  });



  test.skip('Navigate, Select a Product Category, and Choose a Product', async ({ page }) => {
    try {
      const data = testData[0];
      console.log("Using test data:", data);

      // Step 1: Navigate through categories and select a product
      await homePage.selectCategory(data.productCategory, data.subCategory, data.productName);

      // Step 2: Choose a product and add to cart
      await productPage.selectProduct(data.productName, data.productSpecificName, data.price);
      await productPage.addToCart(parseInt(data.quantity, 10));

    } catch (error) {
      console.error('Error in test - Navigate, Select a Product Category, and Choose a Product:', error);
      throw error;
    }
  });

});




// Log into Best Buy

// await page.getByRole('link', { name: 'Account', exact: true }).hover();
// await page.waitForTimeout(randomDelay(1000, 3000)); // Random delay before clicking
// await page.getByRole('link', { name: 'Account', exact: true }).press('Enter');

// await page.getByLabel('Email Address').click();
// await page.getByLabel('Email Address').fill('ddshammi@yahoo.com');
// await page.waitForTimeout(randomDelay(500, 1500)); // Random delay
// await page.getByLabel('Password').click();
// await page.getByLabel('Password').fill('1qaz2WSX@');
// await page.waitForTimeout(randomDelay(500, 1500)); // Random delay
// await page.getByRole('button', { name: 'Sign In' }).press('Enter');


