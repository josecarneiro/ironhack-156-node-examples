const chalk = require('chalk');
const utilities = require('./utilities');
// const { sum, multiply } = require('./utilities');
const exponential = require('./exponential');

console.log(chalk.blue('Running node.js script'));

console.log('Doing a sum', utilities.sum(2,5,6));
console.log('Doing a multiplication', utilities.multiply(2,6));

console.log('Doing exponentiation', exponential(2,5));
