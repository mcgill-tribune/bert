var React = require('react');
var CopyToClipboard = require('react-copy-to-clipboard');

var Preview = React.createClass({
	getInitialState: function(){
		return {copied: false};
	},
	render: function(){
		var text = this._renderFromTemplate();
		var code = text.replace(/\n/g, '')
		var style = new Set(code.match(/<style>.*?<\/style>/g));
		code = code.replace(/<style>.*?<\/style>/g, '');
		var styletext = '';
		style.forEach(function(e){
			styletext += e;
		});
		code = '<style>' + styletext.replace(/<\/?style>/g, '') + '</style>'+ code;
		return (
			<div className="result">
			<div className="copy">
				<CopyToClipboard onCopy={this._handleCopy} text={code}>
					{this.state.copied ? 'Copied!' : 'Copy code to Clipboard'}
				</CopyToClipboard>
			</div>
			<h2>Preview</h2>
			<div className="preview" dangerouslySetInnerHTML={{__html: text}}>
			</div>
			<div className="code">
				<h2>Copy and Paste this code</h2>
				{code}
			</div>
			</div>
		);
	},

	_handleCopy: function(){
		this.setState({copied:true});
	},

	_renderFromTemplate: function(){
		var templates = this.props.templates;
		var elems = this.props.elems;

		if(this.props.focus){
			return renderElem(this.props.focus);
		}
		else{
			var result = [];
			for(var key in this.props.doc){
				if(this.props.doc.hasOwnProperty(key)){
					result.push(renderElem(this.props.doc[key]));
				}
			}
			return result.join('\n');
		}

		function renderElem(el){
			if (el === undefined){
				return "";
			}
			var base = templates[el.template].raw;
			base = base.replace(/\[\[.*?\]\]/, '');
			for(var key in el.ownContent){
				if(el.ownContent.hasOwnProperty(key)){
					var rep = el.ownContent[key].value ? el.ownContent[key].value : '';
					console.log('REp', rep);
					base = base.replace(new RegExp('\\{\\{\s*' + key + '.*?\\}\\}', 'g'), rep );
				}
			}

			base = base.split(/<<|>>/);

			el.childMap.forEach(function(v, i){
				if(v){
					var subEl = renderElem(el.children[v]);
				}
				else{
					var subEl = '';
				}
				base[2 * i + 1] = subEl;
			});

			base = base.join('');

			return base;
		}


	}
});

module.exports = Preview;