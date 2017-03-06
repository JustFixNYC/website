var stripe_dk = process.env.STRIPE_DK || 'sk_test_D32Dl92AC6IWj1MydXgEuG75';

var stripe = require('stripe')(stripe_dk);

module.exports = function(req, res) {

	if(req.body.data) {
		var token = req.body.data.id;	
	}

	var amt = req.body.amt;
	var unsubscribe = req.body.unsubscription;

	if(unsubscribe === true) {
		var reqNumber = 1;

		var getList = function(){
			stripe.customers.list(
				{limit: reqNumber * 100},
				function(err, customers) {
					for (var i = 0; i < customers.data.length; i++) {
						if(customers.data[i].email === req.body.email) {
							return deleteCustomer(customers.data[i].id);
						} else if(customers.has_more !== true && i === customers.data.length - 1) {
							return res.status(404).send('Customer not found!');
						} else if(customers.has_more === true) {
							reqNumber++;
							return getList();
						}
					}
				}
			)
		};

		var deleteCustomer = function(id) {
			
			stripe.customers.del(
				id,
				function(err, confirmation) {
					if(err) {
						return res.status(403).send(err);
					} else {
						return res.status(200).send(confirmation);
					}
				}
			)
		};

		getList();

	} else if(req.body.subscription !== undefined && req.body.subscription !== 'undefined' && req.body.subscription != false) {

		// no email sent
		if(!req.body.email) { 
			return res.status(403).send('Incorrect Email');
		}

		stripe.plans.retrieve(
		  amt,
		  function(err, plan) {
		    // asynchronously called
		    if(err) {
		    	return createPlan();
		    } else {
		    	return createCustomer(plan);
		    }
		  }
		);

		var createPlan = function() {
			stripe.plans.create({
				name: 'Monthly',
				id: amt,
				interval: 'month',
				currency: 'usd',
				amount: amt,
			}, function(err, plan) {
				if(err) {
					return res.status(500).send(err);
				}
				// asynchronously called
				// Create customer
				createCustomer(plan);
			});
		};

		var createCustomer = function(plan) {
			var id = plan.id;

			// Create customer
			stripe.customers.create({
				email: req.body.email,
				source: token,
			}, function(err, customer) {
				if(err) {
					return res.status(500).send(err);
				}
				// attach customer to plan
				stripe.subscriptions.create({
					customer: customer.id,
					plan: amt,
				}, function(err, subscription) {
					if(err) {
						return res.status(403).send(err); 
					} else {
						res.status(200).send(subscription);	
					}
				});
			});
		}

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