var BertDispatcher = require('../dispatcher/AppDispatcher');
var BertConstants = require('../constants/BertConstants');

module.exports = {
	createElement: function(template){
		BertDispatcher.handleViewAction({
			type: BertConstants.NEW_ELEMENT,
			template: template
		});
	},
	addChild: function(element, parent, position){
		BertDispatcher.handleViewAction({
			type: BertConstants.ADD_CHILD,
			element: element,
			parent: parent,
			position: position
		});
	},
	deleteElement: function(element){
		BertDispatcher.handleViewAction({
			type: BertConstants.DELETE_ELEMENT,
			element: element,
		});
	},
	updateElement: function(element, field, value){
		var data = element.ownContent;
		data[field].value = value;
		BertDispatcher.handleViewAction({
			type: BertConstants.UPDATE_ELEMENT,
			data: data,
			element: element
		});
	},
	focusOn: function(element){
		BertDispatcher.handleViewAction({
			type: BertConstants.FOCUS_ON,
			focus: element,
		});
	},
	updateTemplates: function(templateData){
		templateData = JSON.parse(templateData);
		templateData.type = BertConstants.UPDATE_TEMPLATE;
		BertDispatcher.handleServerAction(templateData);
	}
};