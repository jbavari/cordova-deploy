var shell = require('shelljs');

function formTestflightCurlCommand(apiToken, teamToken, apiPath, dsymPath, notes, distributionLists) {
  var deployCurlCommand = 'curl http://testflightapp.com/api/builds.json \
    -F file=@' + apiPath +
    // ' -F dsym=@' + dsymPath +
    ' -F api_token="' + apiToken + '" \
     -F team_token="' + teamToken +'" \
     -F notes="' + notes + '" \
     -F notify=True \
     -F distribution_lists="' + distributionLists + '"';

  // console.log('Deploy curl command => ' + deployCurlCommand);

  return deployCurlCommand;
}

function deployIos(apiToken, teamToken, apiPath, dsymPath, notes, distributionLists) {
  var curlCommand = formTestflightCurlCommand(apiToken, teamToken, apiPath, dsymPath, notes, distributionLists);

  console.log('Uploading iOS to TestFlight'.yellow.bold);
  var result = shell.exec(curlCommand);
  console.log('Upload iOS to TestFlight completed'.green);
  // console.log('Result: ' + result);
  return result;
}

module.exports = { deployIos: deployIos };