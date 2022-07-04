
let halukaSass = require('../').default

test('compile sass', () => {
    halukaSass({
        source: __dirname + '/source',
        dest: __dirname + '/build',
        minify: true,
        suffix: '.min',
        minifyOpts: {}
    })
})