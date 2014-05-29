/**
 * Module dependencies.
 */

var program = require('commander');
var hockeyAppDeploys = require('./lib/hockey-deploy');
var colors = require('colors');

console.log(hockeyAppDeploys);
hockeyAppDeploys.deployAndroidBuild();

program
  .version('0.0.1')
  .option('-a, --android', 'Build Android')
  .option('-i, --ios', 'Build iOS')
  .option('-h, --hockey', 'Deploy to HockeyApp')
  .option('-p, --ipa', 'iOS IPA Location')
  .option('-j, --apk', 'Andoid APK Location')
  .option('-k, --apikey', 'HockeyApp API Key')
  .option('-d, --andid', 'HockeyApp Android App ID')
  .option('-s, --iosid', 'HockeyApp iOS App ID')
  // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('You chose to build: ');
if (program.android) console.log('  - Android');
if (program.ios) console.log('  - iOS');


if(program.hockey) {
	if(program.android && (typeof program.andid == 'undefined' || typeof program.apikey == 'undefined')) {
		console.log('Cannot Deploy Android - You must supply both the API Key and the Android App ID.')
	} else {
		deployHockeyAppToAndroid(program.apikey, program.andid, program.apk);
	}
}