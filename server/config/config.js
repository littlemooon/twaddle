import path from 'path';

const env = process.env.NODE_ENV || 'development';

const prodUrl =
  process.env.MONGOHQ_URL ||
  process.env.MONGOLAB_URI ||
  'mongodb://localhost:27017/twaddle';

const baseConfig = {
  app: {
    root: path.normalize(__dirname + '/../..'),
    env: env
  }
};

const platformConfig = {
  development: {
    app: {
      port: 3000
    },
    mongo: {
      url: 'mongodb://localhost:27017/twaddle-dev'
    }
  },

  test: {
    app: {
      port: 3001
    },
    mongo: {
      url: 'mongodb://localhost:27017/twaddle-test'
    }
  },

  production: {
    app: {
      port: process.env.PORT || 3000,
      // default caching time (7 days) for static files
      cacheTime: 7 * 24 * 60 * 60 * 1000
    },
    mongo: {
      url: prodUrl
    }
  }
};

const envConfig = platformConfig[env];

export default {...baseConfig, ...envConfig};
