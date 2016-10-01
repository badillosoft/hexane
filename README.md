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

First you need to create a board, especifing the options like _type_,
example:

~~~js
const Board = require("hexaen").Board;

let board = new Board({ type: "chess" });

// console.log(board.json());

board.log();

board.move("c2", "c4");

board.log();
~~~
 
## Building own board

You can build your specific board defining all requirements for work.

First you need create _javascript_ file containing a module that
exports index system, move controller, and other things.

~~~js
"use strict"

/**
 * TODO: Define the next properties and methods of board
 *
 * Properties:
 *
 * board.size <integer> - size of vector of cells (required)
 * board.default_item <any> - the default item of cells (optional - default is null)
 *
 * Methods:
 *
 * board.linear_index <function(index)> - map function receives index and return linear index of cell (required)
 * board.can_swap <function(index_a, index_b)> - return true or false if index_a can be swaped to index_b (optional)
 * board.can_move <function(index_a, index_b)> - return true or false if index_a can be moved to index_b (optional)
 *
 */

module.exports = (board) => {
    board.size = board.rows * board.cols;

    board.default_item = null;

    board.linear_index = (index) => {
        return index.row * board.rows + index.col;
    };
};
~~~