(function (app) {
	app.models = app.models || {};
	app.collections = app.collections || {};
	app.views = app.views || {};

	/************************
	// SINGLE PRODUCT
	************************/
	//Define single product
	app.models.Product = Backbone.Model.extend({
		defaults: {
			img: 'https://placehold.it/100x100',
			name: 'Name',
			price: '0.00',
			description: 'Description',
			category: 'Category',
			promotion: 'Promotion'
		},
		// urlRoot: 'http://bterra.net/api/fsc'
	});

	/**
	 * Render single product
	 * @class app.views.ProductView
	 * @constructor
	 */
	app.views.ProductView = Backbone.View.extend({
		/**
		 * @property className
		 * @type {String}
		 * @default "large-4 small-6 columns"
		 */
		className: 'large-4 small-6 columns',

		/**
		 * Undescore Template
		 *
		 * @property template
		 * @type {Object}
		 */
		template: $("#productTemplate").html(),

		/**
	 	 * @method initialize  
	 	 */
		initialize: function() {
			this.model.on('change', this.render, this);
			// this.model.fetch();
		},

		/**
	 	 * @method render  
	 	 */
		render: function() {
			var html = _.template(this.template);
			this.$el.html(html(this.model.toJSON()));
			return this;
		}
	});

	// var product = new Product({id: '03105220' });

	/**************************************************
	//DEFINE & RENDER COLLECTION (CATEGORY) OF PRODUCTS
	***************************************************/
	app.collections.ProductCollection = Backbone.Collection.extend({
		model: app.models.Product,

		/**
	 	 * @method initialize  
	 	 */
		initialize: function(options) {
			this.cat = options.category;
		},

		url: function() {
			var link = this.cat.substring(0,4);
			var url = 'http://bterra.net/api/category/'+link;
			return url;
		}
	});

	app.views.ProductCollectionView = Backbone.View.extend({
		el: '#main',

		/**
	 	 * @method initialize  
	 	 */
		initialize: function(options) {
			this.eventAgg = options.eventAgg;
			this.collection = new app.collections.ProductCollection(options);
			this.collection.on('reset', this.render, this);
			this.collection.on('change', this.render, this);
			this.state_loading(true);
			this.render();
			// this.collection.fetch().done(function(){
			// 	self.render();
			// });
		}, 

		/**
		 * Backbone Events
		 *
		 * @property events
		 * @type {Object}
		 */
		events: {
			'click img' : 'openModal',
			'click .button' : 'addToBag'
		},

		/**
	 	 * @method render  
	 	 */
		render: function() {
			var self = this; 
			this.collection.fetch().done(function(){
				setTimeout(function () {
					self.$el.html(''); //clear products div before adding new category items
					self.state_loading(false);
					_.each(self.collection.models, function (item) {
						self.renderProduct(item);
					}, this);
				}, 0);
			});

			// this.collection.fetch({
			// 	success: function(result) {
					
			// 	}
			// });
			
		},

		/**
	 	 * @method stae_loading (preloader)  
	 	 */
		state_loading: function(value) {
			if(value === true) {
				this.$el.addClass('loading');
			} else {
				this.$el.removeClass('loading');
			}
			
		},

		/**
	 	 * @method renderProduct  
	 	 */
		renderProduct: function(item) {
			var productView = new app.views.ProductView({model: item});
			this.$el.append(productView.render().el);
		},

		/**
	 	 * @method openModal  
	 	 */
		openModal: function(e) {
			var id = $(e.currentTarget).data("id");
			currentProduct = this.collection.get(id);
			console.log(id);
			var modal = new app.views.Modal({model: currentProduct});
		},

		/**
	 	 * @method addToBag  
	 	 */
		addToBag: function(e) {
			e.preventDefault();
			var id = $(e.currentTarget).data("id");
			currentProduct = this.collection.get(id);
			this.eventAgg.trigger('addToBag', currentProduct);
			//take current model, and send it over to cart view collection for storage
		}

	});

	/**************************************************
	//MODAL
	***************************************************/
	app.views.Modal = Backbone.View.extend({
		el: '#product-modal',

		/**
		 * @property className
		 * @type {String}
		 * @default "reveal-modal"
		 */
		className: 'reveal-modal',

		/**
		 * Undescore Template
		 *
		 * @property template
		 * @type {Object}
		 */
		template: $("#modal").html(),

		/**
		 * Backbone Events
		 *
		 * @property events
		 * @type {Object}
		 */
		events: {
			'click a' : 'close',
			'click .overlay' : 'close'
		},

		/**
	 	 * @method initialize  
	 	 */
		initialize: function() {
			this.render();
		},

		/**
	 	 * @method render  
	 	 */
		render: function() {
			var html = _.template(this.template);
			console.log(html(this.model.toJSON()));
			this.$el.html(html(this.model.toJSON()));
			$(document.body).addClass('noScroll');
			this.$el.show();

		},

		/**
	 	 * @method close  
	 	 */
		close: function() {
			this.$el.hide();
			$(document.body).removeClass('noScroll');
		}
	});

}(window.app = window.app || {}));