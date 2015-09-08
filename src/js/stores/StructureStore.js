var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ElementFactory = require('./Element');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var BertConstants = require('../constants/BertConstants');
var FocusStore = require('./FocusStore');

var CHANGE_EVENT = 'change';
var _elements = {};
var _document = {};

function addChild(elem, parent, position){
	console.log('adding', elem, 'to', parent, 'at', position);
	parent = parent && (parent.elementId || parent);
	elem = elem.elementId || elem;
	hasPosition = position >= 0;
	if(parent && hasPosition){
		if(_elements[parent].validateChild(_elements[elem], _elements[parent].templateMap[position]) && !_elements[elem].findAncestors()[parent] && elem !== parent){
			//Clear element's old parent
			var oldParent = _elements[elem].parent;
			if(oldParent){
				elements[elem].childMap[oldParent.children[elem].position] = undefined;
			delete oldParent.children[elem]
			}
			//Update new parent
			_elements[parent].children[elem] = _elements[elem];
			_elements[parent].childMap[position] = elem;

			//Update Element
			_elements[elem].parent = _elements[parent];
			_elements[elem].position = position;

			if(_document[elem]){
				delete _document[elem];
			}
		}
	}
	else{
		_document[elem] = _elements[elem];
	}

}

function updateElem(elem, data){
	console.log('updating' , elem, data);
	elem = elem.elementId || elem;
	_elements[elem].ownContent = data;
	console.log('pellem', elem, data);
}

function generateElem(template){
	console.log("Generating from template: ", template);
	var el = ElementFactory.generateElement(template);
	_elements[el.elementId] = el;
	addChild(el);
}

function removeElem(elem){
	elem = elem.elementId || elem;
	console.log('deleteing1', _elements[elem])
	if(_elements[elem].parent && _elements[elem].parent.children[elem]){
		delete _elements[elem].parent.children[elem];
	}
	console.log('deleteing2', elem)
	delete _elements[elem];
	console.log('deleteing3', elem)
	delete _document[elem];
}

var StructureStore = assign({}, EventEmitter.prototype, {

	getStructure : function(){
		return _document;
	},

	getElems : function(){
		return _elements;
	},

	emitChange : function(e){
		this.emit(CHANGE_EVENT);
	},

	addListener : function(callback){
		this.on(CHANGE_EVENT, callback);
	},

	removeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

	dispatchID: AppDispatcher.register(function(payload){

		var action = payload.action;
		AppDispatcher.waitFor([FocusStore.dispatchId], function(){
			if(payload.actionType !== 'VIEW'){
				return false;
			}

			switch(action.type){
				case BertConstants.DELETE_ELEMENT:
					removeElem(action.element);
					StructureStore.emitChange();
					break;
				case BertConstants.ADD_CHILD:
					addChild(action.element, action.parent, action.position);
					StructureStore.emitChange();
					break;
				case BertConstants.NEW_ELEMENT:
					generateElem(action.template);
					StructureStore.emitChange();
					break;
				case BertConstants.UPDATE_STRUCTURE:
					removeElem(action.element);
					addChild(action.element, action.parent, action.position);
					StructureStore.emitChange();
					break;
				case BertConstants.UPDATE_ELEMENT:
					console.log(action);
					updateElem(action.element, action.data);
					StructureStore.emitChange();
					break;
			}
		});
	})
});

module.exports = StructureStore;