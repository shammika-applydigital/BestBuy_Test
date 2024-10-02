class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate(url) {
      await this.page.goto(url);
    }
  
    async takeScreenshot(fileName) {
      await this.page.screenshot({ path: `screenshots/${fileName}.png` });
    }
  }
  
  module.exports = BasePage;
  