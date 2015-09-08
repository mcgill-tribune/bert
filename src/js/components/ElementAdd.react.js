var React = require('react');
var BertActionCreators = require('../actions/BertActionCreators');

var ElementAdd = React.createClass({
	render: function(){
		var templates = [];
		for(var tpl in this.props.templates){
			if(this.props.templates.hasOwnProperty(tpl)){
				templates.push(
					<li key={tpl} onClick={this._onClick.bind(this, this.props.templates[tpl])} value={this.props.templates[tpl]}>{this.props.templates[tpl].name}</li>
				);
			}
		}
		return(
			<ul className={"elementAdd" + (this.props.shown ? ' active' : '')}>
				{templates}
			</ul>
		);
	},
	_onClick: function(value){
		console.log('sending create action: ', value)
		BertActionCreators.createElement(value);
	}
});

module.exports = ElementAdd;