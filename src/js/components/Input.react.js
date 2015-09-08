var React = require('react');
var BertActionCreators = require('../actions/BertActionCreators');

var Input = React.createClass({
	getInitialState: function(){
		var state = {val: this.props.defaultVal};
		/*if(this.props.type === 'listAdder'){
			state.currentList = this.props.options;
			state.addedElems = this.props.added || [];
		}*/
		return state;
	},
	render: function(){
		console.log('type', this.props.type);
		if(this.props.type === 'textarea'){
			return (
				<div className="inputBlock">
					<h4><label for={this.props.field}>{this.props.field}</label></h4>
					<textarea name={this.props.field} value={this.state.val} onChange={this._onGenericChange} />
				</div>
			);
		}
		else if(this.props.type === 'radio' || this.props.type === 'checkbox'){
			var check = [];
			//Replace with Jquery $.each for more robust loooooooop
			var options = this.props.options.split(' ');
			for(val in options){
				check.push(<span>
					<label>{options[val]}</label>
					<input type={this.props.type} name={this.props.field} value={options[val]} checked={options[val]===this.state.val} onChange={this._onGenericChange}/></span>);
			}
			return(
				<div className="inputBlock">
					<h4>{this.props.field}</h4>
					{check}
				</div>
			);
		}
		/*else if(this.props.type === 'listAdder'){
			var adder = [];
			//Replace with Jquery $.each for more robust loooooooop
			for(val in this.props.options){
				adder.push(<input type={this.props.options[val].type} name={val} value={this.state.currentList[val].value} onChange={this._onAdderChange}/>);
			}
			adder.push(<button onClick={this._onAdderAdd}>Add</button>);

			var added = [];

			this.state.addedElems.forEach(function(el, i){
				added.push(
					<tr>
						<td>
							<button onClick={this._onAdderDelete.bind(this, i)}>X</button>
						</td>
						{el}
					</tr>
				);
			});

			return(
				<div>
					<div className="adderInput">
						{adder}
					</div>
					<table className="adderPreview">
						{added}
					</table>
				</div>
			);
		}*/
		else if(this.props.type === 'select'){
			var options = [];
			//Replace with Jquery $.each for more robust loooooooop
			for(val in this.props.options){
				options.push(<option value={val} name={val}/>);
			}
			return(
				<select value={this.state.val} name={this.props.field} onChange={this._onGenericChange}>
					{options}
				</select>
			);
		}
		else{
			console.log('content',this.state.content);
			return (
				<div className="inputBlock">
					<h4><label for={this.props.field}>{this.props.field}</label></h4>
					<input
						type="text"
						name={this.props.field}
						value={this.state.val}
						onChange={this._onGenericChange}
						onBlur={this._onGenericChange}
					/>
				</div>
			);
		}
	},
	_onGenericChange: function(event, value){
		this.setState({val: event.currentTarget.value});
		this._handleChange(event.currentTarget.value);
	},
	/*_onAdderChange: function(event){
		var resultState = this.state;
		resultState.currentList[event.currentTarget.name] = event.currentTarget.value;
		this.setState(resultState);
	},
	_onAdderAdd: function(event){
		var resultState = this.state;
		var toAdd = "";
		for (val in resultState.currentList){
			if(resultState.currentList.hasOwnProperty(val)){
				toAdd += "<td>" + resultState.currentList[val] + "</td>";
			}
		}
		resultState.addedElems.push("");
		resultState.currentList = this.props.options;
		this.setState(resultState);
		this._handleChange();
	},
	_onAdderDelete: function(i, event){
		var resultState = this.state;
		resultState.addedElems.splice(i, 1);
		this.setState(this.state.addedElems);
		this.props.handleChange();
	},*/
	_handleChange: function(value){
		value = (this.props.type=="textarea" ? 	'<p>' + value.replace('\n', '</p><p>') + '</p>' : value);
		BertActionCreators.updateElement(this.props.el, this.props.field, value);
	}
});

module.exports = Input;
