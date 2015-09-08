var React = require('react');
var ElementAdd = require('./ElementAdd.react');
var Fields = require('./Fields.react');
var Structure = require('./Structure.react');

var Controls = React.createClass({
	getInitialState:function(){
		return {
			shown: false
		};
	},
	render: function(){
		return (
			<div className="controls">
				<div className="upper" onClick={this._toggleAddState}>
					<Fields
					el={this.props.focus}
					/>
					<ElementAdd
					templates={this.props.templates}
					shown={this.state.shown}
					/>
					<div className={"addElement" + (this.state.shown ? " hidden" : "")} active={this.state.shown} onClick={this._toggleAddState}>+</div>
				</div>
			</div>
		);
	},
	_toggleAddState: function(e){
		console.log('elem');
		if(this.state.shown || e.target.className == "addElement"){
					this.setState({shown: !this.state.shown});
		}
	}
});

module.exports = Controls;