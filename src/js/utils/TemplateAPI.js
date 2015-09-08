var Promise = require('es6-promise').Promise;
var BertConstants = require('../constants/BertConstants');
var BertActionCreators = require('../actions/BertActionCreators');

module.exports = {
	init: function(){
		this.request().then(function(response){
			BertActionCreators.updateTemplates(response);
		}).catch(function(e){
			console.log(e);
		})
	},
	request: function(){
		var promise = new Promise(function(resolve, reject){
			var request = new XMLHttpRequest();
			request.open('POST', BertConstants.TEMPLATE_URL);
			request.send();

			request.onload = function(e){
				if(this.status === 200){
					console.log(this.status)
					resolve(this.response);
				}
				else{
					reject(this.statusText);
				}
			};

			request.onerror = function(){
				reject(this.statusText);
			};
		});
		return promise;
	},
	listen: function(){
		return null;
	}
}