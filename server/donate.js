var stripe_dk = process.env.STRIPE_DK || 'sk_test_D32Dl92AC6IWj1MydXgEuG75';

var stripe = require('stripe')(stripe_dk);

module.exports = function(req, res) {

	// check data
	if(req.body.data) {
		var token = req.body.data.id;	
	}

	// no email sent
	if(!req.body.email) { 
		return res.status(403).send('Incorrect Email');
	}

	var amt = req.body.amt;
	var unsubscribe = req.body.unsubscription;
	var plan;


	var subscribeCustomer = function(customer, id){
		stripe.subscriptions.create({
		  customer: customer.id,
		  plan: id
		}, function(err, subscription) {
			if(err){
				return res.status(500).send(err);	
			} else {
				return res.status(200).send(subscription);
			}
		});
	};

	var createCustomer = function(callback, plan) {
		// Create customer
		stripe.customers.create({
			email: req.body.email,
			source: token,
			description: req.body.name
		}, function(err, customer) {
			if(err) {
				return res.status(500).send(err);
			} else {
				if(plan) {
					subscribeCustomer(customer, plan);
				} else {
					return callback(customer);	
				}
			}
		});
	};

	var charge = function(customer) {

		stripe.charges.create({
			amount: amt,
			currency: "usd",
			description: "Example charge",
			source: req.body.data.card.id,
			customer: customer.id,
		}, function(err, charge) {
			if(err){
				return res.status(500).send(err);	
			} else {
				return res.status(200).send(charge);
			}
		});

	};

	if(req.body.subscription !== undefined && req.body.subscription !== 'undefined' && req.body.subscription != false) {

		var createPlan = function(callback) {
			stripe.plans.create({
				name: 'Monthly',
				id: amt,
				interval: 'month',
				currency: 'usd',
				amount: amt,
			}, function(err, plan) {
				if(err) {
					return res.status(500).send(err);
				} else {
					plan = plan.id;
					// asynchronously called
					// Create customer
					createCustomer(subscribeCustomer, plan.id);	
				}

			});
		};


		stripe.plans.retrieve(
		  amt,
		  function(err, plan) {
		    // asynchronously called
		    if(err) {
		    	return createPlan(createCustomer);
		    } else {
		    	return createCustomer(subscribeCustomer, plan.id);
		    }
		  }
		);

	// charge user
	} else {

		createCustomer(charge);

	}
};