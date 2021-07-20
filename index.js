const electron = require('electron')

const { app, BrowserWindow, ipcMain } = electron // <-- made for free for us

/* 
 Thing we're listening too
 |
 |       Event we're listening for  
 |       |      
 |       |        Function to run when event occurs
 |       |        |
 V       V        V    */
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: false, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote },
    },
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('video:submit', (path) => {})
