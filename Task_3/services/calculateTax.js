/*
 * Provides logic for calculating tax income. 
 * Created: 15/07/22
 * Last modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */


/**
 * Define tax brackets according to Thai taxation law 2022.
 * @param {number} netIncome total income to calculate tax
 * @returns {number} tax to pay 
 */
function taxCalculation(netIncome) {
    if (typeof netIncome !== 'number' || netIncome < 0) {
       throw new Error("Invalid_argument");
    } else if (netIncome <= 150000) {
       return 0;
    } else if (netIncome <= 300000) {
       return (netIncome - 150000) * 0.05;
    } else if (netIncome <= 500000) {
       return ((netIncome - 300000) * 0.1) + 7500;
    } else if (netIncome <= 750000) {
       return ((netIncome - 500000) * 0.15) + 27500;
    } else if (netIncome <= 1000000) {
       return ((netIncome - 750000) * 0.2) + 65000;
    } else if (netIncome <= 2000000) {
       return ((netIncome - 1000000) * 0.25) + 115000;
    } else if (netIncome <= 5000000) {
       return ((netIncome - 2000000) * 0.3) + 365000;
    } else {
       return ((netIncome - 5000000) * 0.35) + 1265000;
    }
  }

  module.exports = {taxCalculation};