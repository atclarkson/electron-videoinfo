const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron // <-- made for free for us

let mainWindow

/* 
 Thing we're listening too
 |
 |       Event we're listening for  
 |       |      
 |       |        Function to run when event occurs
 |       |        |
 V       V        V    */
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: false, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote },
    },
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send('video:metadata', metadata.format.duration)
  })
})
