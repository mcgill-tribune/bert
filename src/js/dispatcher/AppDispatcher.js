var assign = require('object-assign');
var Dispatcher = require('./Dispatcher');

var BertDispatcher = assign({}, Dispatcher.prototype, {
	handleViewAction : function(action) {
		this.handleGenericAction(action, 'VIEW');
	},

	handleServerAction : function(action) {
		this.handleGenericAction(action, 'SERVER');
	},

	handleGenericAction: function(action, type) {
		this.dispatch({
			actionType: type,
			action: action
		});
	}

});

module.exports = BertDispatcher;