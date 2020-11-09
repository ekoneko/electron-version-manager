#!/usr/bin/env node
const fs = require('fs')
const cliPath = require.resolve('../lib/cli.js')
if (fs.existsSync(cliPath)) {
    require("../lib/cli");
}
