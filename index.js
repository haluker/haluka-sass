const fs = require('fs')
const path = require('path')
const sass = require('sass')
const CleanCSS = require('clean-css')

// opts structure: source, dest, minify, suffix
exports.default = function (opts) {
	if (!opts.source)
		throw 'Sass files source is required.'

	if (!opts.dest)
		throw 'Dest for compiled files is required.'
	
	if (!fs.statSync(opts.source))
		throw 'Source is not a folder'
	
	console.log('Begining Sass Compilation...')

	let output = {}
	fs.readdirSync(opts.source).forEach((file) => {
		console.log('Compiling ' + file)
		const result = sass.compile(path.join(opts.source, file))
		output[file] = result
	})

	// write to file
	for (let file in output) {
		let filename = path.parse(file).name + (opts.suffix || '') + '.css'
		let out = output[file].css
		if (opts.minify) out = new CleanCSS(opts.minifyOpts || {}).minify(out).styles;
		fs.writeFileSync(path.join(opts.dest, filename), out)
	}
	
}