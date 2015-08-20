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
			this.model.on('reset', this.render, this);
			this.model.on('change', this.render, this);
		}, 
	 	
	 	/**
	 	 * @method render  
	 	 */
		render: function() {
			var html = '';		
			_.each(this.model.toJSON().categories, function (item) {
				html += '<li><a href="#category/'+item+'">'+item+'</a></li>';
			});
			this.$el.append(html);	
		} 
	});

	var categories = new app.models.Category();
	categories.fetch();
	var categoryList = new app.views.CategoriesView({model: categories});
}(window.app = window.app || {}));