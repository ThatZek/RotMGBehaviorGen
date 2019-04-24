'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')

const Window = require('./Window')
const DataStore = require('./DataStore')

require('electron-reload')(__dirname)
// create a new todo store name "Todos Main"
const formData = new DataStore({ name: 'formData' })

function main () {
  // todo list window
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html')
  })

  let addStateWin
  let addBehavWin

  // TODO: put these events into their own file

  // initialize with todos
  mainWindow.once('show', () => {
    mainWindow.webContents.send('formData', formData.todos)
  })


  ipcMain.on('add-state-window', () => {
    if (!addStateWin) {
      addStateWin = new Window({
        file: path.join('renderer', 'addState.html'),
        width: 250,
        height: 180,
        parent: mainWindow
      })
      addStateWin.on('closed', () => {
        addStateWin = null
      })
    }
  })

  ipcMain.on('add-behavior-window', () => {
    if (!addBehavWin) {
      addBehavWin = new Window({
        file: path.join('renderer', 'addBehavior.html'),
        width: 300,
        height: 180,
        parent: mainWindow
      })
      addBehavWin.on('closed', () => {
        addBehavWin = null
      })
    }
  })

  ipcMain.on('add-behavior', (event, behav) => {
    const updatedForm = formData.addBehav(behav).todos

    mainWindow.send('todos', updatedTodos)
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
