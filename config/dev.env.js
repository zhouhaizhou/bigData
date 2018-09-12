'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"/api"',
  PRODUCT_PATH:'"http://61.152.122.108:8282/BIGDATA/webProduct/"',
  //API_ROOT:'"/api"'
})
