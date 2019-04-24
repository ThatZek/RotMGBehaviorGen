'use strict'

const { ipcRenderer, BrowserWindow } = require('electron')

document.getElementById('behavForm').addEventListener('submit', (evt) => {
  // prevent default refresh functionality of forms
  evt.preventDefault()

  // input on the form
  const input = evt.target[0]

  // send todo to main process
  ipcRenderer.send('add-behavior', input.value)

  // reset input
  input.value = ''
})
