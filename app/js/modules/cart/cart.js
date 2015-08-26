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
		el: $('#cartTemplate'),
		template: _.template($("#cart-table").html()),
		
		initialize: function(options) {

		},

		events: {
			'click .button' : 'updatePrice'
		},

		addToBag: function(product) {
			// this.collection.add(product);
		},

		render: function() {
			// console.log('CartCollectionView render called');
			console.log(this.collection);
			var html = this.template(this.collection.toJSON());
			var table = $(html);

			var self = this;
			this.$el.html('<h1>Cart</h1><a href="#" class="button tiny">Apply 20% discount</a>');
			_.each(this.collection.models, function (item) {
				var row = self.renderProduct(item);
				table.append(row);
			});

			this.$el.append(table);
			table.DataTable();
			return this;
		},

		renderProduct: function(item) {
			// var productView = new app.views.CartProductView({model: item}); 
			var tableRow = new app.views.TableRow({model: item});
			return tableRow.render().el;
			// this.$el.append(tableRow.render().$el);
			// this.$el.append(productView.render().el);
			// console.log(this);
		},

		updatePrice: function(e) {
			e.preventDefault();
			var currentPrice;
			var newPrice;
			_.each(this.collection.models, function (item) {
				currentPrice = item.get('price');
				qty = item.get('qty');
				newPrice = Number(currentPrice) * 0.8;
				newPrice = newPrice.toFixed(2);
				newTotal = newPrice * Number(qty);
				item.set({price: newPrice});
				item.set({total: newTotal});
			});
		}
	});




	app.views.TableRow = Backbone.View.extend({
		tagName: 'tr',
		template: $("#cartRow").html(),
		// template: _.template(''),

		events: {
			'change input' : 'updateQty'
		},

		initialize: function() {
			this.model.on('change', this.render, this);
			var price = Number(this.model.get('price'));
			var qty = Number(this.model.get('qty'));
			var total = price*qty;
			this.model.set({total: total});
			this.render();
		},

		render: function() {
			var html = _.template(this.template);
			this.$el.html(html(this.model.toJSON()));
			return this;
		},

		updateQty: function(e) {
			var val = $(e.currentTarget).val();
			this.model.set({qty: val});
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

			// console.log(product.get('id'));
			// console.log(this.collection.contains(product));
			//_.find, findwhere
			// var found = this.collection.find(function(item) {
			// 	return item.get('id') == product.get('id');
			// })
			var id = product.get('id');
			var found = this.collection.findWhere({'id': id});
			if(found) { 
				var qty = found.get('qty');
				found.set({qty: ++qty});
				this.collection.remove({id: id});
				this.collection.add(found);

			} else {
				this.collection.add(product);
			}
			// for (var i = 0; i < this.collection.length; i++) {
			// 	var item = this.collection.models[i];
			// 	var prodId = product.get('id');
			// 	if (item.id === prodId) {
			// 		console.log('match found!');
			// 	}
			// }
			
		},

		render: function() {
			var qty = 0;
			_.each(this.collection.models, function (item) {
				qty += Number(item.get('qty'));
			});
			this.$el.html(this.template({number: qty}));
		}//,

		/*getCollection: function() {
			return this.collection;
		}*/	
	});

}(window.app = window.app || {}));