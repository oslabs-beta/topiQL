const fs = require('fs');
const path = require('path');

console.log("I am testpkg/initGQL")
//make a directory in destination folder (server) called topiQL
fs.mkdirSync(path.resolve(__dirname, '../server/topiQL'));
//make a file there called config.js with boilerplate - user will just fill in the blanks.

let result =
`// User Configuration File for Kafka - GraphQL connection using topiQL library
const username = ''
const password = ''

const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

module.exports = {
  topics: [],
  clientId: '',
  brokers: [],
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
  schemaFile: '',  
  destinationFolder: ''
};`;

fs.writeFileSync(path.resolve(__dirname, '../server/topiQL/config.js'), result);

//after this file is run, user will run their configuration file? which will run index.js in testpkg. 
//index.js in testpkg will read the user-given file and output it to the topiQL folder created from this file. 