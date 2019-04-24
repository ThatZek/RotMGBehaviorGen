'use strict'

const Store = require('electron-store')

class DataStore extends Store {
  constructor (settings) {
    super(settings)

    // initialize with todos or empty array
    this.formData = this.get('formData') || []
  }

  saveForm () {
    // save todos to JSON file
    this.set('formData', this.formData)

    // returning 'this' allows method chaining
    return this
  }

  getForm () {
    // set object's todos to todos in JSON file
    this.formData = this.get('formData') || []

    return this
  }

  addState (state) {
    // merge the existing todos with the new todo
    this.formData = [ ...this.formData, state ]

    return this.saveForm()
  }

  addBehav (behavior) {
    // merge the existing todos with the new todo
    this.formData = { ...this.formData, behavior }

    return this.saveForm()
  }

  delState (state) {
    // filter out the target todo
    this.formData = this.formData.filter(t => t !== state)

    return this.saveForm()
  }
}

module.exports = DataStore
