#!/usr/bin/env node
if (process.env.BUILD_EVM) {
  process.exit(0);
}
require("../lib/install");
