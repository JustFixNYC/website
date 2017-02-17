var stripe = require('stripe')('sk_test_D32Dl92AC6IWj1MydXgEuG75');

module.exports = function(req, res) {
	var token = req.body.data.id;
	var amt = req.body.amt;

	var charge = stripe.charges.create({
	  amount: amt,
	  currency: "usd",
	  description: "Example charge",
	  source: token,
	}, function(err, charge) {
		if(err){
		  res.status(500).send(err);	
		} else {
			res.status(200).send(charge);
		}
	});
};