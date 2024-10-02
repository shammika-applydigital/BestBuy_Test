const BasePage = require('./basePage');
const ObjectRepoUtil = require('../utils/object-repo-util');
const { expect } = require('@playwright/test');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.repo = new ObjectRepoUtil('productPage');

    // Initialize locators
    this.productTitle = page.locator(this.repo.getLocator(page, 'productTitle'));
    this.priceButton = this.repo.getLocator(page, 'priceButton');
    this.priceFilterOption = this.repo.getLocator(page, 'priceFilterOption');
    this.productSpecificNameLocator = (productSpecificName) => page.locator(`text=${productSpecificName}`);
    this.addToCartButton = this.repo.getLocator(page, 'addToCartButton');
    this.cartErrorMessage = page.getByTestId('header').getByRole('heading');
    this.cartItemTitle = this.repo.getLocator(page, 'cartItemTitle');
    this.removeButton = this.repo.getLocator(page, 'removeButton');
  }

  async selectProduct(productName, productSpecificName, price) {
    try {
      // Wait for the product title to be visible and check its content
      await this.page.waitForSelector('h1', { timeout: 60000 });
      await expect(this.productTitle).toContainText(productName);

      // Wait for the price button to be visible and click it
      await this.priceButton.click();

      // Check the price filter option and select it
      await this.priceFilterOption.check();

      // Wait for the specific product to be visible and click it
      await this.productSpecificNameLocator(productSpecificName).click();

      // Wait for the product title to be visible and check its content again
      await this.page.waitForSelector('h1', { timeout: 100000 });
      await expect(this.productTitle).toContainText(productSpecificName);
      await expect(this.page.locator('#root')).toContainText(price);
    } catch (error) {
      console.error(`Error in selecting product: ${error.message}`);
      throw error;
    }
  }

  async addToCart(quantity) {
    try {
      // Wait for the add to cart button to be visible and click it
      await this.page.waitForSelector(this.addToCartButton);
      await this.page.click(this.addToCartButton);
      // Ensure that the error message is not displayed
      await expect(this.cartErrorMessage).not.toContainText('Sorry, there was a problem adding this item to your cart.');
    } catch (error) {
      console.error(`Error in adding to cart: ${error.message}`);
      throw error;
    }
  }

  async validateCart(productName) {
    try {
      const cartItem = await this.page.textContent(this.cartItemTitle);
      return cartItem.includes(productName);
    } catch (error) {
      console.error(`Error in validating cart: ${error.message}`);
      throw error;
    }
  }

  async removeFromCart() {
    try {
      await this.page.click(this.removeButton);
    } catch (error) {
      console.error(`Error in removing from cart: ${error.message}`);
      throw error;
    }
  }
}

module.exports = ProductPage;
