#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const cliPath = path.resolve('../lib/cli.js')
if (fs.existsSync(cliPath)) {
    require("../lib/cli");
}