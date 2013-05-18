/* ImBcmBuilt - The worlds shittiest build system!
	- Reads templates (*.hbs) from `templatePath`
	- Reads data (*.json) from `dataPath` with the same base file name as the template
	- Builds html output (doing small fixups on the source)
	- Saves page (*.html) to `outputPath` with the same base file name as the template
*/

var fs = require("fs");
var path = require("path");
var handlebars = require("handlebars");

// TODO: Add all helpers automatically
require("./helpers/linkify.js")(handlebars);

var templatePath = '../templates/';
var dataPath = '../data/';
var outputPath = '../site/';

// Yes it is _all_ synchronous.
// We have a one page site.
// Why needlessly complicate things?

var fileList = fs.readdirSync(path.join(__dirname, templatePath));

fileList.forEach(function (filename) {
	var baseFilename = path.basename(filename, path.extname(filename));
	var templateFilename = path.join(__dirname, templatePath, filename);
	var dataFilename = path.join(__dirname, dataPath, baseFilename + '.json');
	var outputFilename = path.join(__dirname, outputPath, baseFilename + '.html');

	var stats = fs.statSync(templateFilename);
	if (stats.isDirectory()) return;

	var template = fs.readFileSync(templateFilename, "utf8");
	var source = fs.readFileSync(dataFilename, "utf8");
	var sourceJSON = JSON.parse(source);

	var pageBuilder = handlebars.compile(template);
	var pageText = pageBuilder(sourceJSON);

	// TODO: Maybe some sort of page-specific fixup.. when we have more than one page

	// Only fixup oftn text inside the body
	var bodyIndex = pageText.match(/<body(.*?)>/i).index;
	pageText = pageText.replace(/(ΩF:∅)/g, function (match, capture, offset) {
		if (offset > bodyIndex) {
			return '<span class="oftn">' + capture + '</span>';
		}
		return capture;
	});

	fs.writeFileSync(outputFilename, pageText, 'utf8');
	console.log("Built -", outputFilename);
});
