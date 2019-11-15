/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

var fs = require('fs');
var await = require('await');
const util = require('util');
const jq = require('node-jq');
var fs = require('fs');
const homedir = require('os').homedir(); 
const eol = require('os').EOL; 

//Setting up the program
var configInfo;
var usernameS;
var passwordS;
//Config info is at ~/.gitHubExtract.config
var data = fs.readFileSync(homedir + '/.gitHubExtract.config','utf8')
var fileAsString = data.toString();
configInfo = fileAsString.split("\n");
usernameS=configInfo[0].split("=")[1];
passwordS=configInfo[1].split("=")[1];

const Octokit = require('@octokit/rest')

const octokit = new Octokit({
 auth: {
   username: usernameS,
   password: passwordS,
 }
})
 
// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
octokit.repos.list().then(({ data }) => {
  // handle data
  console.log(data);
})

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('push', async context => {
    // Code was pushed to the repo, what should we do with it?
    app.log(context.github.repos.list().then(({ data }) => {
  // handle data
  console.log(data);
}))
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}


