"use strict";

const { CustomFormatter } = require('../formatter')
var njstrace = require('njstrace').inject({ formatter: new CustomFormatter() });

const { getRandomZeroOrOne, getRandomInt } = require("../randomNumberGenerator");
const test = require('ava');

test('foo', async ava => {
  const randomBoolValue = getRandomZeroOrOne();
  ava.is(true, randomBoolValue);
});

test('bar', ava => {
  const randomInt = getRandomInt(100);
  ava.is(true, randomInt >= 50);
});
