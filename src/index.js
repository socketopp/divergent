'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const errorMessages = {
  ARG_ERROR: 'Error: Argument error occured',
  TEST_NOT_FOUND: 'Error: Test title not found',
}

const parseStackTrace = (trace) => {
  const traces = JSON.parse("[" + trace.slice(0, -1) + "]");
  return traces;
}

let passRunTrace = false;
let failRunTrace = false;
const MAX_RUNS = 100;

const checkRetLine = (passRun, failRun) => {
  for (let i = 0; i < passRun.length; i++) {
    const onExit = passRun[i].state === 'onExit' && failRun[i].state === 'onExit';
    const hasDifferentValues = passRun[i].retLine !== failRun[i].retLine;
    if (onExit && hasDifferentValues) {
      return {
        pass: { functionName: passRun[i].name, file: passRun[i].file, divergentLine: passRun[i].retLine },
        fail: { functionName: failRun[i].name, file: failRun[i].file, divergentLine: failRun[i].retLine }
      };
    }
  }
};

const checkRetValue = (passRun, failRun) => {
  for (let i = 0; i < passRun.length; i++) {
    const onExit = passRun[i].state === 'onExit' && failRun[i].state === 'onExit';
    const hasDifferentValues = passRun[i].hasRetValue !== failRun[i].hasRetValue;
    if (onExit && hasDifferentValues) {
      return {
        pass: { functionName: passRun[i].name, file: passRun[i].file, divergentValue: passRun[i].hasRetValue },
        fail: { functionName: failRun[i].name, file: failRun[i].file, divergentValue: failRun[i].hasRetValue }
      };
    }
  }
};

/**
 * 
 * @param {array[string]} passRun -  
 * @param {*} failRun 
 * @returns 
 */
const analyzeTestCase = (passRun, failRun) => {
  console.log('Analyzing results...');
  let retLineRes;
  let retLineValueRes;

  retLineRes = checkRetLine(passRun, failRun);
  retLineValueRes = checkRetValue(passRun, failRun);

  return { retLineRes, retLineValueRes };
}

const runTestCase = async (tua) => {
  let stdout, stderr;
  try {
    ({ stdout, stderr } = await exec(`npx ava --match=${tua}`));
    passRunTrace = parseStackTrace(stderr);

  } catch (err) {
    if (err.stdout && err.stdout.includes('Couldn’t find any matching tests')) {
      console.error(errorMessages['TEST_NOT_FOUND']);
      return true;
    }
    failRunTrace = parseStackTrace(err.stderr);
  }
}

const run = async () => {
  if (process.argv.length != 3) {
    console.error(errorMessages['ARG_ERROR']);
    return
  }
  const tua = process.argv[2]; // TUA = Test Under Analysis
  let iteration = 0;

  while (true) { // iteration <= MAX_RUNS 
    iteration++;
    const err = await runTestCase(tua);
    if (err) return;
    console.log(`Running testcase iteration ${iteration}`);
    if (passRunTrace && failRunTrace) {
      break;
    }
    if (iteration === MAX_RUNS) {
      break;
    }
  }

  if (!passRunTrace || !failRunTrace) {
    console.log('Maximum number of iterations finished. No flakiness detected')
    return;
  }
  const result = analyzeTestCase(passRunTrace, failRunTrace);
  console.log('Successful run.');
  console.log(result);
}

run();
