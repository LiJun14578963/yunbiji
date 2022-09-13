const fs = require('fs')
const path = require('path')
const {config} = require("shelljs");

const mockBaseURL = 'https://note-server.hunger-valley.com/'//开发模式下的url
const realBaseURL = 'https://note-server.hunger-valley.com/'//上线模式下的url

exports.config = function ({isDev = true} = {isDev: true}) {
  let fileTxt = `
  module.exports = {
    baseURL: '${isDev ? mockBaseURL : realBaseURL}'
  }
  `
  fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'), fileTxt)//把这个文件写入进去
}
