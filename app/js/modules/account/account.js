
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

	events : {
		'submit form' : 'createUser'
	},

	initialize: function() {
		this.model.on('change', this.render, this);
		this.render();
	},

	render: function() {
		var html = _.template(this.template);
		this.$el.html(html(this.model.toJSON()));
	},

	createUser: function(e) {
		e.preventDefault();
		var name = $('#account-name').val();
		var password = $('#account-password').val();
		var email = $('#account-email').val();

	}  
});

