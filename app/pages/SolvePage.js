'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  View,
  Text,
  TextInput,
  ToastAndroid
} from 'react-native';

import SudokuSolver from '../native/SolverAndroid'
import util from '../utils/util'
import GokuDB from '../db/GokuDB'

var _ = require('lodash');

var SolvePage = React.createClass({
	getInitialState() {
        return {
            initPuzzle: util.makeArray(81, null),

            // puzzleBoard: contains solved state
            // reacts to blocks in sudoku grid based on [row][block].length
            puzzleBoard: util.makeGrid(),
            presolved: '', // contains presolved state
            solved: false,
            cleared: true
        }
    },

    _onInput(key, input) {
        this.setState({
            cleared: false
        });
        var gridpoint = key.split('_');
        var x = gridpoint[0];
        var y = gridpoint[1];

        this.state.puzzleBoard[x][y] = parseInt(input);
        console.log("key: " + key + "input: " + input);
      },

    drawBoard() {
        var rows = [];
        var blocks = [];
        var puzzle = _.chunk(this.state.initPuzzle, 9);

        puzzle.map((row) => {
            var rowSeperator = ((rows.length == 2 || rows.length == 5)) ? true : false;

            row.map((block) => {
                var key = rows.length + "_" + blocks.length;
                var blockSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;

                if (block === null) {
                    blocks.push(
                        <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
                              <TextInput
                                clearTextOnFocus={true}
                                keyboardType={'numeric'}
                                maxLength={1}
                                style={[styles.textInput, this.state.active && styles.textInputSelected]}
                                onFocus={() =>
                                    this.setState({
                                        active: true
                                    })
                                }
                                onChangeText={(input) => this._onInput(key, input)}
                              >
                              {this.state.puzzleBoard[rows.length][blocks.length]}
                              </TextInput>
                        </View>
                    );
                } else {
                    console.log("block not null");
                    blocks.push(
                        <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
                            <Text style={styles.blockText}>{block}</Text>
                        </View>
                    );
                }
            });
            rows.push(<View key={rows.length} style={[styles.row, rowSeperator && styles.rowSeperator]}>{blocks}</View>);
            blocks = [];
        });
        return (<View key={rows.length} style={styles.container}>{rows}</View>);
    },

    render() {
        var layout =
            <View style = {styles.parent} >
                <View style={styles.container}>
                    {this.drawBoard()}
                </View>

            </View>
        ;

        return layout;
    },

    // convertPuzzle: converts puzzleBoard to a format that the Go lib (Goku) understands
    convertPuzzle() {
        var newPuzzle = util.convertPuzzle(_.flatten(this.state.puzzleBoard));

        console.log("newPuzzle: " + newPuzzle);
        this.processPuzzle(newPuzzle);
    },

    isSolved() {
        return this.state.solved;
    },

    isCleared() {
        return this.state.cleared;
    },

    processPuzzle: async function(puzzle) {
        console.log("processing puzzle!");

        // } = await SudokuSolver.solve("4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......");
        try {
            var {
                result,
            } = await SudokuSolver.solve(puzzle);

            console.log("result ready!");
            console.log(result);
            console.log([...result]);

            var presolved = util.extractPuzzleInserts(this.state.puzzleBoard)
            this.setState({ // array of all keys
                presolved: presolved
            });

            var newBoard = util.convertToGrid(_.chunk([...result], 9));
            this.setState({
                solved: true,
                puzzleBoard: newBoard
            });
        } catch (e) {
            console.error(e);
            ToastAndroid.show('Puzzle is unsolvable.', ToastAndroid.SHORT);
        }
    },

    loadPuzzle(board) {
        var mergedPuzzle = util.mergePuzzleViaInserts(board.presolved, _.chunk([...board.solved], 9));

        this.setState({
            puzzleBoard: mergedPuzzle
        });
    },

    deletePuzzle() {
        var cleanBoard = util.makeGrid();

        this.setState({
            cleared: true,
            puzzleBoard: cleanBoard
        });
    },

    savePuzzle(saveCallback) {
        this.setState({
            solved: false
        });

        console.log("SolvePage saving puzzle");
        GokuDB.saveBoard(this.state.presolved, util.convertPuzzle(_.flatten(this.state.puzzleBoard)));
        saveCallback();
    }
});

var styles = StyleSheet.create({
    // For the container View
    parent: {
        paddingTop:16
    },
    container: {
        alignSelf: 'center',
        width:320,
        borderWidth: 3,
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowSeperator: {
        borderBottomWidth: 3
    },
    textInput: {
        paddingBottom: 2,
        paddingLeft: 10,
        height: 40,
        fontSize: 25,
        backgroundColor: '#E3F2FD'
    },
    textInputSelected: {
        paddingBottom: 2,
        paddingLeft: 10,
        height: 40,
        fontSize: 25
        // backgroundColor: '#BBDEFB'
    },
    block: {
        flex: 1,
        justifyContent: 'flex-start',
        borderWidth: 1,
        height:40
    },
    blockSeperator: {
        borderRightWidth: 3
    },
    blockText: {
        fontSize: 25,
        paddingTop: 4,
        alignSelf: 'center'
    },
});

module.exports = SolvePage;
