'use strict';
var _ = require('underscore');

const util = {
	/**
	makeArray:
		- creates an array that's of size length
		- contains predefined value
	**/
	makeArray: (length, value) => {
		return _.map(_.range(length), function(val, key) {
			return value;
		})
	},

	/**
	makeGrid:
		- makes an empty grid used as initial sate of Sudoku board
	**/
	makeGrid: () => {
		var grid = Array.apply(null, Array(9)).map(function() { return ''});

		for (var i = 0; i < 9; i++) {
			grid[i] = Array.apply(null, Array(9)).map(function() { return ''});
		}

		console.log("grid; \n" + grid);
		return grid;
	},

	/**
	convertToGrid:  convert puzzleString to grid
		example:
		- convert:
		"4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......"
		=> grid[9][9] 2D-array 9x9
	**/
	convertToGrid: (puzzle) => {
		var rows = [];
        var blocks = [];
		var grid = util.makeGrid();

		puzzle.map((row) => {
			row.map((block) => {
				grid[rows.length][blocks.length] = block;
				blocks.push(block);
			});
			rows.push(1);
			blocks = [];
		});
		console.log(grid);
		return grid;
	},

	/**
	convertPuzzle:  convert grid to puzzleString
		example:
		- convert:
		grid[9][9] 2D-array 9x9
		=> "4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......"
	**/
	convertPuzzle: (puzzleGrid) => {
		var newPuzzle = puzzleGrid.map((square) => {
			if (square == '') {
				return '.';
			}

			return square;
		});

		return newPuzzle.join("");
	},

	extractPuzzleInserts: (puzzleGrid) => {
		var inserts = [];
		var rows = 0;
		var blocks = 0;

		puzzleGrid.map((row) => {
			row.map((block) => {
				if (block == '') {
					blocks++;
					return;
				}

				inserts.push(rows + "_" + blocks);
				blocks++;
			});
			rows++;
			blocks = 0;
		});

		return inserts.join();
	}
}

export default util
