'use strict';
/**
 * This exposes the native SudokuSolverAndroid module as a JS module. This has a
 * function 'solve' which takes the following parameters:
 *
 * 1. String puzzle: A string which contains the state of a sudoku puzzle
 		-- example: puzzle := 4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......
 * BTW: this "Native" function is actually Golang! using gomobile
 * https://godoc.org/golang.org/x/mobile/cmd/gomobile
 */
import { NativeModules } from 'react-native';
module.exports = NativeModules.SudokuSolverAndroid;
