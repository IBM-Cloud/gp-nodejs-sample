/**
 * @author Steven R. Loomis
 * simple 'hello world' gaas sample - "express" style
 */

/*
 * Copyright IBM Corp. 2015-2017
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const optional = require('optional');
const appEnv = require('cfenv').getAppEnv();
const gpClient = require('g11n-pipeline').getClient(
  optional('./local-credentials.json')   // if it exists, use local-credentials.json
  || { appEnv: appEnv }                  // otherwise, the appEnv
);
// Set up express
const express = require('express');
const app = express();

function pinoLogErr (err, req, res, next) {
  req.log.error(err);
  return next(err);
}
app.use(pinoLogErr);

//Ignore all favicon requests
const nofavicon = require("express-no-favicons")
app.use(nofavicon());

const bundleName = process.env.BUNDLE_ID || 'hello';
const mybundle = gpClient.bundle(bundleName);

// Example: /
app.get('/', (req, res) => {
  // For the root page, load the list of supported langs
  mybundle.getInfo(function (err, projInfo) {
    if(err) {
      req.log.error(err);
      res.write(err.toString());
      res.end();
    } else {
      res.set('Content-Type', 'text/html');
      res.write('<h1>Welcome to the Globalization Pipeline Node.js sample!</h1>');
      res.write('<h2> Pick a language code:</h2>');
      res.write('<ul>');
      projInfo.languages() // --> Array: [ 'en', 'de', … ]
        .forEach((lang) => {
          res.write('<li> ' + lang + ': <a href="/' + lang + '">json</a> <a href="/' + lang + '/hello">hello</a>');
          res.write('</li>');
        });
      res.write('</ul>');
      res.end();
      }
    });
});

// example:   /fr/hello
app.get(/^\/(\w+)\/hello/, (req, res) => {
  var lang = req.params[0];
  // Just get this string
  mybundle.entry({ resourceKey: 'hello', languageId: lang})
  .getInfo(function (err, entry) {
    if(err) {
      req.log.error(err);
      res.end('Sorry, an error occured.');
    } else {
      if(entry.translationStatus === 'failed') {
      res.end(lang + ':\n\n** failed: retry the translation from the dashboard');
      } else if (entry.translationStatus === 'inProgress') {
        res.end(lang + ':\n\n** inProgress: still working on translation (try back later)');
      } else {
        // write the value
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8', 'Content-language': lang });
        res.end(lang + ': ' + entry.value);
      }
    }
  });
});

// Example:   /fr
app.get(/^\/(\w+)/, (req, res) => {
  var lang = req.params[0];
  mybundle.getStrings({ languageId: lang}, function (err, entry) {
    if(err) {
      req.log.error(err);
      res.end('Sorry, an error occured.');
    } else {
      // write the strings as JSON
      res.set('Content-language', lang);
      res.set('Date', entry.updatedAt);
      res.json(entry.resourceStrings);
    }
  });
});

/*const server = */app.listen(appEnv.port, appEnv.bind, function () {
  pino.info({ address: server.address(), url: appEnv.url });
});
