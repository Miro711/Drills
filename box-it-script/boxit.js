#!/usr/bin/env node

// When text file with a shebang is used as if it is an executable, the program loader parses the rest 
// of the file's initial line as an interpreter directive
// The specified interpreter program is executed, passing to it as an argument the path that was 
// initially used when attempting to run the script so that the program may use the file as input data.
// On command line, execute chmod +x boxit.js to set file as executable script

function boxIt (stringsArray) {

    if (stringsArray.length == 0) {
        return drawTopBorder(0) + '\n' + drawBottomBorder(0);
    }
    let boxWidth = stringsArray[0].length;
    for (let element of stringsArray) {
        if (element.length > boxWidth) {
            boxWidth = element.length;
        }
    }
    let boxRow = drawTopBorder(boxWidth) + '\n';
    for (let index = 0; index <= stringsArray.length-2; index += 1) {
        boxRow = boxRow + drawBarsAround(stringsArray[index]+' '.repeat(boxWidth-stringsArray[index].length)) + '\n' + drawMiddleBorder(boxWidth) + '\n';  
    }
    boxRow = boxRow + drawBarsAround(stringsArray[stringsArray.length-1]+' '.repeat(boxWidth-stringsArray[stringsArray.length-1].length)) + '\n';
    boxRow = boxRow + drawBottomBorder(boxWidth); 
    return boxRow;
}

function drawBarsAround (str) {
    return '┃' + str + '┃';
}

function drawBottomBorder (bottomLength) {
    //String.fromCharCode(250F)//String.fromCharCode(2513)
    return '┗' + drawLine(bottomLength) + '┛';
}

function drawMiddleBorder (middleLength) {
    return '┣' + drawLine(middleLength) + '┫';
}

function drawTopBorder (topLength) {
    return '┏' + drawLine(topLength) + '┓';
}

function drawLine (lineLength) {
    return '━'.repeat(lineLength);
}

const arg = process.argv.slice(2);
console.log(boxIt(arg));

// console.log(drawLine(0));
// console.log(drawLine(8));
// console.log(drawTopBorder(0));
// console.log(drawTopBorder(4));
// console.log(drawMiddleBorder(0));
// console.log(drawMiddleBorder(8));
// console.log(drawBottomBorder(0));
// console.log(drawBottomBorder(2));
// console.log(drawBarsAround("My name is Dan"));
// console.log(drawBarsAround("You are Jane  "));
// console.log(drawBarsAround("  You are Bill"));
// boxIt(['Jon Snow']);
// console.log(boxIt(['Jon Snow']));
// boxIt(['Jon Snow', 'Cersei Lannister']);
// console.log(boxIt(['Jon Snow', 'Cersei Lannister']));



//const fs = require('fs');
// function readCsv() {
//     const fileContents = fs.readFileSync('characters.csv').toString();
//     return fileContents.split('\n');
// }
// const csvLines = drawTable(readCsv());
// csvLines.forEach(line => console.log(line));

