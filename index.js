const fs = require('fs')
const schema = require('./options.json')
const utils = require('loader-utils')
const validateOptions = require('schema-utils')

/* eslint-disable require-jsdoc */
async function matchesToFile(path, resourcePath, matches) {
	const file = fs.readFileSync(path, 'utf8')
	let searchResults = {}
	try {
		searchResults = JSON.parse(file)
	} catch (err) {}
	searchResults[resourcePath] = matches
	fs.writeFileSync(path, JSON.stringify(searchResults, null, 2))
}

module.exports = function loader(src) {
	const options = utils.getOptions(this) || {}
	validateOptions(schema, options, 'Search Loader')

	const matchSet = new Set()
	while((match = options.regex.exec(src)) !== null) {
		matchSet.add(match[1])
	}
	const matches = [...matchSet]

	console.log(`\n${this.resourcePath}: [${matches}]`)
	if(matches.length > 0) {
		matchesToFile(options.output, this.resourcePath, matches)
	}

	return src
}
