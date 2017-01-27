var stripe = require('stripe')('sk_test_D32Dl92AC6IWj1MydXgEuG75');

module.exports = function(req, res) {
	res.send('POSt request to the home page');
};