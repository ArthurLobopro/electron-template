import { app, BrowserWindow } from 'electron'
import path from 'node:path'

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('public/index.html')

    win.once('ready-to-show', () => {
        win.show()
        win.center()
        win.focus()
    })

}

const isUnicWindow = app.requestSingleInstanceLock()

if (!isUnicWindow) {
    app.quit()
} else {
    app.whenReady().then(createWindow)
}

app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (win.isMinimized()) win.restore()
    win.center()
    win.focus()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Faz com que o programa não inicie várias vezes durante a instalação
// if (require('electron-squirrel-startup')) {
//     app.quit()
// }