var StructureStore = require('../stores/StructureStore');
var TemplateStore = require('../stores/TemplateStore');
var FocusStore = require('../stores/FocusStore');
var Controls = require('./Controls.react');
var Preview = require('./Preview.react');
var Structure = require('./Structure.react');
var React = require('react');

function getState() {
	console.log('State' , {
		doc: StructureStore.getStructure(),
		elems: StructureStore.getElems(),
		templates: TemplateStore.getTemplates(),
		focus: FocusStore.getFocus()
	});
	return {
		doc: StructureStore.getStructure(),
		elems: StructureStore.getElems(),
		templates: TemplateStore.getTemplates(),
		focus: FocusStore.getFocus()
	};
}

var Bert = React.createClass({
	getInitialState: function(){
		return getState();
	},

	componentDidMount: function(){
		StructureStore.addListener(this._onChange);
		TemplateStore.addListener(this._onChange);
		FocusStore.addListener(this._onChange);
	},

	componentWillUnmount: function(){
		StructureStore.removeListener(this._onChange);
		TemplateStore.removeListener(this._onChange);
		FocusStore.addListener(this._onChange);
	},

	render: function(){
		return (
			<div>
				<Preview
					doc={this.state.doc}
					templates={this.state.templates}
					focus={this.state.focus}
					elems={this.state.elems}
				/>
				<Controls
					doc={this.state.doc}
					elems={this.state.elems}
					focus={this.state.focus}
					templates={this.state.templates}
				/>
				<Structure
					elems={this.state.elems}
					doc={this.state.doc}
				/>
			</div>
		);
	},

	_onChange: function() {
		this.setState(getState());
	}
});

module.exports = Bert;