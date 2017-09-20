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

/*eslint-disable no-console*/

/**
 * Simple test showing use of callbacks vs. promises vs. async.
 * Requires Node version ≥7,  and a “local-credentials.json” file pointing
 * to a Globalization Pipeline instance with a bundle “hello” containing a resource
 * entry “hello”.
 */

const optional = require('optional');
const appEnv = require('cfenv').getAppEnv();
const gpClient = require('g11n-pipeline').getClient(
  optional('./local-credentials.json')   // if it exists, use local-credentials.json
  || { appEnv: appEnv }                  // otherwise, the appEnv
);

// setup a resource bundle…
const bundle = gpClient.bundle('hello');
// …and a resource entry within that bundle
const entry = bundle.entry({ resourceKey: 'hello', languageId: 'es' });

// Now, we need to asynchronously fetch the contents.

/**
 * Print out this entry's value.
 * @param {ResourceEntry} entry
 */
function printWithCallback(entry) {
  // The callback way:
  entry.getInfo(function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('callback:',  data.value);
  });
}

/**
 * Print out this entry’s value. Use a promise.
 * @param {ResourceEntry} entry
 * @return Promise
 */
function printAsPromised(entry) {
  return entry.getInfo()
    .then(data => console.log('promised:', data.value));
}

/**
 * Print out this entry’s value. Use async/await.
 */
async function printAsync(entry) {
  const data = await entry.getInfo();
  console.log('await’ed:', data.value);
}

// Now call these.
Promise.resolve()
  .then(() => printAsPromised(entry))
  .then(() => printAsync(entry))
  .then(() => printWithCallback(entry))
  .catch(console.error);
