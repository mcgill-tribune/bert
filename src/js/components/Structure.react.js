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

	_onClick: function(el, i, isFull, isDrag){
		console.log(el, i, isFull, isDrag)
		if(isDrag && isFull){
			this.setState({draggingEl:{
				element:el,
				position:i
			}});
			console.log(this.state)
		}
		else if(isDrag){
			BertActionCreators.addChild(this.state.draggingEl.element,el, i);
		}
		if(isFull && !this.state.clickedEl && !isDrag){
			return false;
		}
		else if(!isFull  && !isDrag){
			this.state.clickedEl = {
				element:el,
				position:i
			};
		}
		else if (!isDrag){
			BertActionCreators.addChild(el, this.state.clickedEl.element, this.state.clickedEl.position);
			this.state.clickedEl = undefined;
		}

		return true;
	}
});

module.exports = Structure;