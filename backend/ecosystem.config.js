module.exports = {
  apps : [{
    script: './bin/www',
    watch: '.'
  }],

  deploy : {
    production : {
      user : process.env.SSH_USERNAME,
      host : process.env.SSH_HOSTMACHINE,
      ref  : 'origin/master',
      repo : process.env.GIT_REPOSITORY,
      path : process.env.DESTINATION_PATH,
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
