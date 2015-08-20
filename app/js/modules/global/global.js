/*************************
// GET PRODUCT CATEGORIES
*************************/
var Category = Backbone.Model.extend({
	defaults: {
		categories: ['one' , 'two', 'three']
	},
	urlRoot: 'http://bterra.net/api/categories'
}); 

var CategoriesView = Backbone.View.extend({
	tagName: 'li',
	el: '#category-list',
	
	initialize: function() {
		this.model.on('reset', this.render, this);
		this.model.on('change', this.render, this);
	}, 
 
	render: function() {
		var html = '';		
		_.each(this.model.toJSON().categories, function (item) {
			html += '<li><a href="#category/'+item+'">'+item+'</a></li>';
		});
		this.$el.append(html);	
	} 
});

var categories = new Category();
categories.fetch();
var categoryList = new CategoriesView({model: categories});
