var execSync = require('child_process').execSync;
var pwd = process.cwd();
var path = require('path');

function buildIos(appName) {
	// process.chdir('platforms/ios');
	// console.log('PWD: ' + process.cwd());

	// var buildCommand = 'xcodebuild -scheme ' + appName + ' -configuration Release';
	console.log('Building iOS');
	var buildCommand = 'cordova build ios --release --device';
	console.log(buildCommand);
	var execResult = execSync(buildCommand, {encoding: 'utf8'});
	console.log('Build for iOS completed');
	var appPath = '"' + path.join(process.cwd(), 'platforms', 'ios', 'build', 'device', appName + '.app') + '"';
	var dsymPath = '"' + path.join(process.cwd(), 'platforms', 'ios', 'build', 'device', appName + '.app.dSYM') + '"';
	return {app: appPath, dsym: dsymPath};
}

function buildIpa(appName) {
	var objPath = path.join(process.cwd(), 'platforms', 'ios', 'build', 'device');
	// console.log('path: ' + objPath);

	var bundleCommand = 'xcrun -sdk iphoneos PackageApplication -v "' + objPath + '/' + appName + '.app" -o "' + objPath + '/' + appName + '.ipa"';

	// console.log('bundle command: ' + bundleCommand);
	console.log('Bundling iOS .ipa File');
	var execResult = execSync(bundleCommand, {encoding: 'utf8'});
	console.log('Bundling iOS .ipa file completed');
	var ipaPath = path.join(objPath, appName + '.ipa');
	return ipaPath;
}

function buildAndroid(appName) {
	var buildCommand = 'cordova build android';
	console.log(buildCommand);
	execSync(buildCommand);
	console.log('Build for Android completed');
}

module.exports = { buildIos: buildIos, buildIpa: buildIpa, buildAndroid: buildAndroid };
