# hexane

RPG multiplayer platform services for collavorartive projects

## What is it?

This is a packege for _node.js_ for build an RPG board game and
implements games logic fast and easy.

You can use this plaform in other ways, but is thinked for
create board-based games.

## Installation

Install via _npm_ on _node.js_:

~~~bash
$ npm install hexane
~~~

## How works?

First you need to create a board, especifing the type and
options, example:

~~~js
const Board = require("hexaen").Board;

let board = new Board({ type: "chess", rows: 8, cols: 8 });

board.put({ row: "A", col: "1" }, "knight");

console.log(board.json());
~~~
 
## Building own board

You can build your specific board defining all requirements for work.

First you need create _javascript_ file containing a module that
exports index system, move controller, and other things.

~~~js
"use strict"

// Chess Board System
module.exports = {
    index_system: (index) => {
        // return a linear system for index passed on put method
        // example: user wants do:
        // `board.put({ row: "A", col: 1 }, "knight")`
        // you need control index returning a linear index
        const rows = ["A", "B", "C", "D", "E", "F"];
        const row = rows.indexOf(index.row);
        const col = index.col - 1;
        return row * 8 + col;
    }
};
~~~