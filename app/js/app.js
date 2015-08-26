(function (app) {
	app.models = app.models || {};
	app.collections = app.collections || {};
	app.views = app.views || {};

	// TODO: Add closure - add scope and packages. Divide files into mininful sections. Add JSDOC comments. Be consistent
	var user = new app.models.User({id: '43'});
	//user.save();
	user.fetch();
	
	var eventAgg = _.extend({}, Backbone.Events);
	


	var RenderHTML = Backbone.View.extend({
		el: '#main',

		initialize: function() {
			console.log('save html initialized');
			this.collection = new app.collections.CartCollection();
			this.collection.add({
				id: '123',
				img: 'https://placehold.it/100x100',
				name: 'Test Product Name',
				price: '15.00',
				description: 'Test pruduct description',
				category: 'Fragrance',
				promotion: '',
				qty: '1'
			});
			this.collection.add({
				id: '456',
				img: 'https://placehold.it/100x100',
				name: 'Test Product Name',
				price: '20.00',
				description: 'Test pruduct description',
				category: 'Fragrance',
				promotion: '',
				qty: '1'
			});
			this.userView = new app.views.UserView({model: user});
			this.miniCart = new app.views.MiniCartView({
				collection: this.collection,
				eventAgg: eventAgg
			});
		},

		getIndex: function() {
			var html = '<strong>This is the html for index route</html>';
			this.$el.html(html);
		},

		getAccount: function() {
			this.$el.html(this.userView.render().el);
		},

		getCategory: function(cat) {
			this.products = new app.views.ProductCollectionView({category: cat, eventAgg: eventAgg});
			this.$el.html(this.products.render().el);
		},

		getCart: function() {
			// var cartProducts = this.miniCart.getCollection();
			this.cartView = new app.views.CartCollectionView({
				collection: this.collection, //cartProducts, 
				eventAgg: eventAgg
			});
			this.$el.html(this.cartView.render().el);
		}

	});
	var renderHTML = new RenderHTML();


	

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

		execute: function(callback, args, name) {
			if (callback) callback.apply(this, args);
		},

		index: function(){
			renderHTML.getIndex();
		},

		category: function(cat) {
			renderHTML.getCategory(cat);		
		},

		account: function() {
			renderHTML.getAccount();
		},

		cart: function() {
			renderHTML.getCart();
		}


	});
	
	

	// app.views.AddToBagEvent = Backbone.View.extend({
	// 	initialize: function(options) {
			
	// 	},

		
	// });
	

	app.router = new app.Router();
	Backbone.history.start();

	

	

}(window.app = window.app || {}));