const pipe = (...args) => Array.from(args).join('\n')

const text = t => t

const h1 = t => `# ${t}`
const h2 = t => `## ${t}`
const h3 = t => `### ${t}`
const h4 = t => `#### ${t}`

const quote = t => `> ${t}`

const bold = t => `**${t}**`

const green = t => `<font color="info">${t}</font>`

const red = t => `<font color="warning">${t}</font>`

const grey = t => `<font color="comment">${t}</font>`

const link = (desc, href) => `[${desc}](${href})`

const code = t => '`' + t + '`'

exports.pipe = pipe
exports.text = text
exports.h1 = h1
exports.h2 = h2
exports.h3 = h3
exports.h4 = h4
exports.quote = quote
exports.bold = bold
exports.green = green
exports.red = red
exports.grey = grey
exports.link = link
exports.code = code