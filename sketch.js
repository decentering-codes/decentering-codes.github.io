
const container = document.getElementById('footer')
const {height, width} = container.getBoundingClientRect()

const r = new Rune({
	framerate: 5,
	container: "#footer",
	width,
	height,
})

const paths = []


for (var y = 0; y < 5; y++) {
	paths.push(r.path(0, height / 10 + y * (height / 5)).curveTo(width*2, -y *(height / 5), width, height / 10 + y * (height / 5)).stroke(255, 255, 255).fill('none'))
}
paths.push(r.circle(width*0.75, height * 0.1, 30).stroke(false).fill(new Rune.Color("#f5f5f5")))
r.text('Jonathan Skjøtt', width * 0.02, height * 0.9).fontFamily('mononoki_bold').stroke(new Rune.Color("#f5f5f5")).fill(new Rune.Color("#f5f5f5"))
r.text('(*^^*)♡', width * 0.92, height * 0.9).fontFamily('mononoki_bold').stroke(new Rune.Color("#f5f5f5")).fill(new Rune.Color("#f5f5f5"))

r.on('update', function(mouse) {
	paths.forEach((path, i) => {
		if (path.state.y > height + 10) {
			path.move(0,-height,true)
		} else {
			path.move(0,1,true)
		}
	})
})

r.play()
