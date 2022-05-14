const env = require('dotenv').config();

module.exports = {
       merchant(){ return process.env.MERCHANT_SERVICE_URL; },
       admin(){ return process.env.ADMIN_SERVICE_URL; }, 
       ekyc(){ return process.env.EKYC_SERVICE_URL; },
       loan(){ return process.env.LOAN_SERVICE_URL; } 
}