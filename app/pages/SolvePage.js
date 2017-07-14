'use strict';
import React from 'react';
import {
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

const _ = require('lodash');

var SolvePage = React.createClass({
	getInitialState() {
        return {
            initPuzzle: util.makeArray(81, null),
            puzzleBoard: util.makeGrid(), // [row][block]
            presolved: '',
            solved: false,
            cleared: true,
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
      },

  drawBoard() {
    let rows = [];
    let blocks = [];
    let puzzle = _.chunk(this.state.initPuzzle, 9);

      puzzle.map((row) => {
        const rowSeperator = ((rows.length == 2 || rows.length == 5)) ? true : false;

          row.map((block) => {
            const key = rows.length + "_" + blocks.length;
            const blockSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;
            if (block === null) {
              blocks.push(
                <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
                  <TextInput
                    clearTextOnFocus={true}
                    keyboardType={'numeric'}
                    maxLength={1}
                    underlineColorAndroid='transparent'
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
              blocks.push(
                <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
                  <Text style={styles.blockText}>{block}</Text>
                </View>
              );
            }
          });

          rows.push(<View key={rows.length} style={[{flexDirection: 'row'}, rowSeperator && styles.rowSeperator]}>{blocks}</View>);
          blocks = [];
      });

      return <View style={styles.container}>{rows}</View>;
  },

    render() {
        return (
          <View style = {styles.parent} >
            <Text>
            </Text>
            {this.drawBoard()}
          </View>
        );
    },

    // convertPuzzle: converts puzzleBoard to a format that the Go lib (Goku) understands
    convertPuzzle() {
        var newPuzzle = util.convertPuzzle(_.flatten(this.state.puzzleBoard));

        this.processPuzzle(newPuzzle);
    },

    isSolved() {
        return this.state.solved;
    },

    isCleared() {
        return this.state.cleared;
    },

    processPuzzle: async function(puzzle) {

        // } = await SudokuSolver.solve("4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......");
        try {
            var {
                result,
            } = await SudokuSolver.solve(puzzle);

            console.log(result);
            console.log([...result]);

            var presolved = util.extractPuzzleInserts(this.state.puzzleBoard);
            this.setState({ // array of all keys
                presolved: presolved
            });

            var newBoard = util.convertToGrid(_.chunk([...result], 9));
            this.setState({
                solved: true,
                puzzleBoard: newBoard
            });
        } catch (e) {
            // console.error(e);
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

        console.log("saving puzzle");
        GokuDB.saveBoard(this.state.presolved, util.convertPuzzle(_.flatten(this.state.puzzleBoard)));
        saveCallback();
    }
});

var styles = StyleSheet.create({
    // For the container View
    parent: {
      flex: 1,
        paddingTop:16
    },
  container: {flexDirection: 'column', alignSelf: 'center', borderWidth: 3},
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
      width: 40,
    height: 40,
    borderWidth: 1 / PixelRatio.get(),
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
