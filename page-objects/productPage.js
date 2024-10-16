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
    this.firstProductLink = page.locator(
      '.productsRow_DcaXn.style-module_row__Q0c-x a'
    ).first();
  }

  async selectProduct(productName, productSpecificName, price) {
    try {

      // Wait for the price button to be visible and click it
      await this.priceButton.click();

      // Check the price filter option and select it
      await this.priceFilterOption.check();

      // Wait for the specific product to be visible and click it
      await this.firstProductLink.click();

    } catch (error) {
      console.error(`Error in selecting product: ${error.message}`);
      throw error;
    }
  }

    // Method: Select the first item
    async selectFirstItem() {
      await this.firstProductLink.waitFor();
      await this.firstProductLink.click();
    }


  async addToCart() {
    try {
      await this.page.waitForSelector(this.addToCartButton);
      await this.page.click(this.addToCartButton);
      await expect(this.cartErrorMessage).not.toContainText('Sorry, there was a problem adding this item to your cart.');
    } catch (error) {
      console.error(`Error in adding to cart: ${error.message}`);
      throw error;
    }
  }

  async validateCart(productName) {
    try {
      const cartItemTitle = await this.page.locator('div.cart-item-title').textContent();
      return cartItemTitle.includes(productName);
    } catch (error) {
      console.error('Error validating cart:', error);
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
