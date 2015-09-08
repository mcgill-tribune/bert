var assign = require('object-assign');
var jquer

var ElementFactory = function(){
	this.seenElements = {};
};

ElementFactory.prototype.generateElement = function(template){
	/*
	if caching is worth the deep copy required, come back to this!
	if(this.seenElements[template.name]){
		this.seenElements[template.name].counter++;
		var result = Object.create(this.seenElements[template.name].el);
		return assign(result, {elementId:template.name + this.seenElements[template.name].counter});
	}
	*/

	var el = new Element();
	console.log("The factory has generated0: ", el);
	el.template = template.name;
	console.log("The factory has generated1: ", el);
	el.provides = template.provides;
	console.log("The factory has generated2: ", el);
	el.ownContent = template.getOwnContent();
	 console.log("The factory has generated3: ", el);
	var subTemplates = template.getSubTemplates();
	el.validChildren = subTemplates.validChildren;
	el.templateMap = subTemplates.templateMap;
	el.childMap = [];
	el.children = {};
	el.templateMap.forEach(function(){
		el.childMap.push(undefined);
	});

	var counter = 0;
	if(this.seenElements[template.name] === undefined){
		this.seenElements[template.name] = 0;
	}
	else{
		this.seenElements[template.name] ++;
	}
	el.elementId = template.name + this.seenElements[template.name];
 console.log("The factory has generated: ", el);
	return el;
};

/*ElementGenerator.prototype.newElement = function(content, structure){
	var el = new Element(this.type, this.counter, content, structure);
	this.counter++;
	return el;
};*/

function Element () {}

Element.prototype.findAncestors = function() {
	var acc = {};
	var parent = this.parent;
	while(parent){
		acc[parent.elementId] = parent;
		parent = parent.parent;
	}
	return acc;
};

Element.prototype.validateChild = function(child, template){
	if(!this.validChildren){
		return false;
	}

	return validate(this.validChildren[template], child.provides);

	function validate(bool, elem){
		switch(bool.type){
			case 'OR':
				var v = validate(bool.arg1,elem);
				return v ? true : validate(bool.arg2, elem);
			case 'AND':
				return validate(bool.arg1, elem) ? validate(bool.arg2, elem) : false;
			case 'NOT':
				return !validate(bool.arg, elem);
			case 'CLASS':
				var result = false;
				elem.split(/\s/).forEach(function(e){
					if(e === bool.arg){
						result = true;
					}
				});
				return result;
			default: throw new Error('Unable to Validate Class');
		}
	}
};

module.exports = new ElementFactory();
