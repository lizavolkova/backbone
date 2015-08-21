/**
 * @author Liza Volkova
 * @version 1.0
 */


//table of products
//a table that affects the prices (coupon code in the cart)
//can still edit quantity of product

/**
 * @class 
 */
function ClassName () {
	/**
	 * @return 5
	 */
	function Method () {
		return 5;
	}
}

(function (app) {
	app.models = app.models || {};
	app.collections = app.collections || {};
	app.views = app.views || {};

	/************************
	// SINGLE PRODUCT
	************************/
	/** 
	 * @exports app.views.Product
	 **/
	app.models.Product = Backbone.Model.extend({	
		defaults: {
			id: '',
			img: 'https://placehold.it/100x100',
			name: 'Name',
			price: '0.00',
			description: 'Description',
			category: 'Category',
			promotion: 'Promotion'
		}
	});

	/**
	 * Render something
	 * @exports app.views.ProductView
	 */
	app.views.ProductView = Backbone.View.extend({
		/**
		 * Something
		 */
		className: 'large-4 small-6 columns',

		/**
		 * Undescore Template
		 */
		template: $("#productTemplate").html(),

		/**
		 * Initialize
	 	 */
		initialize: function() {
			this.model.on('change', this.render, this);
		},

		/**
	 	 * Render  
	 	 */
		render: function() {
			var html = _.template(this.template);
			this.$el.html(html(this.model.toJSON()));
			return this;
		}
	});

	/**************************************************
	//DEFINE & RENDER COLLECTION (CATEGORY) OF PRODUCTS
	***************************************************/
	/**
	 * Define collection of products
	 * @construct
	 * @augments Backbone.Collection
	 */
	app.collections.ProductCollection = Backbone.Collection.extend({
		model: app.models.Product,

		/**
	 	 * @method initialize  
	 	 * @constructor
	 	 * @contructs app.collections.ProductCollection object
	 	 */
		initialize: function(options) {
			this.cat = options.category;
		},

		/**
	     * Specify the URL to fetch data from
	     * @returns {string}
	     */
		url: function() {
			var link = this.cat.substring(0,4); //only needed to work with existing API
			var url = 'http://bterra.net/api/category/'+link;
			return url;
		}
	});


	/**
	 * Render collection of products
	 * @class app.views.ProductCollectionView
	 * @augments Backbone.View
	 */
	app.views.ProductCollectionView = Backbone.View.extend({
		/**
	 	 * @method initialize  
	 	 * @constructor
	 	 * @contructs app.views.ProductCollectionView object
	 	 */
		initialize: function(options) {
			this.eventAgg = options.eventAgg;
			this.collection = new app.collections.ProductCollection(options);
			this.collection.on('reset', this.render, this);
			this.collection.on('change', this.render, this);
			this.state_loading(true);
			this.render();
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
	 	 * @returns {string}
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
			return this;
		},

		/**
		 * Preloader animation
	 	 * @method stae_loading  
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
	 	 * @param {Object} the model of the product to render
	 	 */
		renderProduct: function(item) {
			var productView = new app.views.ProductView({model: item});
			this.$el.append(productView.render().el);
		},

		/**
	 	 * @method openModal  
	 	 * @param {Object} the event object
	 	 */
		openModal: function(e) {
			var id = $(e.currentTarget).data("id");
			currentProduct = this.collection.get(id);
			var modal = new app.views.Modal({model: currentProduct});
		},

		/**
	 	 * @method addToBag  
	 	 * @param {Object} the event object
	 	 */
		addToBag: function(e) {
			e.preventDefault();
			var id 		= $(e.currentTarget).data("id");
			var product = new app.model.Product({
				img: 'https://placehold.it/100x100',
				name: 'New Name',
				price: '15.00',
				description: 'Description',
				category: 'Category',
				promotion: 'Promotion'
			});
			// currentProduct = this.collection.get(id);
			this.eventAgg.trigger('addToBag', product);//currentProduct);
			//take current model, and send it over to cart view collection for storage
		}

	});

	/**************************************************
	//MODAL
	***************************************************/
	app.views.Modal = Backbone.View.extend(/** @lends app.views.Modal.prototype */{
		/**
		 * @property el
		 * @type {String}
		 * @default "#product-modal"
		 */
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
	 	 * @constructor
	 	 * @contructs app.views.Modal object
	 	 */
		initialize: function() {
			this.render();
		},

		/**
	 	 * @method render  
	 	 */
		render: function() {
			var html = _.template(this.template);
			this.$el.html(html(this.model.toJSON()));
			this.$el.css({'top': $(document).scrollTop()});
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