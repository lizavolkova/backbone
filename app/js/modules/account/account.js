(function (app) {
	app.models = app.models || {};
	app.collections = app.collections || {};
	app.views = app.views || {};
	
	/*************************
	// ACCOUNTS
	*************************/
	app.models.User = Backbone.Model.extend({
		defaults : {
			name: 'Name',
			email: 'email@mail.com',
			password: 'pass',
			type: 'regular' 
		},
		urlRoot : 'http://bterra.net/api/users'
	});

		
	app.views.UserView = Backbone.View.extend({
		// model: User,
		el: '#main',

		/**
		 * Undescore Template
		 *
		 * @property template
		 * @type {Object}
		 */
		template: $("#accountTemplate").html(),

		/**
		 * Backbone Events
		 *
		 * @property events
		 * @type {Object}
		 */
		events : {
			'submit form' : 'createUser'
		},

		/**
	 	 * @method initialize  
	 	 */
		initialize: function() {
			this.model.on('change', this.render, this);
			this.render();
		},

		/**
	 	 * @method render  
	 	 */
		render: function() {
			var html = _.template(this.template);
			this.$el.html(html(this.model.toJSON()));
		},

		/**
	 	 * @method createUser  
	 	 */
		createUser: function(e) {
			e.preventDefault();
			var model = this.model;
			this.$el.find('input[name]').each(function() {
				model.set(this.name, this.value);
			});
			this.model.save().done(function() {
				console.log('form submitted!');
			});
		}  
	});	
}(window.app = window.app || {}));