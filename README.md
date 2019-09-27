# clover-json

[![npm version](https://badge.fury.io/js/%40technote-space%2Fclover-json.svg)](https://badge.fury.io/js/%40technote-space%2Fclover-json)
[![Build Status](https://github.com/technote-space/clover-json/workflows/Build/badge.svg)](https://github.com/technote-space/clover-json/actions)
[![Coverage Status](https://coveralls.io/repos/github/technote-space/clover-json/badge.svg?branch=master)](https://coveralls.io/github/technote-space/clover-json?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/clover-json/badge)](https://www.codefactor.io/repository/github/technote-space/clover-json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/clover-json/blob/master/LICENSE)

Parse [clover](https://www.atlassian.com/software/clover) report files, and return a JSON representation in a [lcov-parse](https://github.com/davglass/lcov-parse) compatible manner.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Usage](#usage)
- [Sample Data](#sample-data)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
1. Install  
`npm i @technote-space/clover-json`
1. 
```typescript
import { parseFile, parseContent } from "@technote-space/clover-json";

async function run(): Promise<void> {
    // Parse by file path
    const json1 = await parseFile('filepath.xml');

    // Parse by file contents
    const json2 = await parseContent('<?xml version="1.0" ?><coverage>...</coverage>');
}

run();
```

## Sample Data
[`__tests__/assets/clover1.xml`](__tests__/assets/clover1.xml)
```json
[
  {
    "file": "coveralls/lib/client.js",
    "functions": {
      "details": [
        {
          "hit": 2,
          "line": 5,
          "name": "upload"
        }
      ],
      "found": 1,
      "hit": 1
    },
    "lines": {
      "details": [
        {
          "hit": 2,
          "line": 6
        },
        {
          "hit": 2,
          "line": 7
        },
        {
          "hit": 2,
          "line": 8
        },
        {
          "hit": 2,
          "line": 9
        }
      ],
      "found": 4,
      "hit": 4
    },
    "title": "Client"
  },
  {
    "file": "coveralls/lib/configuration.js",
    "functions": {
      "details": [
        {
          "hit": 4,
          "line": 6,
          "name": "fromEnvironment"
        }
      ],
      "found": 1,
      "hit": 1
    },
    "lines": {
      "details": [
        {
          "hit": 4,
          "line": 7
        },
        {
          "hit": 4,
          "line": 8
        },
        {
          "hit": 2,
          "line": 9
        },
        {
          "hit": 2,
          "line": 10
        },
        {
          "hit": 4,
          "line": 11
        },
        {
          "hit": 2,
          "line": 12
        },
        {
          "hit": 2,
          "line": 13
        },
        {
          "hit": 4,
          "line": 14
        },
        {
          "hit": 4,
          "line": 15
        }
      ],
      "found": 9,
      "hit": 9
    },
    "title": "Configuration"
  },
  {
    "file": "coveralls/lib/git_commit.js",
    "functions": {
      "details": [
        {
          "hit": 2,
          "line": 6,
          "name": "toJSON"
        }
      ],
      "found": 1,
      "hit": 1
    },
    "lines": {
      "details": [
        {
          "hit": 2,
          "line": 7
        },
        {
          "hit": 2,
          "line": 8
        },
        {
          "hit": 2,
          "line": 9
        },
        {
          "hit": 2,
          "line": 10
        },
        {
          "hit": 2,
          "line": 11
        },
        {
          "hit": 0,
          "line": 12
        },
        {
          "hit": 0,
          "line": 13
        },
        {
          "hit": 2,
          "line": 14
        },
        {
          "hit": 2,
          "line": 15
        }
      ],
      "found": 9,
      "hit": 7
    },
    "title": "GitCommit"
  }
]
```
