/************************
// SINGLE PRODUCT
************************/
//Define single product
var Product = Backbone.Model.extend({
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


//Render single product
var ProductView = Backbone.View.extend({
	className: 'large-4 small-6 columns',
	template: $("#productTemplate").html(),

	initialize: function() {
		this.model.on('change', this.render, this);
		// this.model.fetch();
	},

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
var ProductCollection = Backbone.Collection.extend({
	model: Product,

	initialize: function(options) {
		this.cat = options.category;
	},

	url: function() {
		var link = this.cat.substring(0,4);
		var url = 'http://bterra.net/api/category/'+link;
		return url;
	}
});

var ProductCollectionView = Backbone.View.extend({
	el: '#products',

	initialize: function(options) {
		this.collection = new ProductCollection(options);
		this.collection.on('reset', this.render, this);
		this.collection.on('change', this.render, this);
		this.state_loading(true);
		this.render();
		// this.collection.fetch().done(function(){
		// 	self.render();
		// });
	}, 

	events: {
		'click' : 'openModal'
	},

	render: function() {
		var self = this;
		// TODO: look at promisses 
		this.collection.fetch().done(function(){
			setTimeout(function () {
				self.$el.html(''); //clear products div before adding new category items
				self.state_loading(false);
				_.each(self.collection.models, function (item) {
					self.renderProduct(item);
				}, this);
			}, 4000);
		});

		// this.collection.fetch({
		// 	success: function(result) {
				
		// 	}
		// });
		
	},

	state_loading: function(value) {
		if(value === true) {
			this.$el.addClass('loading');
		} else {
			this.$el.removeClass('loading');
		}
		
	},

	renderProduct: function(item) {
		var productView = new ProductView({model: item});
		this.$el.append(productView.render().el);
	},

	openModal: function() {
		var modal = new Modal();
	}


});

/**************************************************
//MODAL
***************************************************/
var Modal = Backbone.View.extend({
	template: _.template("<div class='modal'>Hello <%= who %></div>"),

	initialize: function() {
		this.render();
	},

	render: function() {
		console.log('rendering modal');
		this.$el.html(this.template({who: 'world!'}));
	}
});