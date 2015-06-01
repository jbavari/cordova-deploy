var shell = require('shelljs');

function formHockeyAppCurlCommand(apiKey, appId, buildPath, dsymPath) {
  var iosBuild = typeof dsymPath != 'undefined';

  var deployCurlCommand = 'curl \
    -F "status=2" \
    -F "notify=1" \
    -F "notes=Some new features and fixed bugs." \
    -F "notes_type=0" \
    -F "ipa=@' + buildPath + '" ';

  if(iosBuild) {
    deployCurlCommand += '-F "-dsym=' + dsymPath + '" ';
  }

    deployCurlCommand += '-H "X-HockeyAppToken: ' + apiKey + '" \
      https://rink.hockeyapp.net/api/2/apps/' +  appId +'/app_versions/upload';
  // var platform = iosBuild ? 'ios' : 'android';
  // console.log('Curl command => ' + deployCurlCommand);

  return deployCurlCommand;
}

function deployAndroidBuild(apiKey, apkFileLocation, androidAppId) {
  // console.log('Building android'.yellow.bold);
  // shell.exec('cordova build android');
  // console.log('Android Build Complete'.green);

  var deployAndroidCurlCommand = formHockeyAppCurlCommand(apiKey, androidAppId, apkFileLocation);

  console.log('Deploying Android to HockeyApp'.yellow.bold);
  shell.exec(deployAndroidCurlCommand);
  console.log('Deployed Android to HockeyApp'.green);
}

function deployIosBuild(apiKey, ipaFileLocation, dsymFileLocation, iosAppId) {
  console.log('Building iOS'.yellow.bold);
  shell.exec('cd platforms/ios');
  shell.exec('ipa build');
  console.log('iOS Build Complete'.green);

  var deployIosCurlCommand = formHockeyAppCurlCommand(apiKey, iosAppId, ipaFileLocation, dsymFileLocation);

  console.log('Deploying iOS to HockeyApp'.yellow.bold);
  shell.exec(deployIosCurlCommand);
  console.log('Deployed iOS to HockeyApp'.green);
}

module.exports = { deployAndroidBuild: deployAndroidBuild, deployIosBuild: deployIosBuild };