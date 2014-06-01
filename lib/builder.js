var execSync = require('execSync');
var pwd = process.cwd();
var path = require('path');

function buildIos(appName) {
	console.log('PWD: ' + pwd);
	// process.chdir('platforms/ios');
	// console.log('PWD: ' + process.cwd());

	// var buildCommand = 'xcodebuild -scheme ' + appName + ' -configuration Release';
	console.log('Building iOS');
	var buildCommand = 'cordova build ios --release --device';
	console.log(buildCommand);
	var execResult = execSync.exec(buildCommand);
	console.log('Build for iOS completed');
	var appPath = path.join(process.cwd(), 'platforms', 'ios', 'build', 'device', appName + '.app');
	return appPath;
}

function buildIpa(appName) {
	var objPath = path.join(process.cwd(), 'platforms', 'ios', 'build', 'device');
	console.log('path: ' + objPath);

	var bundleCommand = 'xcrun -sdk iphoneos PackageApplication -v ' + objPath + '/' + appName + '.app -o ' + objPath + '/' + appName + '.ipa';

	// console.log('bundle command: ' + bundleCommand);
	console.log('Bundling iOS .ipa File');
	var execResult = execSync.exec(bundleCommand);
	console.log('Bundling iOS .ipa file completed');
	var ipaPath = path.join(objPath, appName + '.ipa');
	return ipaPath;
}

function buildAndroid(appName) {
	var buildCommand = 'cordova build android';
	console.log(buildCommand);
	// execSync.exec(buildCommand);
	runCommand(buildCommand);
	console.log('Build for Android completed');
	return 'android';
}

module.exports = { buildIos: buildIos, buildIpa: buildIpa, buildAndroid: buildAndroid };