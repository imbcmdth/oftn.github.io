module.exports = function(handlebars) {

	function makerLinker (links) {
		return function (match, capture) {
			var linkNum = parseFloat(match.slice(1));
			return "<a href=\"" + links[linkNum] + "\">" + capture + "</a>";
		}
	}

	handlebars.registerHelper('linkify_about', function(body, options) {
		if (options.data.index === 2) {
			var startTag = "<ul><li>";
			var endTag = "</li></ul>";
			var middleTag = "</li><li>";
		} else {
			var startTag = "<p>";
			var endTag = "</p>";
			var middleTag = endTag + startTag;
		}
		var out = startTag;
		var theTexts = body.text;
		var linker = makerLinker(body.links);

		if (!Array.isArray(theTexts)) theTexts = [body.text];

		for (var i = 0; i < theTexts.length; i++) {
			out += theTexts[i].replace(/\[\d\](.*?)\[\/\d\]/g, linker);

			if (i < theTexts.length - 1) {
				out += middleTag;
			}
		}

		out += endTag;

		return out;
	});

	handlebars.registerHelper('linkify', function(body, tag) {
		var startTag = "<"+tag+">";
		var endTag = "</"+tag+">";
		var middleTag = endTag + startTag;
		var out = startTag;
		var theTexts = body.text;
		var linker = makerLinker(body.links);

		if (!Array.isArray(theTexts)) theTexts = [body.text];

		for (var i = 0; i < theTexts.length; i++) {
			out += theTexts[i].replace(/\[\d\](.*?)\[\/\d\]/g, linker);

			if (i < theTexts.length - 1) {
				out += middleTag;
			}
		}

		out += endTag;

		return out;
	});
}