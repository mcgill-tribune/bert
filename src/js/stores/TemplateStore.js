var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var BertConstants = require('../constants/BertConstants');
var Template = require('./template');

var change_event = 'change';

var _templates = {};

function addTemplate(template){
	var tpl = new Template(template);
	_templates[tpl.name] = tpl;
}

function removeTemplate(template){
	template = template.name || template;
	delete _templates[template];
}

/*function tokenizeTemplate(template){
	var tokens = {};
	var openers = {
		'[' : ']]',
		'{' : '}}',
		'<' : '>>'
	};
	var tokenSet = /\{\{|\}\}|<<|>>/;
	var count = 0;

	while(template){
		var tagPos = template.search(tokenSet);
		if(tagPos !== -1){
			var tag = template.charAt(tagPos);
			if(openers[tag]){
				template = template.slice(tagPos + 2);
				var close = template.indexOf(openers[tag]);
				if(close === -1){
					throw new Error('Missing closing tag: "' + openers[tag] + '" expected');
				}
				tokens[template.slice(0, close).trim()] = count;
				template = template.slice(close + 2)
				count++;
			}
		}
		else {
			break;
		}
	}

	return tokens;
}*/

var TemplateStore = assign({}, EventEmitter.prototype, {
	getTemplates: function(){
		return _templates;
	},
	emitChange: function(){
		this.emit(change_event);
	},
	addListener: function(callback){
		this.on(change_event, callback);
	},
	removeListener: function(callback){
		this.removeListener(change_event, callback);
	},
	dispatcherIndex: AppDispatcher.register(function(payload) {

		var action = payload.action;

		if(payload.actionType !== 'SERVER'){
			return false;
		}

		switch(action.type){
			case BertConstants.ADD_TEMPLATE:
				addTemplate(action.template);
				TemplateStore.emitChange();
				break;
			case BertConstants.REMOVE_TEMPLATE:
				removeTemplate(action.template);
				TemplateStore.emitChange();
				break;
			case BertConstants.UPDATE_TEMPLATE:
				var diff = false;
				if(action.newTemplates && action.newTemplates.length){
					action.newTemplates.forEach(function(tpl){
						addTemplate(tpl);
					});
					diff = true;
				}

				if(action.removeTemplates && action.removeTemplates.length){
					action.removeTemplates.forEach(function(tpl){
						removeTemplate(tpl);
					});
					diff = true;
				}

				if(diff){
					TemplateStore.emitChange();
				}
		}
	})
});

module.exports = TemplateStore;