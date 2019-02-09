
const readline = require('readline');
const fs = require('fs');

const rl =  readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

var listArray = [];

const menu = '\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n> ';

// Displays contents of the to-do list then the To-do Menu again
function viewList () {
    if (listArray.length == 0) {
        console.log('\nLife is empty...');
    } else {
        for (let index in listArray) {
            console.log(`\n${index} [${listArray[index][1]}] ${listArray[index][0]}`);
        }
    }
    rl.question(menu, answer => {
        openMenu(answer);
    });
};

// Asks user what item to add to the list and saves their response as new item at end of to-do list
function newItem () {
    rl.question('\nWhat?\n> ', answer => {
        listArray.push([answer, ' ']);
        rl.question(menu, answer => {
            openMenu(answer);
        });
    });
};

// Marks item with given index in argument as complete and tells user which item was marked
// Then re-displays the To-do Menu
function completeItem(item) {
    listArray[item][1] = '✓';
    rl.question(`\nCompleted "${listArray[item][0]}"\n${menu}`, answer => {
        openMenu(answer);
    });
};

// Removes item with given index in argument from list and tells user which item was deleted
// Then re-displays the To-do Menu
function deleteItem(item) {
    let removed = listArray[item][0];
    listArray.splice(item,1);
    rl.question(`\nDeleted "${removed}"\n${menu}`, answer => {
        openMenu(answer);
    });
};

// Quits the application saying a farewell 
function quitList () {
    console.log('See you soon! 😄');
    rl.close(); // otherwise readline interface will keep running
};

// [STRETCH] If file path argument is given to script, use it as suggested path to save file
function saveList () {
    rl.question(`\nWhere? (${process.argv[2]})\n> `, answer => {
        // Convert list structure from array of arrays into array of objects
        const arrayOfObjects = listArray.map((arr) => {
            if (arr[1] == " "){
                return {title: arr[0], completed: false};
            } else if (arr[1] == '✓') {
                return {title: arr[0], completed: true};
            }
        });
        let outputFile;
        if (answer != "") {
            outputFile = answer; // Use file path inputted by user
        } else {    
            outputFile = process.argv[2]; // Use suggested file path if user just presses Enter 
        }
        fs.writeFileSync(outputFile, JSON.stringify(arrayOfObjects));
        rl.question(`\nList saved to "${outputFile}"\n${menu}`, answer => {
            openMenu(answer);
        });
    });
}

// Function takes a string argument and calls appropriate function based on that argument 
const openMenu = (answer) => {
    if (answer === 'v') {
        viewList();
    } else if (answer === 'n') {
        newItem();
    } else if (answer[0] === 'c') {
        completeItem(answer.slice(1));
    } else if (answer[0] === 'd') {
        deleteItem(answer.slice(1));
    } else if (answer === 'q') {    
        quitList();
    } else if (answer === 's') {
        saveList();
    }
};

// Launch CLI todo list application
console.log(`Welcome to Todo CLI!\n--------------------`);
rl.question(menu, answer => {
    openMenu(answer);
});