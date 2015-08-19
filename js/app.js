/*************************
// GET PRODUCT CATEGORIES
*************************/

// TODO: Add closure - add scope and packages. Divide files into mininful sections. Add JSDOC comments. Be consistent

var Category = Backbone.Model.extend({
	defaults: {
		categories: ['one' , 'two', 'three']
	}
}); 
var CategoryCollection = Backbone.Collection.extend({
	model: Category,
	url: 'http://bterra.net/api/categories'
});

var CategoriesView = Backbone.View.extend({
	tagName: 'li',
	el: '#category-list',
	template: _.template("<li><%= category %></li>"),

	initialize: function() {
		// this.render();
		var self = this;
		this.list = new CategoryCollection();
		this.list.on('reset', this.render, this);
		// This is correct
		this.list.fetch().done(function(result) {
			console.log(result);
			self.render();
		});
	},

	render: function() {
		console.log(this);	
	}
});
var categoryList = new CategoriesView();


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
	tagName: 'section',
	className: 'product',
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
		console.log(options);
		this.cat = options.category;
	},

	url: function() {
		var url = 'http://bterra.net/api/category/'+this.cat;
		return url;
	}
});

var ProductCollectionView = Backbone.View.extend({
	el: '#main',

	initialize: function(options) {
		
		this.collection = new ProductCollection(options);
		this.collection.on('reset', this.render, this);
		this.collection.on('change', this.render, this);
		this.render();
		// this.collection.fetch().done(function(){
		// 	self.render();
		// });
	}, 

	render: function() {
		var self = this;
		// TODO: look at promisses 
		this.collection.fetch({
			success: function(result) {
				setTimeout(function () {
					self.$el.html(''); //clear our products div before adding new category items
					_.each(self.collection.models, function (item) {
						self.renderProduct(item);
					}, this);
				}, 4000);
			}
		});
		
	},

	renderProduct: function(item) {
		var productView = new ProductView({model: item});
		this.$el.append(productView.render().el);
	}
});


/*************************
// ACCOUNTS
*************************/
var User = Backbone.Model.extend({
	defaults : {
		name: 'Name',
		email: 'email@mail.com',
		password: 'pass',
		type: 'regular' 
	},
	urlRoot : 'http://bterra.net/api/users'
});

var UserView = Backbone.View.extend({
	// model: User,
	el: '#main',
	template: $("#accountTemplate").html(),

	initialize: function() {
		this.model.on('change', this.render, this);
		this.render();
	},

	render: function() {
		var html = _.template(this.template);
		this.$el.html(html(this.model.toJSON()));
	}
});



/*************************
// CREATE ROUTES
*************************/
var Router = Backbone.Router.extend({
	routes: {
		'' : 'index',
		'category/:cat' : 'category',
		'account' : 'account'
	},

	initialize: function() {
		
	},

	index: function(){
		if(this.products) {
			this.products.destroy()
		}
		console.log('index route');
	},

	category: function(cat) {
		this.products = new ProductCollectionView({category: cat});
	},

	account: function() {
		console.log('account view');
		var user = new User({name: 'Liza'});
		user.save();
		// user.fetch();
		// user.destroy();
		var userView = new UserView({model: user});
	},

	destroy: function() {
		this.remove();
		this.unbind();
	}

});
var router = new Router();
Backbone.history.start();
