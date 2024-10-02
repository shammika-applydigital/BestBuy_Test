const BasePage = require('./basePage');
const ObjectRepoUtil = require('../utils/object-repo-util');
const { expect } = require('@playwright/test');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.repo = new ObjectRepoUtil('homepage');

    this.bestBuyLogo = page.getByLabel('Best Buy', { exact: true });
    this.shopButton = page.getByRole('button', { name: 'Shop' });
    this.shopByCategoryTitle = page.getByRole('heading', { name: 'Shop by Category' });
  }

  async selectCategory(category, subCategory, productName) {
    try {
      await this.isBestBuyLogoVisible();
      await this.isShopButtonEnabled();
      await this.clickShopButton();
      await this.isShopByCategoryTitleVisible();
      await this.isMainCategoryTitleVisible(category);
      await this.clickMainCategorySelected(category);
      await this.isSubCategoryTitleVisible(subCategory);
      await this.clickSubCategorySelected(subCategory);
      await this.isProductNameTitleVisible(productName);
      await this.clickProductNameSelected(productName);
    } catch (error) {
      console.error(`Error in selecting category: ${category}, subCategory: ${subCategory}, product: ${productName}`, error);
      throw error;
    }
  }

  async isBestBuyLogoVisible() {
    await expect(this.bestBuyLogo).toBeVisible({ timeout: 10000 });
  }

  async isShopButtonEnabled() {
    await expect(this.shopButton).toBeEnabled({ timeout: 10000 });
  }

  async clickShopButton() {
    await this.shopButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.shopButton.click();
  }

  async isShopByCategoryTitleVisible() {
    await expect(this.shopByCategoryTitle).toBeVisible({ timeout: 10000 });
  }

  async isMainCategoryTitleVisible(category) {
    const mainCategory = this.page.getByRole('link', { name: category, exact: true });
    await expect(mainCategory).toBeVisible({ timeout: 10000 });
  }

  async clickMainCategorySelected(category) {
    const mainCategory = this.page.getByRole('link', { name: category, exact: true });
    await mainCategory.waitFor({ state: 'visible', timeout: 10000 });
    await mainCategory.click();
  }

  async isSubCategoryTitleVisible(subCategory) {
    const subCategoryElement = this.page.getByRole('link', { name: subCategory, exact: true });
    await expect(subCategoryElement).toBeVisible({ timeout: 10000 });
  }

  async clickSubCategorySelected(subCategory) {
    const subCategoryElement = this.page.getByRole('link', { name: subCategory, exact: true });
    await subCategoryElement.waitFor({ state: 'visible', timeout: 10000 });
    await subCategoryElement.click();
  }

  async isProductNameTitleVisible(productName) {
    const product = this.page.getByRole('link', { name: productName, exact: true });
    await expect(product).toBeVisible({ timeout: 10000 });
  }

  async clickProductNameSelected(productName) {
    const product = this.page.getByRole('link', { name: productName, exact: true });
    await product.waitFor({ state: 'visible', timeout: 10000 });
    await product.click();
  }
}

module.exports = HomePage;



// await this.page.getByRole('button', { name: 'Shop' }).click();
// await this.page.getByRole('link', { name: category }).click();
// await this.page.getByRole('link', { name: subCategory }).click();
// await this.page.getByRole('link', { name: productName }).click();