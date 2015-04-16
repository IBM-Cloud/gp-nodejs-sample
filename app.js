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

// Set up GaaS
var appEnv = require('cfenv').getAppEnv();
var gaasClient = require('gaas').getClient({credentials:
                                          appEnv.getService(/IBM Globalization.*/).credentials});
// Set up express
var express = require('express');
var app = express();

var projectName = process.env.PROJECT_ID || 'hello';
var myProject = gaasClient.project(projectName);

app.get('/', function (req, res) {
  myProject.getInfo({}, function (err, projInfo) {
    res.set('Content-Type', 'text/html');
    function addLang(lang) {
      res.write('<li> <a href="/' + lang + '">' + lang + '</a>');
    }
    res.write('<h1>Welcome to GaaS! Pick a language code:</h1>');
    res.write('<ul>');
    addLang(projInfo.sourceLanguage);
    if( projInfo.targetLanguages) {
      projInfo.targetLanguages.forEach( addLang );
    }
    res.write('</ul>');
    res.end();
  });
});

app.get(/^\/(\w+)/, function (req, res) {
  var lang = req.params[0];
  myProject.getResourceEntry({ resKey: 'hello', languageID: lang}, function (err, entry) {
    if(err) {
      console.error(err);
      res.end('Sorry, an error occured.');
    } else if(entry.translationStatus === 'failed') {
      res.end(lang + ':\n\n** failed: retry the translation from the dashboard');
    } else if(entry.translationStatus === 'inProgress') {
      res.end(lang + ':\n\n** inProgress: still working on translation (try back later)');
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8', 'Content-language': lang});
      res.end(lang + ': ' + entry.value);
    }
  });
});

var server = app.listen(appEnv.port, appEnv.bind, function() {
  console.dir( server.address());
});
