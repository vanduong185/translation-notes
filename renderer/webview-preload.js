const { ipcRenderer } = require('electron');

ipcRenderer.on('get-translation', () => {
  const source = window.document.getElementById('source').value;
  const meaning = document.querySelectorAll('span.translation')[0].firstChild.textContent;
  ipcRenderer.sendToHost('return-translation', {source, meaning});
});
