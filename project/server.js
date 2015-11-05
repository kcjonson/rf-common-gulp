
require.extensions[".css"] = function(module, filename) {
	module._compile("module.exports = null", filename);
};

require.extensions[".less"] = function(module, filename) {
	module._compile("module.exports = null", filename);
};



var http = require('http')
var express = require('express');
var fs = require('fs');
var React = require('react');
var ReactDOMServer = require('react-dom/server')
var Base = require('./target/components/Base')


// Create Express App
var app = express();
app.use("/", express.static(__dirname + "/target-public/"));



/*
* Load Initial State for UI
* In the real world, this would be ... data.
*/
var initialState = {
	user: 'Kevin'
};



var templateString = fs.readFileSync('./target-public/Base.html', "utf8");
var baseMarkup = ReactDOMServer.renderToString(React.createElement(Base, {user: initialState.user}));
var pageString = insertString(templateString, 'id="react-app">', baseMarkup);
pageString = insertString(pageString, 'id="initial-state">', JSON.stringify(initialState));


/*
* Handle Requests
*/

app.get("/", function(req, res) {
	res.send(pageString);
});

app.get("/api/base", function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(initialState));
});



// Fire it up (start our server)
var server = http.createServer(app).listen(9090, function() {
  console.log('Express server listening on port ' + 9090);
});




/*
* Utilities
*/

function insertString(sourceStr, search, insertStr) {
	var insertIndex = sourceStr.search(search) + search.length;
	var sourceStart = sourceStr.substr(0, insertIndex);
	var sourceEnd = sourceStr.substr(insertIndex);
	return sourceStart + insertStr + sourceEnd;
}