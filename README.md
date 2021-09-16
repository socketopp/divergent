# divergent


Divergent run a specific ava test case until it both passes and fails, then it to analyse the trace of both runs and provide the user with useful information, if the execution path or return values diverged from a passing and a failing run. 

(Note: This project is a PoC, just wanted to see if this was possible).


### Setup
1. Install "njstrace": "^2.0.1" and "ava": "^3.15.0" with npm. 
2. Set ava as test in package.json.
```
 "scripts": {
    "test": "ava"
  },
```
3. Add these two lines in the top of the test file you want to analyze. Make sure it finds the formatter. 
```
const { CustomFormatter } = require('../formatter')
var njstrace = require('njstrace').inject({ formatter: new CustomFormatter() });
```

### How to use

Run the index.js with the test case you want to analyze.

```
$ node src/index.js foo
Running testcase iteration 1
Running testcase iteration 2
Running testcase iteration 3
Analyzing results...
Successful run.
{
  retLineRes: {
    pass: {
      functionName: 'getRandomZeroOrOne',
      file: 'C:~\\src\\randomNumberGenerator.js',
      divergentLine: 10
    },
    fail: {
      functionName: 'getRandomZeroOrOne',
      file: '~\\src\\randomNumberGenerator.js',
      divergentLine: 12
    }
  },
  retLineValueRes: {
    pass: {
      functionName: 'getRandomInt',
      file: '~\\src\\randomNumberGenerator.js',
      divergentValue: 59
    },
    fail: {
      functionName: 'getRandomInt',
      file: '~\\src\\randomNumberGenerator.js',
      divergentValue: 37
    }
  }
}
```

### Authors
* **Sokrates Lamprou** - *Initial work* - [Socketopp](https://github.com/Socketopp)

### Acknowledgments
- [njsTrace](https://github.com/ValYouW/njsTrace)
- [ava](https://github.com/avajs/ava)
