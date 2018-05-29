const request = require("request");
var http = require('http')

const proxy_ip = "139.159.254.106";
const proxy_port = 3128;

function start(){
	let url = "https://zhihu-daily.leanapp.cn/api/v1/last-stories";

	var options = {
		host: proxy_ip,
		port: proxy_port,
		method: 'GET',
		path: url
	}
	var req = http.request(options,function(res){
		var body = [];
		res.on('data',function(d){
			body.push(d);
		}).on('end', function(){
			parseJson(Buffer.concat(body).toString());
		});
		
	}).on('error', function(e) {
		alert(e.message);
	});
	req.end();
}

function parseJson(result){
	let json = JSON.parse(result);
	let stories = json.STORIES.stories;
	let html = "";
	for (var i = stories.length - 1; i >= 0; i--) {
		let tmp = stories[i];
		let title = tmp.title;
		let turl = "https://zhihu-daily.leanapp.cn/api/v1/contents/"+tmp.id;
		html += "<a href='#' onclick=\"getStorie('"+turl+"')\">"+title+"</a><br/><br/>";
	}
	$('#list').html(html.substring(0,html.length-10));
}

function getStorie(surl){
	var options = {
		host: proxy_ip,
		port: proxy_port,
		method:'GET',
		path: surl
	}
	
	var req = http.request(options,function(res){
		var body = [];
		res.on('data',function(d){
			body.push(d);
		}).on('end', function(){
			parseStorie(Buffer.concat(body).toString());
		});
		
	}).on('error', function(e) {
		alert(e.message);
	});
	req.end();
}

function parseStorie(body){
	let json = JSON.parse(body);
	let content = json.CONTENTS;
	let title = content.title.replace("\r\n","");
	addStyle(content.css[0]);
	$('#content').empty();
	
	$('#content').append(content.body);
	$('#content').append('<input type="button" onclick="showlist()" value="返回上一页">');
	$('#list').hide();
	$('#content').show();
}

function addStyle(stylePath) {
    var container = document.getElementsByTagName("head")[0];
    var addStyle = document.createElement("link");
    addStyle.rel = "stylesheet";
    addStyle.type = "text/css";
    addStyle.media = "screen";
    addStyle.href = stylePath;
    container.appendChild(addStyle);
}

function showlist(){
	$('#list').show();
	$('#content').hide();
}