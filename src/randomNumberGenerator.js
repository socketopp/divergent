"use strict";

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const getRandomZeroOrOne = () => {
    const randInt = getRandomInt(100);
    if (randInt > 50) {
        return true;
    } else {
        return false;
    }
};

module.exports = { getRandomZeroOrOne }
