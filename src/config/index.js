module.exports = Object.freeze({
  MONGO_API_URL: process.env.MONGO_URL,
  MONGO_CONFIG: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  CATS_API_KEY: process.env.CATS_API_KEY,
  API_URL: process.env.API_URL,
  PORT: process.env.PORT || 3000,
  METRICS_OPTIONS: {
    port: process.env.METRICS_PORT,
    decimals: true,
    header: true,
  },
  LOGGLY_OPTIONS: {
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_TOKEN,
    json: true,
    tags:['CATS-API']
  },
});
