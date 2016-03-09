'use strict';
var _ = require('underscore');

const util = {
	makeArray: (length, value) => {
		return _.map(_.range(length), function(val, key) {
			return value;
		})
	},

	makeGrid: () => {
		var grid = Array.apply(null, Array(9)).map(function() { return ''});

		for (var i = 0; i < 9; i++) {
			grid[i] = Array.apply(null, Array(9)).map(function() { return ''});
		}

		console.log("grid; \n" + grid);
		return grid;
	},

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

	convertPuzzle: (puzzleGrid) => {
		var newPuzzle = puzzleGrid.map((square) => {
			if (square == '') {
				return '.';
			}

			return square;
		});

		return newPuzzle.join("");
	}
}

export default util
