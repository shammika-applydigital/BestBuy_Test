const fs = require('fs');
const path = require('path');

class ObjectRepoUtil {
  constructor(pageName) {
    this.pageObjectRepo = this.loadObjectRepository(pageName);
  }

  loadObjectRepository(pageName) {
    const filePath = path.join(__dirname, `../object-repository/${pageName}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Object repository file not found: ${filePath}`);
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8').trim();
      if (!fileContent) {
        throw new Error(`The JSON file is empty: ${filePath}`);
      }
      return JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Error parsing JSON file: ${filePath}. Details: ${error.message}`);
    }
  }

  getLocator(page, locatorName) {
    if (!this.pageObjectRepo[locatorName]) {
      throw new Error(`Locator '${locatorName}' not found in the object repository`);
    }

    const locatorConfig = this.pageObjectRepo[locatorName];

    // Check if the locator is a role-based locator
    if (typeof locatorConfig === 'object' && locatorConfig.type === 'role') {
      return page.getByRole(locatorConfig.role, { name: locatorConfig.name });
    }

    // Check if the locator is a label-based locator
    if (typeof locatorConfig === 'object' && locatorConfig.type === 'label') {
      return page.getByLabel(locatorConfig.label);
    }

    // Return the string for other locators
    return locatorConfig;
  }
}

module.exports = ObjectRepoUtil;
