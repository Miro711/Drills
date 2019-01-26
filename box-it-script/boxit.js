#!/usr/bin/env node

/** 
When text file with a shebang (#!) is used as if it's an executable, the program loader parses rest 
of the file's initial line as an interpreter directive.
The specified interpreter program is executed, passing to it as an argument the path that was 
initially used when attempting to run the script so that the program may use the file as input data.
*/

// On command line, execute chmod +x boxit.js to set file as executable script

// boxIt function takes array of strings and returns string where each is in single column table
function boxIt (stringsArray) {

    // Returns empty box if input argument array is empty
    if (stringsArray.length == 0) {
        return drawTopBorder(0) + '\n' + drawBottomBorder(0);
    }

    // Determine width of single column box based on length of longest string in array
    let boxWidth = stringsArray[0].length;
    for (let element of stringsArray) {
        if (element.length > boxWidth) {
            boxWidth = element.length;
        }
    }

    // First row is just box top border of determined box width
    let boxRow = drawTopBorder(boxWidth) + '\n';

    // Loop through first to before last string in array and concatenate each row
    for (let index = 0; index <= stringsArray.length-2; index += 1) {
        // Each row is drawBarsAround applied to:
        // {last string in array right padded with extra space to fill entire box width}
        // Followed by box middle border of determined box width
        boxRow = boxRow + drawBarsAround(stringsArray[index]+' '.repeat(boxWidth-stringsArray[index].length)) + '\n' + drawMiddleBorder(boxWidth) + '\n';  
    }

    // Before last row is drawBarsAround applied to:
    // {last string in array right padded with extra space to fill entire box width}
    boxRow = boxRow + drawBarsAround(stringsArray[stringsArray.length-1]+' '.repeat(boxWidth-stringsArray[stringsArray.length-1].length)) + '\n';
    
    // Last row is just box bottom border of determined box width
    boxRow = boxRow + drawBottomBorder(boxWidth); 
    return boxRow;
}

// drawBarsAround function takes string as argument and returns it surrounded with vertical lines
function drawBarsAround (str) {
    return '┃' + str + '┃';
}

// drawBottomBorder function takes number as argument and returns box bottom border with line of that length
function drawBottomBorder (bottomLength) {
    return '┗' + drawLine(bottomLength) + '┛';
}

// drawMiddleBorder function takes number as argument and returns box middle border with line of that length
function drawMiddleBorder (middleLength) {
    return '┣' + drawLine(middleLength) + '┫';
}

// drawTopBorder function takes number as argument and returns box top border with line of that length
function drawTopBorder (topLength) {
    return '┏' + drawLine(topLength) + '┓';
}

// drawLine function takes number as argument and returns that number of horizontal bars as a string
function drawLine (lineLength) {
    return '━'.repeat(lineLength);
}


// Turning boxit.js file into script that can be given string arguments and run from command line
// In terminal, execute $ node boxit.js 'Jon Snow' 'Cersei Lannister' 'Daenerys Targaryen'
// $ node boxit.js returns empty box
const arg = process.argv.slice(2); // Extracts script arguments as array of strings
console.log(boxIt(arg));


// Read CSV file characters.csv with comma separated strings inputted on new lines
// Return array of comma separated strings 
const fs = require('fs'); 
const fileContents = fs.readFileSync('characters.csv').toString().split('\n');

// Divide comma separated strings array into two arrays for first and second columns, respectively
const firstCol = fileContents.map(element => element.split(',')[0]);
const secondCol = fileContents.map(element => element.split(',')[1]);

// boxIt2 takes 2 arrays of strings and returns string where each array maps to one column in 2-column table 
function boxIt2 (stringsArray1, stringsArray2) {

    if (stringsArray1.length == 0 && stringsArray2.length == 0) {
        return drawTopBorder(0) + '\n' + drawBottomBorder(0);
    }

    const width = function (arr) {
        let boxWidth = arr[0].length;
        for (let element of arr) {
            if (element.length > boxWidth) {
                boxWidth = element.length;
            }
        }
        return boxWidth;
    }
    const boxWidth1 = width(stringsArray1);
    const boxWidth2 = width(stringsArray2);

    let boxRow = drawTopBorder(boxWidth1) + drawTopBorder(boxWidth2) + '\n';
    for (let index = 0; index <= stringsArray1.length-2; index += 1) {
        boxRow = boxRow + drawBarsAround(stringsArray1[index]+' '.repeat(boxWidth1-stringsArray1[index].length)) + drawBarsAround(stringsArray2[index]+' '.repeat(boxWidth2-stringsArray2[index].length)) + '\n' + drawMiddleBorder(boxWidth1) + drawMiddleBorder(boxWidth2) + '\n';  
    }
    boxRow = boxRow + drawBarsAround(stringsArray1[stringsArray1.length-1]+' '.repeat(boxWidth1-stringsArray1[stringsArray1.length-1].length)) + drawBarsAround(stringsArray2[stringsArray2.length-1]+' '.repeat(boxWidth2-stringsArray2[stringsArray2.length-1].length)) + '\n';
    boxRow = boxRow + drawBottomBorder(boxWidth1) + drawBottomBorder(boxWidth2); 
    return boxRow;
}

console.log(boxIt2(firstCol,secondCol)); // Apply boxIt2 function to first and second columns arrays

/** Example usage for testing functions
 
console.log(drawLine(0));
console.log(drawLine(8));
console.log(drawTopBorder(0));
console.log(drawTopBorder(4));
console.log(drawMiddleBorder(0));
console.log(drawMiddleBorder(8));
console.log(drawBottomBorder(0));
console.log(drawBottomBorder(2));
console.log(drawBarsAround("My name is Dan"));
console.log(drawBarsAround("You are Jane  "));
console.log(drawBarsAround("  You are Bill"));
boxIt(['Jon Snow']);
console.log(boxIt(['Jon Snow']));
boxIt(['Jon Snow', 'Cersei Lannister']);
console.log(boxIt(['Jon Snow', 'Cersei Lannister']));
*/