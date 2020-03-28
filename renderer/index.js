const $ = require('jquery');
const { ipcRenderer } = require('electron');

const url = 'https://translate.google.com';
const ggTrans = window.document.getElementById('google-translate');
const webview = window.document.createElement('webview');

initWebview = () => {
  webview.setAttribute('id', 'google-translate-webview');
  webview.setAttribute('plugins', 'true');
  webview.setAttribute('autosize', 'on');
  webview.setAttribute(
    'preload',
    `${__dirname}/webview-preload`,
  );
  webview.setAttribute('src', url);
  ggTrans.appendChild(webview);

  webview.addEventListener('ipc-message', (event) => {
    if (event.channel == 'return-translation') {
      const note = event.args[0];
      addNote(note);
      ipcRenderer.invoke('save-note-to-file', note).then((value) => {
        if (value === true) {
          alert('Saved to file');
        } 
      });
    }
  });
}

initWebview();

$('#save-btn').on('click', () => {
  webview.getWebContents().send('get-translation');
});

addNote = (note) => {
  const table = window.document.getElementById('history-table');
  const row = table.insertRow(1);
  const cell0 = row.insertCell(0);
  const cell1 = row.insertCell(1);
  cell0.innerHTML = note.source;
  cell1.innerHTML = note.meaning;
}