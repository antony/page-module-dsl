'use strict'

const expect = require('code').expect
const assert = require('hoek').assert

class MagicPage {
  constructor () {
    var contents = Object.keys(this.getContent())
    this.content = []
    contents.map((key) => {
      this.content.push(key)
      this[key] = this.getContent()[key]
    })
  }

  at () {
    for (var pageElement of this.content) {
      const element = this[pageElement]()
      assert(element.displayed, `Required element not present: ${element}`)
    }
  }

  find (selector) {
    return new Navigator(selector)
  }
}

class ObviousPage extends MagicPage {
  getContent () {
    return {
      button: () => { return this.find('#i-could-be-anything') }
    }
  }
}

class Navigator {
  constructor (selector) {
    this.element = selector
  }

  displayed () {
    return true
  }

  toString () {
    return `[HTMLElement(this.element)]`
  }
}

const page = new ObviousPage()

describe('Find elements', () => {
  it('Element is displayed', (done) => {
    expect(page.button().displayed()).to.equal(true)
    done()
  })
})
