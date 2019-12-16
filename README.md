# egg-mongoose-auto-increment

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mongoose-auto-increment.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-mongoose-auto-increment
[travis-image]: https://img.shields.io/travis/eggjs/egg-mongoose-auto-increment.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-mongoose-auto-increment
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-mongoose-auto-increment.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-mongoose-auto-increment?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-mongoose-auto-increment.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-mongoose-auto-increment
[snyk-image]: https://snyk.io/test/npm/egg-mongoose-auto-increment/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-mongoose-auto-increment
[download-image]: https://img.shields.io/npm/dm/egg-mongoose-auto-increment.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-mongoose-auto-increment

<!--
Description here.
-->

## Install

```bash
$ npm i egg-mongoose-auto-increment --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.mongooseAutoIncrement = {
  enable: true,
  package: 'egg-mongoose-auto-increment',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.mongooseAutoIncrement = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
