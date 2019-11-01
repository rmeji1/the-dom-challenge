'use strict;'

document.addEventListener('DOMContentLoaded', () => {
  const pauseCounterButton = document.querySelector('button#pause')
  const incrementCounterButton = document.getElementById('+')
  const decrementCounterButton = document.getElementById('-')
  const likeButton = document.getElementById('<3')
  const commentForm = document.querySelector('#comment-form')

  let counterViewInterval = setInterval(incrementCountBy, 1000, 1)

  pauseCounterButton.addEventListener('click', e => {
    counterViewInterval = toggleInterval(e, counterViewInterval)
    const buttons = [incrementCounterButton, decrementCounterButton, likeButton]
    toggleButtons(buttons)
    pauseCounterButton.innerText = pauseCounterButton.innerText === 'pause' ? 'resume' : 'pause'
  })

  incrementCounterButton.addEventListener('click', () => incrementCountBy(1))
  decrementCounterButton.addEventListener('click', () => incrementCountBy(-1))
  likeButton.addEventListener('click', () => likeNumber())
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    addCommentFrom(event.target)
  })
})

/* ------------------------------------------- helpers ------------------------------------------- */
function toggleButtons (buttons) {
  buttons.forEach((button) => {
    button.style.pointerEvents = button.style.pointerEvents === 'none' ? 'auto' : 'none'
  })
}

function incrementCountBy (amount) {
  const counterView = document.querySelector('h1#counter')
  const currentNumber = counterView.innerText
  counterView.innerText = parseInt(currentNumber) + amount
}

function toggleInterval (event, interval) {
  if (interval === undefined) {
    interval = setInterval(incrementCountBy, 1000, 1)
  } else {
    clearInterval(interval)
    interval = undefined
  }
  return interval
}

function likeNumber () {
  const counterView = document.querySelector('h1#counter')
  const currentNumber = counterView.innerText
  const ul = document.querySelector('ul.likes')
  appendCurrentNumberTo(ul, currentNumber)
}

function appendCurrentNumberTo (parentUL, number) {
  let li = document.querySelector(`#likes-for-${number}`)
  if (li === null) {
    li = createAndAppendElementWithCallback('li', parentUL, (element) => {
      element.id = `likes-for-${number}`
      element.dataset.counter = 0
    })
  }
  li.dataset.counter = parseInt(li.dataset.counter) + 1
  li.innerText = `${number} has been liked ${li.dataset.counter} time`
}

function addCommentFrom (form) {
  const text = form.comment.value
  form.comment.value = ''
  const commentDiv = document.querySelector('div#list')
  createAndAppendElementWithCallback('p', commentDiv, (element) => {
    element.innerText = text
  })
}

function createAndAppendElementWithCallback (tag, parent, callback) {
  const element = document.createElement(tag)
  parent.append(element)
  if (callback !== undefined) {
    callback(element)
  }
  return element
}

