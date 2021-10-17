'use strict';
const resultEl = document.getElementById('result'),
    lengthEl = document.getElementById('length'),
    letterEl = document.getElementById('letters'),
    numbersEl = document.getElementById('numbers'),
    symbolsEl = document.getElementById('symbols'),
    generateEl = document.getElementById('generate'),
    clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    letter: getRandomLetter,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea'),
        password = resultEl.innerText;

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value,
        hasLetter = letterEl.checked,
        hasNumber = numbersEl.checked,
        hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLetter,
        hasNumber,
        hasSymbol,
        length
    );
});

function generatePassword(letter, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = letter + number + symbol,
        typesArr = [{ letter }, { number }, { symbol }].filter(
            (item) => Object.values(item)[0]
        );
    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

function getRandomLetter() {
    const Letter = 'abcdefghijkmnlopqrstuvwxyzABCDEFGHIJKMNLOPQRSTUVWXYZ';
    return Letter[Math.floor(Math.random() * Letter.length)];
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%*&(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
