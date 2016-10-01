"use strict";

/**
 * Created by alan on 30/09/16.
 */

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