import fs from "fs";
import path from "path";
import { downloadArtifact } from "@electron/get";
import { getEvmHome, getElectronDownloadConfig } from "./utils";
import extractZip from "extract-zip";

async function extractFile(zipPath: string, extractPath: string) {
  return new Promise((resolve, reject) => {
    extractZip(
      zipPath,
      {
        dir: extractPath
      },
      err => {
        err ? reject(err) : resolve();
      }
    );
  });
}

const config = getElectronDownloadConfig();
const evmHome = getEvmHome();
if (!fs.existsSync(evmHome)) {
  fs.mkdirSync(evmHome);
}
const versions = fs.readdirSync(evmHome);
if (versions.includes(config.version)) {
  // skip
  process.exit(0);
}

const mirrorOptions = config.mirror
  ? {
      mirror: config.mirror,
      customDir: config.version
    }
  : undefined;

downloadArtifact({
  artifactName: "electron",
  version: config.version,
  mirrorOptions: mirrorOptions
})
  .then(zipPath => extractFile(zipPath, path.join(evmHome, config.version)))
  .catch(err => {
    throw new Error(err);
  });
