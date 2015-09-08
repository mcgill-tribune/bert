var React = require('react');
var Input = require('./Input.react');
var BertActionCreators = require('../actions/BertActionCreators');

var Fields = React.createClass({
 render: function(){
 	var children = [];
 	if(this.props.el && this.props.el.ownContent){
	 	for(var key in this.props.el.ownContent){
	 		if(this.props.el.ownContent.hasOwnProperty(key)){
	 			var input = this.props.el.ownContent[key];

				children.push(
					<Input
						field={key}
						key={this.props.el.elementId + '_' + key + '_input'}
						type={input.type}
						options={input.options}
						defaultVal={input.value}
						el={this.props.el}
					/>
				);
	 		}
	 	}
	 	children.push(<button className="deleteElement" onClick={this._deleteElem}>Delete Element</button>);
	}
	else{
		children.push(<h1>Hi, my name is Bert</h1>);
		children.push(<p>Lets work together to generate a custom article.</p>);
	}
 	return(
	 	<div className="fields">
	 		{children}
	 	</div>
	);
 },
 _deleteElem: function(){
 	BertActionCreators.deleteElement(this.props.el);
 }
});

module.exports = Fields;