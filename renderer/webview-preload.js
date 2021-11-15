const { ipcRenderer } = require('electron');

ipcRenderer.on('get-translation', () => {
  const source = document.querySelector('.vJwDU').textContent;
  const meaning = document.querySelector('span.ChMk0b').firstChild.textContent;
  ipcRenderer.sendToHost('return-translation', {source, meaning});
});
