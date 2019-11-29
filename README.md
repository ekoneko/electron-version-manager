# Electron version manager

Use global electron binary file for multiple repositories.

## How to use

1. Before add @ekoneko/evm, ensure your package.json has property `build.electronDownload`.

```
{
  "build": {
    "electronDownload": {
      "version": "7.1.2",
      "mirrorOptions": {
        "mirror": "https://npm.taobao.org/mirrors/electron/",
        "customDir": "7.1.2"
      }
    }
  }
}
```

- `build.electronDownload.version` is required.

These options comes from [@electron/get](https://github.com/electron/get), it also works for [electron-builder](https://github.com/electron-userland/electron-builder).

2. Then add `@ekoneko/evm` by npm or yarn to your `devDependencies`

```
npm install -D @ekoneko/evm
```

3. use `evm` instead of `electron` to launch your project.

```
./node_modules/.bin/evm path/to/entry.js
```

You don't need to install `electron` for launching. However, you can set `ELECTRON_SKIP_BINARY_DOWNLOAD=1` to install `electron` without download electron binary file for typescript definitions or some other reasons.

```
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install -D electron
```

## Configure

### process.env.ELECTRON\_VERSION\_MANAGER\_PATH

Set a path to install electron binary file, default path is `~/.evm`.
