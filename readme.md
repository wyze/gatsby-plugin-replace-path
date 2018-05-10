# gatsby-plugin-replace-path

[![Build Status][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![Codecov.io][codecov-image]][codecov-url]

> A Gatsby plugin to replace page paths.

## Installation

### Yarn

```
$ yarn add --dev gatsby-plugin-replace-path
```

### npm

```
$ npm install --save-dev gatsby-plugin-replace-path
```

## Usage

```js
// gatsby-config.js

module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-replace-path',
      options: {
        pattern: /(e)/g,
        replacement: ( _, match ) => match.toUpperCase(),
      },
    },
  ]
}
```

## Change Log

> [Full Change Log](changelog.md)

### [v1.0.0](https://github.com/wyze/gatsby-plugin-replace-path/releases/tag/v1.0.0) (2018-05-10)

* [[`2ecb2577b3`](https://github.com/wyze/gatsby-plugin-replace-path/commit/2ecb2577b3)] - Initial commit (Neil Kistner)

## License

MIT © [Neil Kistner](//neilkistner.com)

[travis-image]: https://img.shields.io/travis/wyze/gatsby-plugin-replace-path.svg?style=flat-square
[travis-url]: https://travis-ci.org/wyze/gatsby-plugin-replace-path

[npm-image]: https://img.shields.io/npm/v/gatsby-plugin-replace-path.svg?style=flat-square
[npm-url]: https://npmjs.com/package/gatsby-plugin-replace-path

[codecov-image]: https://img.shields.io/codecov/c/github/wyze/gatsby-plugin-replace-path.svg?style=flat-square
[codecov-url]: https://codecov.io/github/wyze/gatsby-plugin-replace-path
