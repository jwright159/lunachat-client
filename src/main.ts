import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug)
	app.commandLine.appendSwitch('ignore-certificate-errors');

const createWindow = async () => {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
	});

	mainWindow.loadFile(path.join(__dirname, 'index.html'));

	if (isDebug)
		mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
