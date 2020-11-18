(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{879:function(e,t,n){e.exports={"clinical-lowlight-theme":"marked-module__clinical-lowlight-theme___3Gtqi","orion-fusion-theme":"marked-module__orion-fusion-theme___3la9p",marked:"marked-module__marked___2rRhM"}},880:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(3),s=n.n(i),o=n(84),c=n(879),l=n.n(c),d=s.a.bind(l.a);t.default=function(){var e=a.a.useContext(o.ThemeContext);return a.a.createElement("div",{dir:"ltr",className:d("marked",e.className),dangerouslySetInnerHTML:{__html:'\x3c!-- Logo --\x3e\n<p align="center">\n  <img height="128" width="128" src="https://github.com/cerner/terra-toolkit/raw/main/terra.png">\n</p>\n\n\x3c!-- Name --\x3e\n<h1 align="center">\n  Terra Toolkit\n</h1>\n\n<p><a href="https://github.com/cerner/terra-toolkit/blob/main/LICENSE"><img src="https://badgen.net/github/license/cerner/terra-toolkit" alt="License"></a>\n<a href="https://travis-ci.com/cerner/terra-toolkit"><img src="https://badgen.net/travis/cerner/terra-toolkit" alt="Build Status"></a>\n<a href="https://david-dm.org/cerner/terra-toolkit"><img src="https://badgen.net/david/dep/cerner/terra-toolkit" alt="Dependencies status"></a>\n<a href="https://david-dm.org/cerner/terra-toolkit?type=dev"><img src="https://badgen.net/david/dev/cerner/terra-toolkit" alt="devDependencies status"></a>\n<a href="https://lerna.js.org/"><img src="https://badgen.net/badge/maintained%20with/lerna/cc00ff" alt="lerna"></a></p>\n<p>Terra Toolkit is a <a href="https://github.com/lerna/lerna">Lerna</a> repository for common development packages necessary for developing Terra projects.</p>\n<ul>\n<li><a href="#notice">Notice</a></li>\n<li><a href="#package-status">Package Status</a></li>\n<li><a href="#versioning">Versioning</a></li>\n<li><a href="#contributing">Contributing</a></li>\n<li><a href="#license">LICENSE</a></li>\n</ul>\n<h2 id="notice"><a class="anchor" aria-hidden="true" tabIndex="-1" href="#notice"><span class="icon icon-link" /></a>Notice</h2><p>The code for the <a href="https://www.npmjs.com/package/terra-toolkit">terra-toolkit</a> npm dependency has been moved to <a href="https://github.com/cerner/terra-toolkit-boneyard">terra-toolkit-boneyard</a>.</p>\n<h2 id="package-status"><a class="anchor" aria-hidden="true" tabIndex="-1" href="#package-status"><span class="icon icon-link" /></a>Package Status</h2><p><img src="https://badgen.net/badge/status/Stable/green" alt="Stable">\n<img src="https://badgen.net/badge/status/Beta/orange" alt="Beta">\n<img src="https://badgen.net/badge/status/Deprecated/grey" alt="Deprecated"></p>\n<table>\n<thead>\n<tr>\n<th>Package</th>\n<th>Version</th>\n<th>Status</th>\n<th>Dependencies</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><a href="https://github.com/cerner/terra-toolkit/tree/main/packages/browserslist-config-terra">@cerner/browserslist-config-terra</a></td>\n<td><a href="https://www.npmjs.org/package/@cerner/browserslist-config-terra"><img src="https://badgen.net/npm/v/@cerner/browserslist-config-terra" alt="NPM version"></a></td>\n<td><img src="https://badgen.net/badge/status/Stable/green" alt="Stable"></td>\n<td><a href="https://david-dm.org/cerner/terra-toolkit?path=packages/browserslist-config-terra"><img src="https://badgen.net/david/dep/cerner/terra-toolkit/packages/browserslist-config-terra" alt="@cerner/browserslist-config-terra"></a></td>\n</tr>\n<tr>\n<td><a href="https://github.com/cerner/terra-toolkit/tree/main/packages/eslint-config-terra">@cerner/eslint-config-terra</a></td>\n<td><a href="https://www.npmjs.org/package/@cerner/eslint-config-terra"><img src="https://badgen.net/npm/v/@cerner/eslint-config-terra" alt="NPM version"></a></td>\n<td><img src="https://badgen.net/badge/status/Stable/green" alt="Stable"></td>\n<td><a href="https://david-dm.org/cerner/terra-toolkit?path=packages/eslint-config-terra"><img src="https://badgen.net/david/dep/cerner/terra-toolkit/packages/eslint-config-terra" alt="@cerner/eslint-config-terra"></a></td>\n</tr>\n<tr>\n<td><a href="https://github.com/cerner/terra-toolkit/tree/main/packages/terra-functional-testing">@cerner/terra-functional-testing</a></td>\n<td><a href="https://www.npmjs.org/package/@cerner/terra-functional-testing"><img src="https://badgen.net/npm/v/@cerner/terra-functional-testing" alt="NPM version"></a></td>\n<td><img src="https://badgen.net/badge/status/Stable/green" alt="Stable"></td>\n<td><a href="https://david-dm.org/cerner/terra-toolkit?path=packages/terra-functional-testing"><img src="https://badgen.net/david/dep/cerner/terra-toolkit/packages/terra-functional-testing" alt="@cerner/terra-functional-testing"></a></td>\n</tr>\n</tbody></table>\n<h2 id="versioning"><a class="anchor" aria-hidden="true" tabIndex="-1" href="#versioning"><span class="icon icon-link" /></a>Versioning</h2><p>Terra-toolkit packages are considered to be stable and will follow <a href="http://semver.org/">SemVer</a> for versioning.</p>\n<ol>\n<li>MAJOR versions represent breaking changes</li>\n<li>MINOR versions represent added functionality in a backwards-compatible manner</li>\n<li>PATCH versions represent backwards-compatible bug fixes</li>\n</ol>\n<p>Consult the component CHANGELOGs, related issues, and PRs for more information.</p>\n<h2 id="contributing"><a class="anchor" aria-hidden="true" tabIndex="-1" href="#contributing"><span class="icon icon-link" /></a>Contributing</h2><p>Please read through our <a href="/terra-toolkit/CONTRIBUTING.md">contributing guidelines</a>. Included are directions for issue reporting and pull requests.</p>\n<h2 id="license"><a class="anchor" aria-hidden="true" tabIndex="-1" href="#license"><span class="icon icon-link" /></a>LICENSE</h2><p>Copyright 2017 - 2020 Cerner Innovation, Inc.</p>\n<p>Licensed under the Apache License, Version 2.0 (the &quot;License&quot;); you may not use this file except in compliance with the License. You may obtain a copy of the License at</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.apache.org/licenses/LICENSE-2.0">http://www.apache.org/licenses/LICENSE-2.0</a></p>\n<p>Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.</p>\n'}})}}}]);