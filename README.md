cordova-deploy
==============

Command line tools to help deploy your Cordova application to your users.

Installation
============
npm install -g cordova-deploy

Application Config
============
Ensure you have your Cordova config.xml file in the same directory where you run the `cordova-deploy` command.

Building &amp; Deploying to HockeyApp
===========
First ensure you have a HockeyApp account with an active App ID (one for each platform, android/iOS) and an active API Key.

You can specify the api key, ios app id, and android app id from the command line with their proper parameters. 

To build and deploy the cordova iOS application to HockeyApp, run the following command in your shell with the following parameters:
`cordova-deploy --build --ios --hockey --apikey some_api_key --iosid some_ios_app_id`

There is a second option, in the root level of your project, add a file named hockey.json that looks something like this:

``` json
{
	"api_key": "some_api_key",
	"android_app_id": "some_android_app_id",
	"ios_app_id": "some_ios_app_id"
}
```

NOTE: you may want to add the hockey.json file to your .gitignore as to avoid making it public.

Then your command to build and deploy looks more like this:

`cordova-deploy --build --ios --hockey`



Enjoy!