process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const dotenv = require('dotenv')
dotenv.config({ path: '.env', silent: true })

environment.config.merge({
  devServer: {
    public: process.env.NGROK_WEBPACK_TUNNEL,
  },
})

module.exports = environment.toWebpackConfig()
