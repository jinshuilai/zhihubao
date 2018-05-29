const {app,BrowserWindow} = require('electron');

let mainWindow = null;

app.on('window-all-closed',function(){
	if(process.platform != 'darwin'){
		app.quit();
	}
});

app.on('ready',function(){
	mainWindow = new BrowserWindow({title:'知乎日报',autoHideMenuBar:true});
	mainWindow.loadURL('file://'+__dirname+'/index.html');
	//mainWindow.openDevTools();

	mainWindow.on('closed',function(){
		mainWindow = null;
	});
});