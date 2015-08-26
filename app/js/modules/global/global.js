(function (app) {
	app.models = app.models || {};
	app.collections = app.collections || {};
	app.views = app.views || {};

	/*************************
	// GET PRODUCT CATEGORIES
	*************************/
	app.models.Category = Backbone.Model.extend({
		defaults: {
			categories: ['one' , 'two', 'three']
		},
		urlRoot: 'http://bterra.net/api/categories'
	}); 

	app.views.CategoriesView = Backbone.View.extend({
		model: app.models.Category,
		/**
		 * @property tagName
		 * @type {String}
		 * @default "li"
		 */
		tagName: 'li',

		/**
		 * @property el
		 * @type {String}
		 * @default "#category-list"
		 */
		el: '#category-list',
		
		/**
	 	 * @method initialize  
	 	 */
		initialize: function() {
			this.categories = new app.models.Category();
			// this.model.on('reset', this.render, this);
			// this.model.on('change', this.render, this);
			var self = this;
			this.state_loading(true);
			this.categories.fetch().done(function(result) {
				self.render(result);
				self.state_loading(false);
			});
		}, 
	 	
	 	/**
	 	 * @method render  
	 	 */
		render: function(result) {
			var html = '';
			_.each(result.categories, function (item) {
				html += '<li><a href="#category/'+item+'">'+item+'</a></li>';
			});
			this.$el.append(html);	
		},

		state_loading: function(value) {
			if(value === true) {
				// this.$el.parent().removeClass('menu-loading');
			} else {
				this.$el.parent().addClass('has-dropdown');
			}
			
		} 
	});

	var categoryList = new app.views.CategoriesView();
}(window.app = window.app || {}));