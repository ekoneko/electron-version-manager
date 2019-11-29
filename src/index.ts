import path from "path";
import os from "os";
import { getElectronPath } from "./utils";

// from https://github.com/electron/electron/blob/1f43af5/npm/install.js#L54
function getPlatformPath() {
  const platform = process.env.npm_config_platform || os.platform();
  switch (platform) {
    case "darwin":
      return "Electron.app/Contents/MacOS/Electron";
    case "freebsd":
    case "linux":
      return "electron";
    case "win32":
      return "electron.exe";
    default:
      throw new Error(
        "Electron builds are not available on platform: " + platform
      );
  }
}
export default path.join(getElectronPath(), getPlatformPath());
