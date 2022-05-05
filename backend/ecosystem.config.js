module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.',
    name: 'API'
  }],

  deploy : {
    production : {
      'pre-deploy-local': 'mongod',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
