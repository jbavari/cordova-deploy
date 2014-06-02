var fs = require('fs');
var et = require('elementtree');
var path = require('path');
var config = null;
var hockeyConfig = null;
var testFlightConfig = null;

function readCordovaConfig() {
	var configPath = process.cwd() + '/config.xml';

	var configFileContents = fs.readFileSync(configPath, 'utf-8');
	if(configFileContents) {
        configFileContents = configFileContents.substring(configFileContents.indexOf("<")); //Windows is the BOM
    }

	var etree = new et.ElementTree(et.XML(configFileContents));
	var name = etree.find('name');
	name = name && name.text && name.text.trim();

	return name;
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


	var config = null;
	try { config = require(filePath); } catch(ex) {}
	// console.log('config: ' + JSON.stringify(config));
	return config;
}

function readTestFlightConfig() {
	var config = null;
	var filePath = null;
	filePath = path.join(process.cwd(), 'testflight.json');

	try { config = require(filePath); } catch(ex) {}
	return config;
}

module.exports = { readHockeyConfig: readHockeyConfig, readCordovaConfig: readCordovaConfig, readTestFlightConfig: readTestFlightConfig };