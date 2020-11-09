#!/usr/bin/env node
const fs = require('fs')
const cliPath = require.resolve('../lib/install.js')
if (process.env.BUILD_EVM) {
  process.exit(0);
}
if (fs.existsSync(cliPath)) {
  require("../lib/install");
}
