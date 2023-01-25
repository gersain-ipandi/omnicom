// ecosystem.config.js

module.exports = {
  apps : [{
    name   : "omnicom",
    script : "./bin/www",
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    }
  }]
}