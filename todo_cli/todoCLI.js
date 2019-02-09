
const readline = require('readline');
const fs = require('fs');

const rl =  readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

var listArray = [];

// [STRETCH] Load a to-do list from a JSON file as an OPTIONAL script argument
if (process.argv.length >= 3) {
    fs.readFile(process.argv[2], (err, data) => {
        let objArray = JSON.parse(data);
        // Convert JSON file's data from array of objects into an array of arrays
        // Each inner sub-array is made up of each list's item title and completion checkmark
        for (let index = 0; index <= objArray.length-1; index += 1) {
            if (objArray[index].completed == true) {
                listArray.push([objArray[index].title, '✓']);
            } else if (objArray[index].completed == false) {
                listArray.push([objArray[index].title, ' ']);
            }
        }
    });
}

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

// [STRETCH]
// Asks user for file path to save list and saves list to specified file path as JSON file
function saveList () {
    rl.question('\nWhere?\n> ', answer => {
        // Convert list structure from array of arrays into array of objects
        const arrayOfObjects = listArray.map((arr) => {
            if (arr[1] == " "){
                return {title: arr[0], completed: false};
            } else if (arr[1] == '✓') {
                return {title: arr[0], completed: true};
            }
        });
        fs.writeFileSync(answer, JSON.stringify(arrayOfObjects));
        rl.question(`\nList saved to "${answer}"\n${menu}`, answer => {
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
