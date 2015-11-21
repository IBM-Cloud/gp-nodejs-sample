/**
 * @author Steven R. Loomis
 * simple 'hello world' gaas sample - "express" style
 */
 
/*	
 * Copyright IBM Corp. 2015
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

var optional = require('optional');
var appEnv = require('cfenv').getAppEnv();
var gpClient = require('g11n-pipeline').getClient(
  optional('./local-credentials.json')   // if it exists, use local-credentials.json
    || {appEnv: appEnv}                  // otherwise, the appEnv
);
// Set up express
var express = require('express');
var app = express();

var bundleName = process.env.BUNDLE_ID || 'hello';
var mybundle = gpClient.bundle(bundleName);

// Example: /
app.get('/', function (req, res) {
  // For the root page, load the list of supported langs 
  mybundle.getInfo({}, function (err, projInfo) {
    if(err) {
      // console.error(err);
      res.write(err.toString());
      res.end();
    } else {
      res.set('Content-Type', 'text/html');
      function addLang(lang) {
        res.write('<li> '+lang+': <a href="/' + lang + '">json</a> <a href="/' + lang + '/hello">hello</a>');
        res.write('</li>');
      }
      res.write('<h1>Welcome to the Globalization Pipeline Node.js sample!</h1>');
      res.write('<h2> Pick a language code:</h2>');
      res.write('<ul>');
      // add the source (probably english)
      addLang(projInfo.sourceLanguage);
      // add all of the targets
      if( projInfo.targetLanguages) {
        projInfo.targetLanguages.forEach( addLang );
      }
      res.write('</ul>');
      res.end();
    }
  });
});

// example:   /fr/hello
app.get(/^\/(\w+)\/hello/, function (req, res) {
  var lang = req.params[0];
  // Just get this string
  mybundle.getEntryInfo({ resourceKey: 'hello', languageId: lang}, function (err, data) {
    if(err) {
      console.error(err);
      res.end('Sorry, an error occured.');
    } else {
      var entry = data.resourceEntry;
      if(entry.translationStatus === 'failed') {
        res.end(lang + ':\n\n** failed: retry the translation from the dashboard');
      } else if(entry.translationStatus === 'inProgress') {
        res.end(lang + ':\n\n** inProgress: still working on translation (try back later)');
      } else {
        // write the value
        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8', 'Content-language': lang});
        res.end(lang + ': ' + entry.value);
      }
    }
  });
});

// Example:   /fr
app.get(/^\/(\w+)/, function (req, res) {
  var lang = req.params[0];
  mybundle.getStrings({ languageId: lang}, function (err, entry) {
    if(err) {
      console.error(err);
      res.end('Sorry, an error occured.');
    } else {
      // write the strings as JSON
      res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8', 'Content-language': lang, 'Date':entry.updatedAt});
      res.end(JSON.stringify(entry.resourceStrings));
    }
  });
});

var server = app.listen(appEnv.port, appEnv.bind, function() {
  console.dir( server.address());
});
