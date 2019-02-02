#!/usr/bin/env node

// Turtle class
class Turtle {

    // Constructor initializes turtle object's x & y coordinates, facing and array of visited points
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.path = [[x,y]];
        this.face = 'east';
    }
}

// forward(steps) method updates object's x & y coordinates based on steps and current facing 
// Also stores all visited points on the way
// Returns object itself
Turtle.prototype.forward = function(steps) {
    
    switch (this.face) {
        case 'east':
            for (let step = 1; step <= steps; step += 1) {
                this.path.push([this.x+step, this.y]);
            }
            this.x += steps;
            break;
        case 'west':
            for (let step = 1; step <= steps; step += 1) {
                this.path.push([this.x-step, this.y]);
            }
            this.x -= steps;
            break;
        case 'north':
            for (let step = 1; step <= steps; step += 1) {
                this.path.push([this.x, this.y-step]);
            }
            this.y -= steps;
            break;
        case 'south':
            for (let step = 1; step <= steps; step += 1) {
                this.path.push([this.x, this.y+step]);
            }
            this.y += steps;
            break;
    }
    return this;
}

// right() method updates turtle object's facing based on its current facing and returns object itself
Turtle.prototype.right = function () {
    switch (this.face) {
        case 'east':
            this.face = 'south';
            break;
        case 'west':
            this.face = 'north';
            break;
        case 'north':
            this.face = 'east';
            break;
        case 'south':
            this.face = 'west';
            break;
    }
    return this;
}

// left() method updates turtle object's facing based on its current facing and returns object itself
Turtle.prototype.left = function () {
    switch (this.face) {
        case 'east':
            this.face = 'north';
            break;
        case 'west':
            this.face = 'south';
            break;
        case 'north':
            this.face = 'west';
            break;
        case 'south':
            this.face = 'east';
            break;
    }
    return this;    
}

//allPoints() method returns array of all visited points/coordinates
Turtle.prototype.allPoints = function () {
    return this.path;
}

//print() method returns string of turtle's path on a grid
Turtle.prototype.print = function () {
    let width = Math.max(...this.path.map(x => x[0])) + 1; // Maximum grid width needed 
    let height = Math.max(...this.path.map(x => x[1])) + 1; // Maximum grid height needed
    
    // Fill multi-dimensional array grid with □
    let grid = [];
    for (let i = 0; i <= width-1; i += 1) {
        for (let j = 0; j <= height-1; j += 1) {
            grid[j] = Array(width).fill('□');
        }
    }

    // Fill grid locations corresponding to visited points/coordinates with ■
    for (let k = 0;  k <= this.path.length-1; k += 1) {
        grid[this.path[k][1]][this.path[k][0]] = '■';
    }
    
    // Transform multi-dimensional grid into a string concatenated with \n
    let gridString = "";
    for (let row = 0; row <= grid.length-1;row += 1) {
        gridString += grid[row].join('') + '\n';
    }
    return gridString; 
}

// Check if an argument is passed to script
if (process.argv.length >= 3) {

    const arrayCommands = process.argv[2].split('-'); // Split input argument into array of strings

    // Check if initial coordinates command tX,Y is given and create object instance
    if (arrayCommands[0].includes(',')) {
        var turtleInstance = new Turtle(parseInt(arrayCommands[0][1]), parseInt(arrayCommands[0][3]));
        arrayCommands.shift(); // Remove initial coordinates command once turtle instance initiated
    } else {
        var turtleInstance = new Turtle(0, 0);
    }

    // Loop through array of string commands
    for (let command = 0; command <= arrayCommands.length - 1; command += 1) {

        // Check first letter of each string command
        if (arrayCommands[command][0] == 'f') {
            // Parse string after f into integer
            turtleInstance.forward(parseInt(arrayCommands[command].slice(1)));  
        } else if (arrayCommands[command][0] == 'r') {
            turtleInstance.right();
        } else if (arrayCommands[command][0] == 'l') {
            turtleInstance.left();
        }
    }

    console.log(turtleInstance.print());

    // [STRETCH] Script testing 

    // $ node turtleGraphics.js f10-r-r-f10-l-f5-l-f10-r-f5-r-f10
    // $ node turtleGraphics.js t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5

} else {

    // Example usage for testing program without script

    console.log(new Turtle(0,0).print());

    console.log(new Turtle(2,3).print());

    console.log(new Turtle(2,3).forward(3).print());

    console.log(new Turtle(0, 0).forward(3).right().forward(2).print());

    console.log(new Turtle(0, 4).forward(3).left().forward(3).print());

    console.log(new Turtle(0, 0).forward(5).right().forward(5).right().forward(5).right().forward(5).print());
    
    console.log(new Turtle(5, 5).forward(10).right().forward(5).right().forward(10).right().forward(5).right().forward(2).right().forward(5).left().forward(2).left().forward(5).print());
    
    console.log(new Turtle(0, 0).forward(10).right().right().forward(10).left().forward(5).left().forward(10).right().forward(5).right().forward(11).print());

    const turtleInstance = new Turtle (0, 4);
    turtleInstance.forward(3).left().forward(3).right().forward(5).right().forward(8).right().forward(5).right().forward(3).left().forward(3);
    console.log(turtleInstance.allPoints());
    console.log(turtleInstance.print());

}