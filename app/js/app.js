(function (app) {
	app.models = app.models || {};
	app.collections = app.collections || {};
	app.views = app.views || {};

	// TODO: Add closure - add scope and packages. Divide files into mininful sections. Add JSDOC comments. Be consistent

	/*************************

	// CREATE ROUTES
	*************************/				
	//View dispatcher; will also control animations
	//$.when()

	app.Router = Backbone.Router.extend({
		routes: {
			'' : 'index',
			'category/:cat' : 'category',
			'account' : 'account',
			'cart' : 'cart'
		},

		/**
	 	 * @method initialize  
	 	 */
		initialize: function() {
			
		},

		index: function(){
			console.log('I am on index route!');

		},

		category: function(cat) {
			this.products = new app.views.ProductCollectionView({category: cat, eventAgg: eventAgg});
		},

		account: function() {
			console.log('account view');
			var user = new app.models.User({id: '44'});
			//user.save();
			user.fetch();
			var userView = new app.views.UserView({model: user});
			// user.destroy();
		},

		// destroy: function() {
		// 	this.remove();
		// 	this.unbind();
		// }

		cart: function() {
			// var cartView = new app.views.CartCollectionView()
		}


	});
	
	var eventAgg = _.extend({}, Backbone.Events);

	// app.views.AddToBagEvent = Backbone.View.extend({
	// 	initialize: function(options) {
			
	// 	},

		
	// });
	var addToBagEvent = new app.views.CartCollectionView({eventAgg: eventAgg});

	app.router = new app.Router();
	Backbone.history.start();

}(window.app = window.app || {}));