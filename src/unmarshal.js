const fs = require('fs');
const AWS = require('aws-sdk');

exports.command = 'unmarshall [file] [output] <content>';

exports.desc = 'Unmarshall Dynamo JSON to normal JSON';

exports.builder = {
  file: {
    alias: 'f',
    default: false,
    require: false,
    type: 'boolean',
  },
  output: {
    require: false,
    type: 'string',
    alias: 'o',
  },
};

exports.handler = function (argv) {
  let content = argv.content;
  if (argv.file) {
    content = fs.readFileSync(content, 'utf8');
  }
  const json = JSON.parse(content);
  const unmarshall = AWS.DynamoDB.Converter.unmarshall(
    json.Items || json.Item || json
  );
  if (argv.output) {
    fs.writeFileSync(argv.output, JSON.stringify(unmarshall, null, 4));
    console.log('Output save to: ', argv.output);
  } else console.log(unmarshall);
};
