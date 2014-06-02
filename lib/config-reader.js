// var q = require('q');
var fs = require('fs');
var path = require('path');
var config = null;
var hockeyConfig = null;
var testFlightConfig = null;


function readInConfigXml(appPath) {

}

//Read in from the specified path for the HockeyApp configuration.
//If none supplied, try to read from the root path where executed 
//for hockey.json
function readHockeyConfig(configPath) {
	var filePath = null;
	if(typeof configPath == 'undefined' ) {
		filePath = path.join(process.cwd(), 'hockey.json');
	} else {
		filePath = configPath;
	}


	var config = {};
	try { config = require(filePath); } catch(ex) {}
	// console.log('config: ' + JSON.stringify(config));
	return config;
}

module.exports = { readHockeyConfig: readHockeyConfig };