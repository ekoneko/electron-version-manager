import fs from "fs";
import path from "path";
import os from "os";
import { ElectronPlatformArtifactDetailsWithDefaults } from "@electron/get/dist/cjs/types";

export function getEvmHome() {
  const homePath = os.homedir();
  const { ELECTRON_VERSION_MANAGER_PATH } = process.env;
  if (!ELECTRON_VERSION_MANAGER_PATH) {
    return path.resolve(homePath, ".evm");
  }
  if (path.isAbsolute(ELECTRON_VERSION_MANAGER_PATH)) {
    return ELECTRON_VERSION_MANAGER_PATH;
  } else {
    return path.resolve(homePath, ELECTRON_VERSION_MANAGER_PATH);
  }
}

export function getElectronDownloadConfig(): {
  version: string;
  mirror?: string;
} {
  // TODO: get rootPath from __dirname is not a good idea
  const rootPath = __dirname
    .split("/node_modules/")
    .slice(0, -1)
    .join("/node_modules/");
  if (!rootPath) {
    throw new Error("get project path failed");
  }
  const projectPkgPath = path.resolve(rootPath, "package.json");
  const projectPkgJson = require(projectPkgPath);
  if (!projectPkgJson.build || !projectPkgJson.build.electronDownload) {
    throw new Error(
      "Missing property `build.electronDownload` in package.json"
    );
  }
  if (!projectPkgJson.build.electronDownload.version) {
    throw new Error(
      "Missing property `build.electronDownload.version` in package.json"
    );
  }
  return projectPkgJson.build.electronDownload;
}

export function getElectronPath() {
  const { version } = getElectronDownloadConfig();
  const evmHome = getEvmHome();
  const versions = fs.readdirSync(evmHome);
  if (versions.includes(version)) {
    return path.join(evmHome, version);
  }
  throw new Error("Electron binary file not found, try reinstall again");
}
