var execSync = require('child_process').execSync;

function formHockeyAppCurlCommand(apiKey, appId, buildPath, dsymPath, deployData) {
  var iosBuild = typeof dsymPath != 'undefined';

  var deployCurlCommand = 'curl \
    -F "status=2" \
    -F "notify='+ deployData.notify + '" \
    -F "notes=' + deployData.notes + '" \
    -F "notes_type=0" \
    -F "ipa=@' + buildPath + '" ';

  if(iosBuild) {
    deployCurlCommand += '-F "-dsym=' + dsymPath + '" ';
  }

  deployCurlCommand += '-H "X-HockeyAppToken: ' + apiKey + '" \
    https://rink.hockeyapp.net/api/2/apps/' +  appId +'/app_versions/upload';

  return deployCurlCommand;
}

function deployAndroidBuild(apiKey, apkFileLocation, androidAppId, deployData) {
  var deployAndroidCurlCommand = formHockeyAppCurlCommand(apiKey, androidAppId, apkFileLocation, deployData);

  console.log('Deploying Android to HockeyApp'.yellow.bold);
  execSync(deployAndroidCurlCommand);
  console.log('Deployed Android to HockeyApp'.green);
}

function deployIosBuild(apiKey, ipaFileLocation, dsymFileLocation, iosAppId, deployConfig) {
  console.log('Building iOS'.yellow.bold);
  console.log('iOS Build Complete'.green);

  var deployIosCurlCommand = formHockeyAppCurlCommand(apiKey, iosAppId, ipaFileLocation, dsymFileLocation, deployData);

  console.log('Deploying iOS to HockeyApp'.yellow.bold);
  execSync(deployIosCurlCommand);
  console.log('Deployed iOS to HockeyApp'.green);
}

module.exports = { deployAndroidBuild: deployAndroidBuild, deployIosBuild: deployIosBuild };
