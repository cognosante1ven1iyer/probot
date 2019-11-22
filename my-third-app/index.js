/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */



module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('push', async context => {
    // Code was pushed to the repo, what should we do with it?
   // app.log(context.github.repos.list().then(({ data }) => {

  //console.log(data);
//}))
  context.log('Code was pushed to the repo, what should we do with it?');
 
  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  context.log(owner);
  context.log(repo);

  const contentsOfRepo = await context.github.repos.getContents({owner,repo,path: ''});
  context.log(contentsOfRepo);

  context.github.repos.createOrUpdateFile({owner,repo,path:'botFile.txt',message:'Got your recent push',content:'SSB3aWxsIGJlIGJhYWsgLSBwcm9ib3Q='});

  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}


