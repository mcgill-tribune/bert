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
						<TemplateBlock isFull={true} handleAdding={self.props.handleAdding} pos={i} onClick={handler} el={self.props.el.children[elem]}/>
					);
				}
			});
		}

		return(
			<div className={"templateBlock " + status} ref="tplBlk" draggable={this.props.isFull ? true : null} onDrag={this._handleDragStart} onDragEnd={this._handleDragEnd} onDragLeave={this.props.isFull ? null : self._onDragLeave} onDragOver={this.props.isFull ? null : self._onDragOver} onDrop={this.props.isFull ? null : this._onDrop} onClick={handler} key={this.props.pos}>
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
					<div key={i} className="templateBlock empty"  onClick={self._clickEmpty.bind(self, i)}></div>
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
	_handleDragStart: function(e){
		this.refs.tplBlk.getDOMNode().style.opacity = 0
		this.props.handleAdding(this.props.el, this.props.pos, true, true);
	},
	_handleDragEnd:function(e){
		e.preventDefault();
		this.refs.tplBlk.getDOMNode().style.opacity = 1
		list = this.refs.tplBlk.getDOMNode().children && (this.refs.tplBlk.getDOMNode().children.length > 1 && this.refs.tplBlk.getDOMNode().children[1].children[0].children)
		for(var i = 0; i < list.length; i++){
			this.refs.tplBlk.getDOMNode().children
		}
	},
	_clickEmpty:function(e){
		e.stopPropagation();
		this.props.handleAdding(this.props.parent, this.props.pos, false);
	},
	_onDragOver:function(e){
		e.preventDefault();
		this.refs.tplBlk.getDOMNode().classList.add('hover')
	},
	_onDrop:function(e){
		e.preventDefault();
		this.props.handleAdding(this.props.parent, this.props.pos, false, true);
	},
	_onDragLeave:function(e){
		e.preventDefault();
		this.refs.tplBlk.getDOMNode().classList.remove('hover')
	}
});

module.exports=TemplateBlock;