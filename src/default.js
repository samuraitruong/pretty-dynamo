const fs = require('fs');
const aws = require('aws-sdk');

exports.command = '<content>';
exports.desc = 'Unmarshall Dynamo JSON to normal JSON fro stdin';
exports.builder = {};
exports.handler = function (argv) {
  let content = argv.content;
  console.log(content);
};
