import { parseToDomElement } from './parser.js'
import { addStats } from './stats.js'

export function addToggleView(headers) {
  headers.forEach(node => {
    const childNodes = node.parentNode.childNodes

    if(node.parentNode.parentNode.className === 'tree'){
      childNodes.forEach((ele, i) => i > 0 ? ele.style.display = 'none' : null)
    }

    node.addEventListener("click", () => {
      childNodes.forEach((childNode, i) => {
        if (i !== 0) {
          if (childNode.style.display === 'none') {
            childNode.style.display = 'block'
          } else {
            childNode.style.display = 'none'
          }
        }
      })
    })
  })
}

export function addSubButtonEvents(buttons, parsedBranches, result){
  for (let subButton of buttons) {
    subButton.addEventListener("click", () => {

      for (let subBut of document.querySelector("#subbuttons").children) {
          subBut.classList.remove("active")
      }

      subButton.className = 'active'

      const node = document.getElementById("org")
      while (node.firstChild) {
        node.removeChild(node.firstChild)
      }

      const active = document.querySelector(".active")

      if (parsedBranches[subButton.value]) {
        node.appendChild(parsedBranches[subButton.value])
      } else {
        const dom = parseToDomElement(result.children[active.value].children[subButton.value], 0)

        dom.className = "tree"

        parsedBranches[subButton.value] = dom

        subButton.blur()

        node.appendChild(dom)

        const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
        addToggleView(headers)

        const h3ss = document.querySelectorAll('h3')
        addStats(h3ss)

      }
      
    })
  }
}