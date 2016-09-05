var fs = require('fs');
var http = require('http');
var url = require('url');
var newTemplates = [];
var removeTemplates = [];
var isInit = true;
var server = http.createServer(function(req, resp){
	if(req.method === 'POST'){
		fs.readdir('../../tpl', function(err, list){
			if(!list){
				return;
			}
			var l = list.length;
			list.forEach(function(el){
				fs.readFile('../../tpl/' + el, function(err, data){
					if(isInit){
						newTemplates.push(data.toString());
					}
					l--;
					if(l === 0){
						completeResponse(resp, newTemplates, []);
					}
				});
			});
		});
		//isInit = false;
	}
	else{
		var requestUrl = url.parse(req.url);
   	var fsPath = '../..' + requestUrl.pathname;
   	fsPath = fsPath === '../../' ? '../../index.html' : fsPath;
   	console.log(fsPath);
		fs.readFile(fsPath, function(err, file){
   		resp.writeHead('200');
      resp.end(file, "utf-8");
   	});
	}
});

server.listen(8450, function(){
	console.log('Server Ready...');
});

function completeResponse(res, newTpl, remove){
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify({
		newTemplates : newTpl,
		removeTemplates: remove
	}), "utf-8");
}
