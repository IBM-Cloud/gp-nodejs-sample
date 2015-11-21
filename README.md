Hello, Globalization Pipeline!
===
<!--
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
-->

A simple sample for a stupendous service.

INSTALLATION
===
* `npm install`
* create a bound service instance of the Globalization Pipeline.
 * for testing locally, copy the credentials (starting with `{ credentials: … }` to `local-credentials.json`
 * go into the Globalization Pipeline dashboard and click New Project
  * create a project with the Project ID `hello` and upload the [hello.json](hello.json) file here as JSON.
  * Add target languages, edit as desired
 * update `manifest.yml` to note the bound service name
* Now you can use `npm run start` to test locally (using `local-credentials.json`)
* `cf push` this application should post it to your BlueMix instance.

USAGE
===
Sample deployment: https://gp-nodejs-sample.mybluemix.net/

* click on a language code to view 'hello' in that language.

AUTHOR
===
Steven R. Loomis <srloomis@us.ibm.com>

LICENSE
===
Apache 2.0. See [LICENSE.txt](LICENSE.txt)
