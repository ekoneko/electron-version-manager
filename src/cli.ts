#!/usr/bin/env node

import electron from ".";
import proc from "child_process";

var child = proc.spawn(electron, process.argv.slice(2), {
  stdio: "inherit",
  windowsHide: false
});
child.on("close", function(code) {
  process.exit(code);
});

const handleTerminationSignal = function(signal: "SIGINT" | "SIGTERM") {
  process.on(signal, function signalHandler() {
    if (!child.killed) {
      child.kill(signal);
    }
  });
};

handleTerminationSignal("SIGINT");
handleTerminationSignal("SIGTERM");
