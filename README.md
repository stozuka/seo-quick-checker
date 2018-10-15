# seo-quick-checker [![CircleCI](https://circleci.com/gh/stozuka/seo-quick-checker.svg?style=svg)](https://circleci.com/gh/stozuka/seo-quick-checker) [![npm version](https://badge.fury.io/js/seo-quick-checker.svg)](https://badge.fury.io/js/seo-quick-checker) ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

A package to quickly check if the HTML is SEO friednly. It outputs the notice messages after parsing the HTML file provided.

## Installation

`npm i seo-quick-checker`

## Getting Started

### 1. Basic Setup

Create a project.

```
mkdir test
cd test
npm init
npm i
```

### 2. Create Files

Create folders and files inside the project.

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
  defaultRules,
  ruleBuilders,
  getDom,
  seoQuickChecker,
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

When it's successfuly done, `output/output.txt` will be created.

`output/output.txt`

```
There are(is) 1 a without rel.
This HTML does not have head meta[name=description] tag.
This HTML does not have head meta[name=keywords] tag.
This HTML does not have head title tag.
There are(is) 1 img without alt.
This HTML has more than 1 h1.
This HTML has more than 15 strong.
```

## API Reference

List of APIs

1. defaultRules module
1. ruleBuilders module
1. getDom module
1. seoQuickChecker function
1. output module

### 1. defaultRules module

A module contains default rule functions.

#### `defaultRules.all` : `Function[]`

Return all the functions of the default rules.

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

#### `defaultRules.aMissingRel` : `Function`

Check if there are \<a\> tags missing rel attribute.

#### `defaultRules.noMetaDescriptionInHead` : `Function`

Check if meta description exists in head.

#### `defaultRules.noMetaKeywordsInHead` : `Function`

Check if meta keywords exists in head.

#### `defaultRules.noTitleInHead` : `Function`

Check if title exists in head.

#### `defaultRules.imgMissingAlt` : `Function`

Check if there are \<img\> tags missing alt attribute.

#### `defaultRules.moreThan1H1` : `Function`

Check if there are more than 1 h1 tags.

#### `defaultRules.moreThan15Strong` : `Function`

Check if there are more than 15 strong tags.

#### > Usage

If you want to check all the default rules.

```javascript
const notices = seoQuickChecker(dom, defaultRules.all);
```

If you want to check, for example, `defaultRules.aMissingRel`
and `defaultRules.noMetaDescriptionInHead`

You can use `[]` to wrap them because each of them is the function but second param of `seoQuickChecker` is an array.

```javascript
const notices = seoQuickChecker(dom, [
  defaultRules.aMissingRel,
  defaultRules.noMetaDescriptionInHead,
]);
```

### 2. ruleBuilders module

A module to create rule functions.

#### `ruleBuilders.tagCountMoreThan(tag, maxCount)` : `Function`

Create a function which checks if the number of tag is more than maxCount

| params   |  type  | description                                                                                     |
| :------- | :----: | :---------------------------------------------------------------------------------------------- |
| tag      | string | Required                                                                                        |
| maxCount | number | Required. Max count of the tag. Notice will be created if the count is more than this maxCount. |

#### `ruleBuilders.tagMissingAttr(tag, attr)` : `Function`

Create a function which checks if the tag is missing the attribute.

| params |  type  | description |
| :----- | :----: | :---------- |
| tag    | string | Required.   |
| attr   | string | Required.   |

#### `ruleBuilders.tagExists(tag)` : `Function`

Create a function which checks if the tag exists.

| params |  type  | description |
| :----- | :----: | :---------- |
| tag    | string | Required.   |

#### > Usage

If you want to use custom rules by using this module, you can write like this.

```javascript
// Check if the number of h2 is more than 1.
const customRule1 = ruleBuilders.tagCountMoreThan('h2', 1);
// Check if span tag is missing class attribute.
const customRule2 = ruleBuilders.tagMissingAttr('span', 'class');
// Check if meta[name=robot] exists in head.
const customRule3 = ruleBuilders.tagExists('head meta[name=robots]');

const notices = seoQuickChecker(dom, [customRule1, customRule2, customRule3]);
```

### 3. getDom module

Get `dom` function from file or stream.

#### `getDom.fromFile(filePath[, encoding])` : `Promise<function>`

Get dom function from file.

| params   |  type  | description         |
| :------- | :----: | :------------------ |
| filePath | string | Required.           |
| encoding | string | Defaults to "utf8". |

#### `getDom.fromStream(rs)` : `Promise<function>`

Get dom function from stream.

| params |      type       | description |
| :----- | :-------------: | :---------- |
| rs     | stream.Readable | Required.   |

### 4. seoQuickChecker function

Check the HTML using the rules provided. Return the notices.

#### `seoQuickChecker(dom, rules)` : `string[]`

| params |    type    | description                                                                                                                         |
| :----- | :--------: | :---------------------------------------------------------------------------------------------------------------------------------- |
| dom    |  Function  | Required. The function returned from `getDom.fromFile` or `getDom.fromStream`.                                                      |
| rules  | Function[] | Required. An array contains the functions defined in `defaultRules` modules or user defined rules created by `ruleBuilders` module. |

### 5. output module

Output the notices to console.log, file, or stream.

#### `output.toConsoleLog(notices[, connector])` : `undefined`

Outputs to console.log.

| params    |   type   | description                                                              |
| :-------- | :------: | :----------------------------------------------------------------------- |
| notices   | string[] | Required. You can use the returning value of `seoQuickChecker` function. |
| connector |  string  | Defaults to "\n".                                                        |

#### `output.toFile(filePath, notices[, connector][, options])` : `Promise<undefined>`

Outputs to file.

| params    |   type   | description                                                                                                                |
| :-------- | :------: | :------------------------------------------------------------------------------------------------------------------------- |
| filePath  |  string  | Required.                                                                                                                  |
| notices   | string[] | Required. You can use the returning value of `seoQuickChecker` function.                                                   |
| connector |  string  | Defaults to "\n".                                                                                                          |
| options   |  Object  | Defaults to `{}`. Please see `https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback` for more details. |

#### `output.toStream(ws, notices[, connector])` : `Promise<undefined>`

Outputs to stream.

| params    |      type       | description                                                              |
| :-------- | :-------------: | :----------------------------------------------------------------------- |
| ws        | stream.Writable | Required.                                                                |
| notices   |    string[]     | Required. You can use the returning value of `seoQuickChecker` function. |
| connector |     string      | Defaults to "\n".                                                        |
| encoding  |     string      | Defaults to "utf8".                                                      |

## More Examples

### Use stream to getDom

`const dom = await getDom.fromStream(rs);`

Full example of `index.js`.

```javascript
'use strict';

const fs = require('fs');
const {
  defaultRules,
  ruleBuilders,
  getDom,
  seoQuickChecker,
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

### Use stream to output.

`await output.toStream(ws, notices);`

Full example of `index.js`.

```javascript
'use strict';

const fs = require('fs');
const {
  defaultRules,
  ruleBuilders,
  getDom,
  seoQuickChecker,
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

### Output to console.log

`output.toConsoleLog(notices);`

Please be careful, there is no `await` before `output.toConsoleLog(notices)`.

Full example of `index.js`.

```javascript
'use strict';

const fs = require('fs');

const {
  defaultRules,
  ruleBuilders,
  getDom,
  seoQuickChecker,
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

## LICENSE

MIT
