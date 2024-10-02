// If NODE_ENV is not specified, default to 'development'
const environment = process.env.NODE_ENV || 'development';

// Load the corresponding .env file
require('dotenv').config({ path: `./config/.env.${environment}` });

module.exports = {
  BASE_URL: process.env.BASE_URL,
  ENV: process.env.ENV,
};
