const { template } = require('./menu.ts');
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const packageJson = require('../package.json');


let win;

function isDev() {
    return process.argv[2] == '--dev';
}

function createWindow() {
  win = new BrowserWindow({ width: 1920, height: 1080 });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(startUrl);

  win.on('closed', () => {
    win = null;
  });

  if (isDev()) {
      win.webContents.openDevTools()
  }
}

app.setName("MustardStudio");
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('ready', createWindow);
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
