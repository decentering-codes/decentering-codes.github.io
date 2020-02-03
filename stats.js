export function addStats(hTags) {
  hTags.forEach(header => {
    const stamps = header.parentElement.querySelectorAll(".datestamp")

    let totalMinutes = 0
    let maxMinutes = 0
    let entries = 0
    const data = {}

    stamps.forEach(stamp => {
      const timestamp = stamp.querySelectorAll(".timestamp")
      let logEnd
      if (timestamp.length > 1) {
        logEnd = timestamp[1].textContent


        const regex = new RegExp(/^(<[\d]{4})-([\d]{2})-([\d]{2}).+/)
      
        const [, year, month, day] = logEnd.match(regex)

        const duration = stamp.querySelector(".duration").textContent
        const [hours, minutes] = duration.split(':')

        const logMinutes = parseInt(minutes) + parseInt(hours) * 60
        entries++

        if (logMinutes > maxMinutes) {
          maxMinutes = logMinutes
        }

        if (data[year]) {
          if (data[year][month]) {
            data[year][month][day] = logMinutes
          } else {

            const entry = { 
             [day]: logMinutes
            }

            data[year][month] = entry

          }
        } else {

          const entry = {
            [month]: {
             [day]: logMinutes
            }
          }

          data[year] = entry
        }

        data[year]

        totalMinutes = totalMinutes + logMinutes
      }


    })

    if (Object.entries(data).length !== 0 && data.constructor === Object) {

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      const svgHeight = 25
      let svgWidth = 0
      let entryCount = 1
      const transform = svgHeight / maxMinutes

      for (let [year, months] of Object.entries(data)) {
        for (let [month, days] of Object.entries(months)) {
          for (let [day, duration] of Object.entries(days)) {
            var line = document.createElementNS('http://www.w3.org/2000/svg','line')
            line.setAttribute('y2',`${svgHeight}`)
            line.setAttribute('x1',`${entryCount * 6}`)
            line.setAttribute('y1',`${svgHeight - parseInt(duration * transform)}`)
            line.setAttribute('x2',`${entryCount * 6}`)
            line.setAttribute("stroke", "black")
            line.setAttribute("stroke-width", "2px")
            line.setAttribute("stroke", "#cb4154")
            svg.append(line)

            svgWidth = svgWidth + 7
            entryCount++
          }
        }
      }

      svg.setAttribute("width", `${svgWidth + 4}`)
      svg.setAttribute("height", `${svgHeight}`)
      header.appendChild(svg)

      const durationTag = document.createElement('span')

      durationTag.className = 'duration'
      durationTag.style.fontSize = '16px'
      durationTag.textContent = `${totalMinutes} minutes`

      header.appendChild(durationTag)
    }
  })
}