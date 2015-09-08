var React = require('react');
var BertActionCreators = require('../actions/BertActionCreators');
var TemplateBlock = require('./TemplateBlock.react');

var Structure = React.createClass({
	getInitialState: function(){
		return {clickedEl: undefined};
	},
	render: function(){
		var result = [];
		for(var el in this.props.doc){
			if(this.props.doc.hasOwnProperty(el)){
				console.log(el);
				result.push(<TemplateBlock isFull={true} el={this.props.doc[el]} handleAdding={this._onClick} pos={0}/>);
			}
		}
		return(
			<div className="structure">
			<div className={"documentContainer" + (this.state.clickedEl ? ' addChild' : '')} onClick={this._documentFocus}>
				{result}
			</div>
			</div>
		);
	},

	_documentFocus: function(){
		BertActionCreators.focusOn(undefined);
	},

	_onClick: function(el, i, isFull){
		if(isFull && !this.state.clickedEl){
			return false;
		}
		else if(!isFull){
			this.state.clickedEl = {
				element:el,
				position:i
			};
		}
		else{
			BertActionCreators.addChild(el, this.state.clickedEl.element, this.state.clickedEl.position);
			this.state.clickedEl = undefined;
		}

		return true;
	}
});

module.exports = Structure;