var stripe_dk = process.env.STRIPE_DK || 'sk_test_D32Dl92AC6IWj1MydXgEuG75';

var stripe = require('stripe')(stripe_dk);

module.exports = function(req, res) {
	var token = req.body.data.id;
	var amt = req.body.amt;

	if(req.body.subscription !== undefined && req.body.subscription !== 'undefined' && req.body.subscription != false) {

		// no email sent
		if(!req.body.email) {
			return res.status(403).send('Incorrect Email');
		}

		/*var plan = stripe.plans.create({
			name: 'Monthly',
			id: 'basic-monthly',
			interval: 'month',
			currency: 'usd',
			amount: amt,
		}, function(err, plan) {
			if(err) {
				return res.status(500).send(err);
			}*/
			// asynchronously called
			// Create customer
			stripe.customers.create({
				email: req.body.email,
			}, function(err, customer) {
				if(err) {
					return res.status(500).send(err);
				}
				// attach customer to plan
				stripe.subscriptions.create({
					customer: customer.id,
					plan: "basic-monthly",
				}, function(err, subscription) {
					// asynchronously called
					if(err) {
						return res.status(403).send(err); 
					} else {
						res.status(200).send(subscription);	
					}
				});
			});
		/*});*/

	} else {

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

	}
};