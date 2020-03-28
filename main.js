const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require('fs');

createWindow = () => {
  const window = new BrowserWindow(
    {
      width: 1200,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true
      }
    }
  );
  window.loadURL(`file://${__dirname}/renderer/index.html`);

  ipcMain.handle('save-note-to-file', (event, note) => {
    const content = `Source: ${note.source} | Meaning: ${note.meaning}\n`;
    fs.appendFileSync('./notes.txt', content);
    return true;
  });
}

app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  ipcMain.removeAllListeners('save-note-to-file');

  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
