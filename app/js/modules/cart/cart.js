(function (app) {
	app.models = app.models || {};
	app.collections = app.collections || {};
	app.views = app.views || {};

	app.collections.CartCollection = Backbone.Collection.extend({
		model: app.models.Product		
	});

	app.views.CartProductView = Backbone.View.extend({
		template: $("#cartProduct").html(),

		initialize: function() {
			this.model.on('change', this.render, this);
		},

		render: function() {
			var html = _.template(this.template);
			this.$el.html(html(this.model.toJSON()));
			return this;
		}
	});


	app.views.CartCollectionView = Backbone.View.extend({
		el: '#cartTemplate',
		
		initialize: function(options) {

			// this.collection = new app.collections.ProductCollection(options);
			this.collection = options.collection;
			console.log(this.collection);
		},

		addToBag: function(product) {
			// this.collection.add(product);
		},

		render: function() {
			// console.log(this.collection);
			// var html = '';
			var self = this;
			console.log(this.collection.models.length);
			_.each(this.collection.models, function (item) {
				self.renderProduct(item);
			});
			// console.log(html)
			return this;
		},

		renderProduct: function(item) {
			var productView = new app.views.CartProductView({model: item}); 
			this.$el.append(productView.render().el);
		}	
	});




	app.views.MiniCartView = Backbone.View.extend({
		el: '#cartCount',
		template: _.template("count <%= number %>"),

		initialize: function(options) {
			_.bindAll(this, 'addToBag');
			options.eventAgg.bind('addToBag', this.addToBag, this);
			this.collection.on('add', this.render, this);
			this.render();
		},

		addToBag: function(product) {
			this.collection.add(product); //deal with quantity
		},

		render: function() {
			this.$el.html(this.template({number: this.collection.length}));
		}//,

		/*getCollection: function() {
			return this.collection;
		}*/	
	});

}(window.app = window.app || {}));