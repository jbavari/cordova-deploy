var execSync = require('execSync');

function formHockeyAppCurlCommand(buildPath, dsymPath) {
  var iosBuild = typeof dsymPath != 'undefined';
  var selected_app_id = iosBuild ? hockeyAppSettings.ios_app_id : hockeyAppSettings.android_app_id;

  var deployCurlCommand = 'curl \
    -F "status=2" \
    -F "notify=1" \
    -F "notes=Some new features and fixed bugs." \
    -F "notes_type=0" \
    -F "ipa=@' + buildPath + '" ';

  if(iosBuild) {
    deployCurlCommand += '-F "-dsym=' + dsymPath + '" ';
  }

    deployCurlCommand += '-H "X-HockeyAppToken: ' + hockeyAppSettings.api_key + '" \
      https://rink.hockeyapp.net/api/2/apps/' +  selected_app_id +'/app_versions/upload';
  var platform = iosBuild ? 'ios' : 'android';
  // console.log('Curl command for ' + platform + ' => ' + deployCurlCommand);

  return deployCurlCommand;
}

function deployAndroidBuild(apiKey, apkFileLocation, androidAppId) {
  console.log('Building android'.yellow.bold);
  execSync.exec('cordova build android');
  console.log('Android Build Complete'.green);

  // console.log('Deploying Android to Dropbox'.yellow.bold);
  // execSync.exec('cp platforms/android/ant-build/RaiseMore-debug.apk deploy/AndroidBuilds/');
  // console.log('Deployed Android to Dropbox'.green);
  // console.log('Building iOS'.yellow.bold);
  // execSync.exec('cd platforms/ios');
  // execSync.exec('ipa build');
  // console.log('iOS Build Complete'.green);

  var deployAndroidCurlCommand = formHockeyAppCurlCommand('./platforms/android/ant-build/RaiseMore-debug.apk');
  // var deployIosCurlCommand = formHockeyAppCurlCommand('./platforms/ios/RaiseMore.ipa', './platforms/ios/RaiseMore.app.dSYM.zip');

  // console.log('Deploy: ' + deployAndroidCurlCommand);
  // console.log('Deploy: ' + deployIosCurlCommand);
  console.log('Deploying Android to HockeyApp'.yellow.bold);
  execSync.exec(deployAndroidCurlCommand);
  console.log('Deployed Android to HockeyApp'.green);

  // console.log('Deploying iOS to HockeyApp'.yellow.bold);
  // execSync.exec(deployIosCurlCommand);
  // console.log('Deployed iOS to HockeyApp'.green);

}

function deployIosBuild(apiKey, ipaFileLocation, dsymFileLocation, iosAppId) {
  console.log('Building iOS'.yellow.bold);
  execSync.exec('cd platforms/ios');
  execSync.exec('ipa build');
  console.log('iOS Build Complete'.green);

  var deployIosCurlCommand = formHockeyAppCurlCommand('./platforms/ios/RaiseMore.ipa', './platforms/ios/RaiseMore.app.dSYM.zip');
  
  console.log('Deploying iOS to HockeyApp'.yellow.bold);
  execSync.exec(deployIosCurlCommand);
  console.log('Deployed iOS to HockeyApp'.green);
}

module.exports = { deployAndroidBuild: deployAndroidBuild, deployIosBuild; deployIosBuild };