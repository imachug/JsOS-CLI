// Copyright 2016-present runtime.js project authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var exec = require('../run/shell-exec');
var testCmd = require('../utils/testCmd');

module.exports = function(opts, cb) {
  testCmd('losetup', true);
  testCmd('mkfs.msdos', false);

  exec('losetup -f', function(code, output) {
    var mountpoint = output.trim();
    exec('losetup ' + mountpoint + ' ' + opts.filename, function(code, output) {
      exec('mkfs.msdos -F 32 -n "' + opts.label + '" ' + mountpoint, function(code, output) {
        exec('losetup -d ' + mountpoint, function(code, output) {
          cb();
        });
      });
    });
  });
};
