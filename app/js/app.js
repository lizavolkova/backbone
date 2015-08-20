

// TODO: Add closure - add scope and packages. Divide files into mininful sections. Add JSDOC comments. Be consistent

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
			this.products.destroy();
		}
		console.log('I am on index route!');
	},

	category: function(cat) {
		this.products = new ProductCollectionView({category: cat});
	},

	account: function() {
		console.log('account view');
		var user = new User({id: '44'});
		//user.save();
		user.fetch();
		var userView = new UserView({model: user});
		// user.destroy();
	},

	destroy: function() {
		this.remove();
		this.unbind();
	}

});
var router = new Router();
Backbone.history.start();

