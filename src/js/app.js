var React = require('react');
var Bert = require('./components/Bert.react');

var TemplateAPI = require('./utils/TemplateAPI');

TemplateAPI.init();

React.render(
	<Bert/>,
	document.getElementById('bert')
);