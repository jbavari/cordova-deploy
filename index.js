/**
 * Module dependencies.
 */

var program = require('commander');
var builder = require('./lib/builder');
var hockeyAppDeploys = require('./lib/hockey-deploy');
var colors = require('colors');
var basedir = process.cwd();

program
  .version('0.0.2')
  .option('-b, --build', 'Build Applications (Requires Android or iOS Flag)')
  .option('-a, --android', 'Deploy Android (Requires APK File Location)')
  .option('-i, --ios', 'Deploy iOS (Requires iOS IPA and iOS dSYM File Locations)')
  .option('-h, --hockey', 'Deploy to HockeyApp (Requires HockeyApp API Key and HockeyApp App ID\'s)')
  .option('-p, --ipa <path>', 'iOS IPA File Location')
  .option('-y, --dsym <path>', 'iOS dSYM File Location')
  .option('-j, --apk <path>', 'Andoid APK File Location')
  .option('-k, --apikey <key>', 'HockeyApp API Key')
  .option('-d, --andid <id>', 'HockeyApp Android App ID')
  .option('-s, --iosid <id>', 'HockeyApp iOS App ID')
  .option('-n, --name <id>', 'Cordova App Name')
  // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('progam name: ' + program.name);

// if (program.android) console.log('  - Android');
// if (program.ios) console.log('  - iOS');
var somethingToBuild = typeof program.android != 'undefined' || typeof program.ios != 'undefined';
console.log('progam name: ' + program.name);

if(!somethingToBuild) {
	console.log('cordova-deploy - You have not chosen anything to build or deploy a platform. Aborting'.red.bold);
	return;
}


if(program.build) {
	if(program.ios) {
		console.log('Building iOS');
		builder.buildIos(program.name);
	}
}

if(program.hockey){
	if(program.android && (typeof program.andid == 'undefined' || typeof program.apikey == 'undefined')) {
		console.log('Cannot Deploy Android - You must supply both the HockeyApp API Key and the HockeyApp Android App ID.')
	} else {
		hockeyAppDeploys.deployAndroidBuild(program.apikey, program.andid, program.apk);
	}

	if(program.ios && (typeof program.apikey == 'undefined' || typeof program.iosid)) {
		console.log('Cannot Deploy iOS - You must supply both the HockeyApp API Key and the HockeyApp iOS App ID')
	} else {
		hockeyAppDeploys.deployIosBuild(program.apikey, program.ipa, program.dsym, program.iosid)
	}
}
