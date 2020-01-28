const tokenParsers = {
  Title: function(token){
    return { class: 'heading'}
  },
  Author: function(token){
    return { class: 'author'}
  },
  InitiationDate: function(token){
    return { class: 'author'}
  },
  Date: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'date'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Done: function(token) {
    const innerElement = document.createElement('span')

    innerElement.className = 'done'
    innerElement.textContent = '✓'

    return innerElement
  },
  Image: function(token){

    let regex = new RegExp(/\[\((?<source>[^\]]+)\)\]/)
    let match = token.lexeme.match(regex)

    var image = new Image()
    image.height = 200
    image.src = match.groups.source

    return image
  },
  Comment: function(token){
    const innerElement = document.createElement('span')

    let regex = new RegExp(/\[(?<source>[^\]]+)\]/)
    let match = token.lexeme.match(regex)

    innerElement.className = 'sidenote'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Link: function(token){
    const innerElement = document.createElement('a')
    
    let regex = new RegExp(/\[\[(?<url>[^\]]+)\]\[(?<text>[^\]]+)\]\]/)

    let match = token.lexeme.match(regex)

    innerElement.setAttribute('href', match.groups.url)
    innerElement.innerHTML = match.groups.text
    innerElement.className = 'link'

    return innerElement
  },
  String: function(token){
    const innerElement = document.createElement('span')

    innerElement.textContent = token.lexeme

    return innerElement
  },
  Todo: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'todo'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Deadline: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'deadline'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Scheduled: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'scheduled'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Timestamp: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'timestamp'
    innerElement.textContent = token.lexeme.replace(/[\[|\]]/, '').replace(/[\[|\]]/, '')
    innerElement.class = 'datestamp'

    return innerElement
  },
  Duration: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'duration'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Underline: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'underline'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Strikethrough: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'strikethrough'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Bold: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'bold'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Italic: function(token){
    const innerElement = document.createElement('span')

    innerElement.className = 'italic'
    innerElement.textContent = token.lexeme

    return innerElement
  },
  Clock: function(token){
    return { class: 'clock'}
  },
  LogBook: function(token){
    return { class: 'clock'}
  },
  End: function(token){
    return { class: 'clock'}
  },
  EOF: function(token){
    return { class: 'end'}
  }
}

export function parseToDomElement(content){

  let element = document.createElement('div')
  element.style.marginLeft = '30px'

  let innerElement

  if (content.data.length > 0 && content.data[0].token_type === 'Asterisk') {
    const elementType = (content.data[0].lexeme.length + 1) > 4 ? 'h4' : `h${content.data[0].lexeme.length + 1}`
    innerElement = document.createElement(elementType)
  } else {
    innerElement = document.createElement(`div`)
  }

  content.data.forEach(token => {

    const space = document.createElement('span')
    space.textContent = ' '
    
    if (token.token_type === 'Asterisk') return

    let parsed = tokenParsers[token.token_type](token)

    if (parsed.class) {
      innerElement.className = parsed.class
    }
    if (parsed instanceof HTMLElement) {
      innerElement.appendChild(parsed)
      innerElement.appendChild(space)  
    }

  })

  element.appendChild(innerElement)

  Object.values(content.children).forEach(node => {
    element.appendChild(parseToDomElement(node))
  })

  return element
}