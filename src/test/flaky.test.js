"use strict";

const { CustomFormatter } = require('../formatter')
var njstrace = require('njstrace').inject({ formatter: new CustomFormatter() });
const { getRandomZeroOrOne } = require("../randomNumberGenerator");
const test = require('ava');

test('foo', async ava => {
  const randomBoolValue = getRandomZeroOrOne();
  ava.is(true, randomBoolValue);
});

test('bar', ava => {
  const randomBoolValue = getRandomZeroOrOne();
  ava.is(true, randomBoolValue);
});
