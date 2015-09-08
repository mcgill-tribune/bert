var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var BertConstants = require('../constants/BertConstants');

var change_event = 'change';

var focus = null;

function focusOn(element){
	focus = element;
}

var FocusStore = assign({}, EventEmitter.prototype, {
	getFocus: function(){
		return focus;
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
	dispatchId: AppDispatcher.register(function(payload){
		var action = payload.action;
		switch(action.type){
			case BertConstants.FOCUS_ON:
				focusOn(action.focus);
				FocusStore.emitChange();
				break;
			case BertConstants.DELETE_ELEMENT:
				if(focus === action.element){
					focusOn(action.element.parent);
					FocusStore.emitChange();
				}
				break;
		}
	})
});

module.exports = FocusStore;