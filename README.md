# seo-quick-checker [![CircleCI](https://circleci.com/gh/stozuka/seo-quick-checker.svg?style=svg)](https://circleci.com/gh/stozuka/seo-quick-checker) [![npm version](https://badge.fury.io/js/seo-quick-checker.svg)](https://badge.fury.io/js/seo-quick-checker) ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

A package to quickly check if the HTML is SEO friednly.

## Installation

`npm i seo-quick-checker`

## Features

Provides default rules below.

- Find a tags without rel attribute
- Find img tags without alt attribute
- Check if number of h1 tag is more than 2
- Check if number of strong tag is more than 15
- Check if there is a title under head
- Check if there is a meta keywords under head
- Check if there is a meta description under head

On top of that, you can defined you own rules by using `ruleBuilder` module.

For input, this package provides two ways.

- Using Node.js fs.readFile
- Using Node.js stream.readableStream

For output, this packages provides three ways below.

- Using Node.js fs.writeFile
- Using Node.js stream.writableStream
- Using Node.js console.log

## Getting Started

### 1. Basic Setup

Create a new directory and move there.
Then, you can run these commands to start the project.

```
mkdir seo-quick-checker-test
cd seo-quick-checker-test
npm init
npm i
```

### 2. Create Files

Create needed directories and files.

```
touch index.js
mkdir input
touch input/index.html
mkdir output
```

To test out, you can copy-paste these code to `index.js` and `input/index.html`.

`index.js`

```javascript
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

`input/index.html`

```html
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

```
node index.js
```

When it's done, `output/output.txt` will be created.

`output/output.txt` contains the results of the seoQuickChecker function.

## API Reference

### 1. defaultRules module

1. `defaultRules.all`

```javascript
defaultRules.all;
//=>
// [
//   aMissingRel,
//   noMetaDescriptionInHead,
//   noMetaKeywordsInHead,
//   noTitleInHead,
//   imgMissingAlt,
//   moreThan1H1,
//   moreThan15Strong,
// ]
```

To select some of them, you can get the functions one by one like this.

2. `defaultRules.aMissingRel`
3. `defaultRules.noMetaDescriptionInHead`
4. `defaultRules.noMetaKeywordsInHead`
5. `defaultRules.noTitleInHead`
6. `defaultRules.imgMissingAlt`
7. `defaultRules.moreThan1H1`
8. `defaultRules.moreThan15Strong`

If you want to check all the default rules, you can write like this.

```
const notices = seoQuickChecker(dom, defaultRules.all);
```

If you want to check, for example, `defaultRules.aMissingRel`
and `defaultRules.noMetaDescriptionInHead`, you can use [] to wrap them because each of them is the function but second param of seoQuickChecker is an array.

```javascript
const notices = seoQuickChecker(dom, [
  defaultRules.aMissingRel,
  defaultRules.noMetaDescriptionInHead,
]);
```

### 2. ruleBuilders module

1. `ruleBuilders.tagCountMoreThan(tag, maxCount)` : `function`

- `tag` {string}: Required.
- `maxCount` {number}: Required. For example, if you want to check if there are 10 or less tags, you can set `maxCount = 10`. In this case 10 is ok, but 11 or more will be reported as a notice of `seoQuickChecker` function.

2. `ruleBuilders.tagCountMoreThan(tag, attr)` : `function`

- `tag` {string}: Required.
- `attr` {number}: Required.

3. `ruleBuilders.tagExists(tag)` : `function`

- `tag` {string}: Required.

If you want to use custom rules by using this module, you can write like this.

```javascript
// h2 tags must be 1 or less
const customRule1 = ruleBuilders.tagCountMoreThan('h2', 1);
// find span tags without class attr
const customRule2 = ruleBuilders.tagMissingAttr('span', 'class');
// find meta[name=robot] which is the child of head
const customRule3 = ruleBuilders.tagExists('head meta[name=robots]');

const notices = seoQuickChecker(dom, [customRule1, customRule2, customRule3]);
```

### 3. getDom module

1. `getDom.fromFile(filePath, encoding)` : `Promise<function>`

- `filePath` {string}: Required.
- `encoding` {string}: Optional. Defaults to "utf8".

2. `getDom.fromStream(rs)` : `Promise<function>`

- `filePath` {stream.Readable}: Required.

### 4. seoQuickChecker function

1. `seoQuickChecker(dom, rules)` : `string[]`

- `dom` {function}: Required. The function returned from `getDom.fromFile` or `getDom.fromStream`.
- `rules` {function[]}: Required. An array contains the functions defined in `defaultRules` modules or user defined rules created by `ruleBuilders` module.

### 5. output module

1. `output.toConsoleLog(notices, connector)` : `undefined`

- `notices` {string[]}: Required. Use the returning value of `seoQuickChecker` function.
- `connector` {string}: Optional. Defaults to "\n". A charactor to join the elements of notices array.

2. `output.toFile(filePath, notices, connector, options)` : `Promise<undefined>`

- `filePath` {string}: Required. Output file path.
- `notices` {string[]}: Required. Use the returning value of `seoQuickChecker` function.
- `connector` {string}: Optional. Defaults to "\n". A charactor to join the elements of notices array.
- `options` {Object}: Optional. Defaults to {}. Please see `https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback` for more details.

3. `output.toStream(ws, notices, connector)` : `Promise<undefined>`

- `filePath` {string}: Required. Output file path.
- `notices` {string[]}: Required. Use the returning value of `seoQuickChecker` function.
- `connector` {string}: Optional. Defaults to "\n". A charactor to join the elements of notices array.
- `encoding` {string}: Optional. Defaults to "utf8".

## More Examples

If you want to use streaming API of Node.js to `getDom`, you can call like this.

`const dom = await getDom.fromStream(rs);`

Full example of `index.js`.

```javascript
'use strict';

const fs = require('fs');
const {
  seoQuickChecker,
  defaultRules,
  getDom,
  output,
} = require('seo-quick-checker');

(async function() {
  try {
    const rs = fs.createReadStream('./input/index.html', 'utf8');
    const dom = await getDom.fromStream(rs);
    const notices = seoQuickChecker(dom, defaultRules.all);
    await output.toFile('./output/output.txt', notices);
  } catch (error) {
    console.error(error);
  }
})();
```

If you want to use streaming API of Node.js to `output`, you can call like this.

`await output.toStream(ws, notices);`

Full example of `index.js`.

```javascript
'use strict';

const fs = require('fs');
const {
  seoQuickChecker,
  defaultRules,
  getDom,
  output,
} = require('seo-quick-checker');

(async function() {
  try {
    const rs = fs.createReadStream('./input/index.html', 'utf8');
    const dom = await getDom.fromStream(rs);
    const notices = seoQuickChecker(dom, defaultRules.all);
    const ws = fs.createWriteStream('./output/output.txt', 'utf8');
    await output.toStream(ws, notices);
  } catch (error) {
    console.error(error);
  }
})();
```

If you want to `console.log` the notices, you can call like this.
Please be careful, there is no `await` before `output.toConsoleLog(notices)`.

`output.toConsoleLog(notices);`

Full example of `index.js`.

```javascript
'use strict';

const {
  seoQuickChecker,
  defaultRules,
  getDom,
  output,
} = require('seo-quick-checker');

(async function() {
  try {
    const rs = fs.createReadStream('./input/index.html', 'utf8');
    const dom = await getDom.fromStream(rs);
    const notices = seoQuickChecker(dom, defaultRules.all);
    output.toConsoleLog(notices);
  } catch (error) {
    console.error(error);
  }
})();
```

## Testing

One time tesing

`npm run test`

Watch the testing

`npm run watchtest`

## Format and Lint

To run Prettier

`npm run fmt`

To run ESLint

`npm run lint`
