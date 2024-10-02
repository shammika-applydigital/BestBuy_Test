const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class DataDrivenUtil {
  static getTestData(fileName) {
    // Determine the environment, defaulting to 'development' if not specified
    const environment = process.env.NODE_ENV || 'development';
    
    // Use the provided fileName or default to the environment-specific CSV
    const csvFileName = fileName || `testData.${environment}`;
    
    const filePath = path.join(__dirname, `../testData/${csvFileName}.csv`);
    const results = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }


  
}

module.exports = DataDrivenUtil;
