var React = require('react');
var BertActionCreators = require('../actions/BertActionCreators');

var TemplateBlock = React.createClass({
	render: function(){
		var result = [];
		var self = this;
		var status = this.props.isFull ? 'full' : 'empty';
		var pos = this.props.pos;
		var handler = this.props.isFull ? this._clickFull : this._clickEmpty;
		if(this.props.el){
			this.props.el.childMap.forEach(function(elem, i){
				if(!self.props.el.children[elem]){
					result.push(
						<TemplateBlock isFull={false} parent={self.props.el} handleAdding={self.props.handleAdding} pos={i} el={undefined} onClick={handler}/>
					);
				}
				else{
					result.push(
						<TemplateBlock isFull={true} handleAdding={self.props.handleAdding} pos={i}onClick={handler} el={self.props.el.children[elem]}/>
					);
				}
			});
		}

		return(
			<div className={"templateBlock " + status} onClick={handler} key={this.props.pos}>
				{this.props.el ? this.props.el.template : ''}
				<div className="templateBlockWrapper">
					<div>
						{this.props.el ? result : '+'}
					</div>
				</div>
			</div>
		);


		this.props.el.childMap.forEach(function(elem, i){
			if(!self.props.el.children[elem]){
				result.push(
					<div key={i} className="templateBlock empty" onClick={self._clickEmpty.bind(self, i)}></div>
				);
				return;
			}
			result.push(
				<div className="templateBlock full" onClick={self._clickFull.bind(self, i)}>
					<TemplateBlock key={i} el={self.props.el.children[elem]} handleAdding={self.props.handleAdding}/>
				</div>
			);
		});
		if(!result.length && !this.props.el.parent){
			result.push(<div key={0} className="templateBlock full" onClick={this._clickFull.bind(this)}>
				</div>);
		}

		return(<div className="documentStructure">{result}</div>);
	},
	_clickFull: function(e){
		e.stopPropagation();
		if(!this.props.handleAdding(this.props.el, this.props.pos, true)){
			BertActionCreators.focusOn(this.props.el);
		}
	},
	_clickEmpty:function(e){
		e.stopPropagation();
		this.props.handleAdding(this.props.parent, this.props.pos, false);
	}
});

module.exports=TemplateBlock;