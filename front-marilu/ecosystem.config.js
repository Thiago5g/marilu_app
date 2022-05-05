module.exports = {
    apps : [{
      script: 'server.js',
      watch: '.',
      name: 'APP'
    }],
  
    deploy : {
      production : {
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };
  