Hello, Globalization Pipeline!
===
<!--
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
-->

A simple sample for a stupendous service.

Installation
------------
* To get started, you should familiarize yourself with the service itself. A
good place to begin is by reading the [Quick Start Guide](https://github.com/IBM-Bluemix/gp-common#quick-start-guide)
 * for testing locally, copy the credentials (starting with `{ credentials: … }` to `local-credentials.json`
 * go into the Globalization Pipeline dashboard and click New Project
  * create a project with the Project ID `hello` and upload the [hello.json](hello.json) file here as JSON.
  * Add target languages, edit as desired
 * update `manifest.yml` to note the bound service name
* `npm install`
* Now you can use `npm run start` to test locally (using `local-credentials.json`)
* `cf push` this application should post it to your BlueMix instance.
* For decoding the logs, use `npm install -g pino` then `npm run start | pino` ( see [pino](https://github.com/pinojs/pino) )

Usage
-----
Sample deployment: https://gp-nodejs-sample.mybluemix.net/

* click on a language code to view 'hello' in that language.

Community
---------
* View or file GitHub [Issues](https://github.com/IBM-Bluemix/gp-nodejs-sample/issues)
* Connect with the open source community on [developerWorks Open](https://developer.ibm.com/open/ibm-bluemix-globalization-pipeline-service/node-js-sdk/)

Contributing
------------
See [CONTRIBUTING.md](CONTRIBUTING.md).

License
-------
Apache 2.0. See [LICENSE.txt](LICENSE.txt).

> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
>
> http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
> See the License for the specific language governing permissions and
> limitations under the License.
