/* ImBcmClean - The worlds shittiest clean system!
	- Reads templates (*.hbs) from `templatePath`
	- Deletes pages (*.html) in `outputPath` with the same base file name as the template
*/

var fs = require("fs");
var path = require("path");

var templatePath = '../templates/';
var outputPath = '../site/';

// Yes it is _all_ synchronous.
// We have a one page site.
// Why needlessly complicate things?

var fileList = fs.readdirSync(path.join(__dirname, templatePath));

fileList.forEach(function (filename) {
	var templateFilename = path.join(__dirname, templatePath, filename);

	var stats = fs.statSync(templateFilename);
	if (stats.isDirectory()) return;

	var baseFilename = path.basename(filename, path.extname(filename));
	var outputFilename = path.join(__dirname, outputPath, baseFilename + '.html');

	fs.unlinkSync(outputFilename);
	console.log("Deleted -", outputFilename);
});
