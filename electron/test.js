const fs = require("fs");
const request = require("request");

function start(){
	let url = "https://zhihu-daily.leanapp.cn/api/v1/last-stories";

	request.get({url:url,gzip:true},function(err,res,body){
		parseJson(body);
	});
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
	request.get({url:surl,gzip:true},function(err,res,body){
		let json = JSON.parse(body);
		let content = json.CONTENTS;
		let title = content.title.replace("\r\n","");
		addStyle(content.css[0]);
		$('#content').html(content.body);
		$('#content').append('<input type="button" onclick="showlist()" value="返回上一页">');
		$('#list').hide();
		$('#content').show();
	});
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