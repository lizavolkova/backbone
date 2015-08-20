(function (app) {
	app.models = app.models || {};
	app.collections = app.collections || {};
	app.views = app.views || {};

	app.collections.CartCollection = Backbone.Collection.extend({
		model: app.models.Product,

		initialize: function(options) {
			
			// this.render();
		}

		
	});

	app.views.CartCollectionView = Backbone.View.extend({
		el: '#cartCount',
		 template: _.template("count <%= number %>"),
		/**
	 	 * @method initialize  
	 	 */
		initialize: function(options) {
			this.collection = new app.collections.CartCollection(options);
			_.bindAll(this, 'addToBag');
			options.eventAgg.bind('addToBag', this.addToBag, this);
			this.collection.on('add', this.render, this);
			this.render();
		},

		addToBag: function(product) {
			this.collection.add(product);
		},

		render: function() {
			this.$el.html(this.template({number: this.collection.length}));
		}	

		
	});

}(window.app = window.app || {}));