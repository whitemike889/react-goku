'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Platform
} from 'react-native';

import SudokuSolver from '../native/SolverAndroid';
import JSSudokuSolver from 'sudoku-solver';
import NumPad from '../components/NumPad';
import util from '../utils/util';
import GokuDB from '../db/GokuDB';
import styles from './SolveStyles';
const _ = require('lodash');

export default class SolvePage extends Component {
  constructor(props) {
    super(props);

    this.numPadPressed = this.numPadPressed.bind(this);
    this.newBlockSelected = this.newBlockSelected.bind(this);

    this.state = {
      initPuzzle: util.makeArray(81, null),
      puzzleBoard: util.makeGrid(), // [row][block]
      presolved: '',
      solved: false,
      cleared: true,
      blockSelected: ''
    };
  }

  _onInput(key, input) {
    this.setState({
      cleared: false
    });
    const gridpoint = key.split('_');
    const x = gridpoint[0];
    const y = gridpoint[1];

    this.state.puzzleBoard[x][y] = parseInt(input);
  }

  newBlockSelected(blockKey) {
    if (this.state.blockSelected !== blockKey) {
      this.setState({ blockSelected: blockKey });
    } else {
      this.setState({ blockSelected: '' });
    }
  }

  drawBoard() {
    let rows = [];
    let blocks = [];
    let puzzle = _.chunk(this.state.initPuzzle, 9);

    puzzle.map(row => {
      const rowSeperator = rows.length === 2 || rows.length === 5;

      row.map(block => {
        const key = rows.length + '_' + blocks.length;
        const isBlockSelected = this.state.blockSelected == key;
        const blockSeperator = blocks.length === 2 || blocks.length === 5;
        if (block === null) {
          blocks.push(
            <TouchableOpacity
              key={key}
              onPress={() => this.newBlockSelected(key)}
              style={[styles.block, blockSeperator && styles.blockSeperator]}>
              <Text
                style={[
                  styles.textInput,
                  isBlockSelected && styles.blockSelected
                ]}>
                {this.state.puzzleBoard[rows.length][blocks.length]
                  ? this.state.puzzleBoard[rows.length][
                      blocks.length
                    ].toString()
                  : ''}
              </Text>
              {/*<TextInput*/}
              {/*clearTextOnFocus={true}*/}
              {/*keyboardType={'numeric'}*/}
              {/*maxLength={1}*/}
              {/*underlineColorAndroid="transparent"*/}
              {/*value={*/}
              {/*this.state.puzzleBoard[rows.length][blocks.length]*/}
              {/*? this.state.puzzleBoard[rows.length][*/}
              {/*blocks.length*/}
              {/*].toString()*/}
              {/*: ''*/}
              {/*}*/}
              {/*style={[*/}
              {/*styles.textInput,*/}
              {/*this.state.active && styles.textInputSelected*/}
              {/*]}*/}
              {/*onFocus={() =>*/}
              {/*this.setState({*/}
              {/*active: true*/}
              {/*})}*/}
              {/*onChangeText={input => this._onInput(key, input)}*/}
              {/*/>*/}
            </TouchableOpacity>
          );
        } else {
          blocks.push(
            <View
              key={key}
              style={[styles.block, blockSeperator && styles.blockSeperator]}>
              <Text style={styles.blockText}>{block}</Text>
            </View>
          );
        }
      });

      rows.push(
        <View
          key={rows.length}
          style={[
            { flexDirection: 'row' },
            rowSeperator && styles.rowSeperator
          ]}>
          {blocks}
        </View>
      );
      blocks = [];
    });

    return <View style={styles.container}>{rows}</View>;
  }

  numPadPressed(val) {
    const { blockSelected } = this.state;

    blockSelected != '' && this._onInput(blockSelected, val);
  }

  render() {
    return (
      <View style={styles.parent}>
        <Text />
        {this.drawBoard()}
        <NumPad keyPressed={this.numPadPressed} />
      </View>
    );
  }

  // convertPuzzle: converts puzzleBoard to a format that the Go lib (Goku) understands
  convertPuzzle() {
    var newPuzzle = util.convertPuzzle(_.flatten(this.state.puzzleBoard));

    if (Platform.OS == 'ios') {
      this.processPuzzleInJS(newPuzzle);
    } else {
      this.processPuzzle(newPuzzle);
    }
  }

  isSolved() {
    return this.state.solved;
  }

  isCleared() {
    return this.state.cleared;
  }

  preloadBoard(puzzle) {
    var newBoard = util.convertToGrid(_.chunk([...puzzle], 9));
    this.setState({
      solved: false,
      puzzleBoard: newBoard
    });
  }

  processPuzzleInJS = async function(puzzle) {
    try {
      const result = await JSSudokuSolver.solve({ problem: puzzle }).toString(
        false
      );

      var presolved = util.extractPuzzleInserts(this.state.puzzleBoard);
      this.setState({
        // array of all keys
        presolved: presolved
      });

      var newBoard = util.convertToGrid(_.chunk([...result], 9));
      this.setState({
        solved: true,
        puzzleBoard: newBoard
      });
    } catch (e) {
      console.log('what is the error', e);
    }
  };

  processPuzzle = async function(puzzle) {
    // } = await SudokuSolver.solve("4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......");
    try {
      var { result } = await SudokuSolver.solve(puzzle);

      if (result == undefined) {
        throw 'result is undefined';
      }

      var presolved = util.extractPuzzleInserts(this.state.puzzleBoard);
      this.setState({
        // array of all keys
        presolved: presolved
      });

      var newBoard = util.convertToGrid(_.chunk([...result], 9));
      this.setState({
        solved: true,
        puzzleBoard: newBoard
      });
    } catch (e) {
      // console.error(e);
      Platform.OS !== 'ios' &&
        ToastAndroid.show('Puzzle is unsolvable.', ToastAndroid.SHORT);
    }
  };

  loadPuzzle(board) {
    var mergedPuzzle = util.mergePuzzleViaInserts(
      board.presolved,
      _.chunk([...board.solved], 9)
    );

    this.setState({
      puzzleBoard: mergedPuzzle
    });
  }

  deletePuzzle() {
    var cleanBoard = util.makeGrid();

    this.setState({
      cleared: true,
      puzzleBoard: cleanBoard
    });
  }

  savePuzzle(saveCallback) {
    this.setState({
      solved: false
    });

    GokuDB.saveBoard(
      this.state.presolved,
      util.convertPuzzle(_.flatten(this.state.puzzleBoard))
    );
    saveCallback();
  }
}
