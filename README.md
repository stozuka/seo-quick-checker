# seo-quick-checker [![CircleCI](https://circleci.com/gh/stozuka/seo-quick-checker.svg?style=svg)](https://circleci.com/gh/stozuka/seo-quick-checker) [![npm version](https://badge.fury.io/js/seo-quick-checker.svg)](https://badge.fury.io/js/seo-quick-checker) ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

A package to quickly check if the HTML is SEO friednly.

## Installation

`npm i seo-quick-checker`

## Features

Provide 8 default rules.

- Find a tags without rel attribute
- Find img tags without alt attribute
- Check if number of h1 tag is more than 2
- Check if number of strong tag is more than 15
- Check if there is a title under head
- Check if there is a meta keywords under head
- Check if there is a meta description under head

On top of that, user can defined own rules by using rule-builder module.

## Getting Started

### 1. Basic Setup

Create a new directory and move there.
Then, you can run these commands to start the project.

```
mkdir seo-quick-checker-test
cd seo-quick-checker-test
npm init
npm i seo-quick-checker
```

### 2. Create Files

First, create neede directories and files.

```
touch index.js
mkdir input
touch input/index.html
mkdir output
```

To test out, you can copy-paste these contents to index.js and input/index.html

index.js

```
'use strict';

const {
  seoQuickChecker,
  defaultRules,
  getDom,
  output,
} = require('seo-quick-checker');

(async function() {
  try {
    const dom = await getDom.fromFile('./input/index.html');
    const notices = seoQuickChecker(dom, defaultRules.all);
    await output.toFile('./output/output.txt', notices);
  } catch (error) {
    console.error(error);
  }
})();
```

input/index.html

```
<!-- no title under head -->
<!-- no meta description under head -->
<!-- no meta keywords under head -->
<!-- more than 1 h1 tag -->
<!-- more than 15 strong tags -->
<!-- img without alt -->
<!-- a without rel -->

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
  <h1>test</h1>
  <h1>test</h1>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <div><strong>test</strong></div>
  <img />
  <a>link</a>
</body>

</html>
```

Now you can run the script.

`node index.js`

When it's done, output.txt is created in output directory.

output.txt contained the results of the checker.

## API Reference

### defaultRules module

defaultRules.all

This is an array of function.

```
defaultRules.all
//=> [
  aWithoutRel,
  headWithoutMetaDescription,
  headWithoutMetaKeywords,
  headWithoutTitle,
  imgWithoutAlt,
  moreThan1H1,
  moreThan15Strong,
]
```

These are the functions to be provided to seoQuickChecker function.

```
defaultRules.aWithoutRel
defaultRules.headWithoutMetaDescription
defaultRules.headWithoutMetaKeywords
defaultRules.headWithoutTitle
defaultRules.imgWithoutAlt
defaultRules.moreThan1H1
defaultRules.moreThan15Strong
```

If you want to check all the default rules, you can write like this.

```
const notices = seoQuickChecker(dom, defaultRules.all);
```

If you want to check `defaultRules.aWithoutRel`
and `defaultRules.headWithoutMetaDescription`, you can use [], because each of them is the function but second param of seoQuickChecker is an array.

```
const notices = seoQuickChecker(dom, [
  defaultRules.aWithoutRel,
  defaultRules.headWithoutMetaDescription
]);
```

### ruleBuilder module

### getDom module

getDom.fromFile(filePath, encoding)

- filePath {string}: Required.
- encoding {string}: Optional. Defaults to 'utf8'.

Returns `Promise<function>`

getDom.fromStream(filePath, encoding)

- filePath {string}: Required.
- encoding {string}: Optional. Defaults to 'utf8'.

Returns `Promise<function>`

### seoQuickChecker module

seoQuickChecker(dom, rules)

- dom {function}: Required. The function return from `getDom.fromFile` or `getDom.fromStream`.
- rules {function[]}: Required. An array contains the functions defined in `defaultRules` modules or user defined rules created by `ruleBuilders` module.

Returns `string[]`

### output module

output.toConsole(notices, connector)

- notices {string[]}: Required. Use the returning value of `seoQuickChecker` function.
- connector {string}: Optional. Defaults to '\n'. A string to join the elements of notices array.

Returns `undefined`.

output.toFile(filePath, notices, connector, options)

- filePath {string}: Required. Output file path.
- notices {string[]}: Required. Use the returning value of `seoQuickChecker` function.
- connector {string}: Optional. Defaults to '\n'. A string to join the elements of notices array.
- options {Object}: Optional. Defaults to {}. See `https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback` for more details.

output.toStream(filePath, notices, connector, encoding)

- filePath {string}: Required. Output file path.
- notices {string[]}: Required. Use the returning value of `seoQuickChecker` function.
- connector {string}: Optional. Defaults to '\n'. A string to join the elements of notices array.
- encoding {string}: Optional. Defaults to 'utf8'.

## More Examples

If you want to use streaming API of Node.js to getDom, you can call like this.

`const dom = await getDom.fromStream('./input/index.html');`

Full example of `index.js`

```
'use strict';

const {
  seoQuickChecker,
  defaultRules,
  getDom,
  output,
} = require('seo-quick-checker');

(async function() {
  try {
    const dom = await getDom.fromStream('./input/index.html');
    const notices = seoQuickChecker(dom, defaultRules.all);
    await output.toStream('./output/output.txt', notices);
  } catch (error) {
    console.error(error);
  }
})();
```

If you want to use streaming API of Node.js to output, you can call like this.

`await output.toStream('./output/output.txt', notices);`

Full example of `index.js`

```
'use strict';

const {
  seoQuickChecker,
  defaultRules,
  getDom,
  output,
} = require('seo-quick-checker');

(async function() {
  try {
    const dom = await getDom.fromStream('./input/index.html');
    const notices = seoQuickChecker(dom, defaultRules.all);
    await output.toStream('./output/output.txt', notices);
  } catch (error) {
    console.error(error);
  }
})();
```

If you want to console.log the notices, you can call like this.
Please be careful, there is no `await` before output.toConsole(notices).

`await output.toStream('./output/output.txt', notices);`

Full example of `index.js`

```
'use strict';

const {
  seoQuickChecker,
  defaultRules,
  getDom,
  output,
} = require('seo-quick-checker');

(async function() {
  try {
    const dom = await getDom.fromStream('./input/index.html');
    const notices = seoQuickChecker(dom, defaultRules.all);
    output.toConsole(notices);
  } catch (error) {
    console.error(error);
  }
})();
```

## Testing

One time tesing:

`npm run test`

Watch the testing:

`npm run watchtest`

## Format and Lint

To run Prettier

`npm run fmt`

To run ESLint

`npm run lint`
