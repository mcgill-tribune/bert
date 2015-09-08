var Template = function(tpl){
	this.raw = tpl;
	console.log('raw',this.raw.split(/\[(?=\[)|\]\]/));
	var tokens = this.raw.split(/\[(?=\[)|\]\]/).filter(function(v){
		return (v && v.indexOf('[') === 0);
	});
	console.log('raw',tokens);

	var token = tokens[0].replace(/[^a-zA-Z0-9\-\_\s"'=]/g, '');
	this.name = token.split(/\s/)[0];
	this.provides = token.match(/provides=(?:'|")(.*?)(?:'|")/)[1];
};

/**
 * Returns information needed to add form information to element (own content)

 **/
Template.prototype.getOwnContent = function() {
	var ownContent = {};
	console.log('ownContent1', ownContent);
	var tokens = this.raw.split(/\{(?=\{)|\}\}/).filter(function(v){
		return (v && v.indexOf('{') === 0);
	});

	console.log('ownContent2', tokens);

	tokens = tokens.map(function(v){
		return v.replace(/[^a-zA-Z0-9\-\_'"=\s]/g, '');
	});

	console.log('ownContent3', tokens);
	tokens.forEach(function(v, i){
		var name = v.split(/\s/)[0];
		console.log('ownContent4' + i, name);
		if(ownContent[name]){
			console.log('exists');
			return;
		}
		var defaultValue = v.match(/default=(?:'|")(.*?)(?:'|")/);
		console.log('default', defaultValue);
		if(defaultValue){
			defaultValue = defaultValue[1].trim();
		}
		var type = v.match(/type=(?:'|")(.*?)(?:'|")/);
		console.log('type', type);
		if(type){
			type = type[1].trim();
		}
		var options = v.match(/options=(?:'|")(.*?)(?:'|")/);
		console.log('options', options);
		if(options){
			options = options[1].trim();
		}
		ownContent[name] = {
			value : defaultValue,
			type: type,
			options: options
		};
		console.log('ownContent5', ownContent);
	});
	console.log('ownContent', ownContent);
	return ownContent;
};

Template.prototype.getSubTemplates = function(){
	var templates = [];
	var validChildren = {};

	var tokens = this.raw.split(/<<|>>/);
	console.log('subtpl1', tokens);
	tokens = tokens.filter(function(v){
		return (v && v.indexOf('&') === 0);
	});
	console.log('subtpl2', tokens);
	tokens = tokens.map(function(v){
		return v.replace(/[^a-zA-Z0-9\-\_'"=\s]/g, '');
	});
	console.log('subtpl3', tokens);


	tokens.forEach(function(v){
		var name = v.split(/\s/)[0];
		templates.push(name);

		if(validChildren[name]) return;

		var accepts = v.match(/accepts=(?:'|")(.*?)(?:'|")/)[1].trim();

		validChildren[name] = parseBool(accepts);
	});

	return {
		templateMap: templates,
		validChildren: validChildren
	};
};

function parseBool(boolString){
	var lex = boolString.split(/([\s\+!\(\)])/);
	var current;
	var bool = {};
	try{
		expression();
		return bool;
	}
	catch(err){
		return {};
	}

	function expression(){
		term();
		while(current === ' '){
			var or = {
				type: 'OR',
				arg1: bool
			};
			term();
			or.arg2 = bool;

			bool = or;
		}
	}

	function term(){
		factor();
		while(current ==='+'){
			var and = {
				type: 'AND',
				arg1: bool
			};
			factor();
			and.arg2 = bool;

			bool = and;
		}
	}

	function factor(){
		current = lex.shift();
		var reg = /[0-9a-zA-Z_\-]+/;

		switch(true){
			case current === '!' :
				var not = {
					type: 'NOT'
				};
				factor();
				not.arg = bool;
				bool = not;
				break;
			case current === '(' :
				expression();
				current = lex.shift();
				break;
			case reg.test(current):
				bool = {
					type: 'CLASS',
					arg : current
				};
				current = lex.shift();
				break;
			default :
				throw new Error("Class Parse Error");
		}
	}
}

module.exports = Template;