'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  StatusBar,
  View,
  Text,
  TextInput
} from 'react-native';

import SudokuSolver from './app/native/SolverAndroid'
import util from './app/util/util'
var _ = require('lodash');
var ToolbarAndroid = require('ToolbarAndroid');
const MK = require('react-native-material-kit');

const {
    MKButton,
    MKColor,
} = MK;

var Goku = React.createClass({

    getInitialState() {
        return {
            puzzleState: util.makeArray(81, null),
            puzzleBoard: util.makeGrid(),
            input: '',
            output: ''
        }
    },

    _onInput(key, input) {
        var gridpoint = key.split('_');
        var x = gridpoint[0];
        var y = gridpoint[1];

        this.state.puzzleBoard[x][y] = parseInt(input);
        console.log("key: " + key + "input: " + input);
      },

    _onActionSelected(position) {
        if (position === 0) {   // Solve
            console.log("solving puzzle with Go");
            this.convertPuzzle();
        } else if (position === 1) {    // Delete
            console.log("cleaning up board");
            this.deletePuzzle();
        }
    },

    drawBoard() {
        var rows = [];
        var blocks = [];
        var puzzle = _.chunk(this.state.puzzleState, 9);

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
                                keyboardType={'number-pad'}
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
                <StatusBar
                    backgroundColor="#1976D2"
                />
                <ToolbarAndroid
                    title="Goku"
                    style={styles.toolbar}
                    actions={toolbarActions}
                    onActionSelected={this._onActionSelected}
                    titleColor="#FFFFFF"
                />

                <View style={styles.container}>
                    {this.drawBoard()}
                </View>

            </View>
        ;

        return layout;
    },

    deletePuzzle() {
        var cleanBoard = util.makeGrid();

        this.setState({
            puzzleBoard: cleanBoard
        });
    },

    convertPuzzle() {
        var newPuzzle = util.convertPuzzle(_.flatten(this.state.puzzleBoard));

        console.log("newPuzzle: " + newPuzzle);
        this.processPuzzle(newPuzzle);
    },

    processPuzzle: async function(puzzle) {
        console.log("processing puzzle!");

        // SudokuSolver.solve("4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......");
        try {
            var {
                result,
            } = await SudokuSolver.solve("4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......");

            console.log("result ready!");
            console.log(result);
            console.log([...result]);
            var newBoard = util.convertToGrid(_.chunk([...result], 9));
            this.setState({
                puzzleBoard: newBoard
            });
        } catch (e) {
            console.error(e);
        }
    }
});


const MaterialButton = new MKButton.Builder()

var toolbarActions = [
    {title: 'Solve', icon: require('./app/assets/solve_icon.png'), show:'always'},
    {title: 'Delete', icon: require('./app/assets/delete_icon.png'), show:'always'},
];

var styles = StyleSheet.create({
    // For the container View
    parent: {
        padding: 0
    },
    toolbar: {
        backgroundColor: '#2196F3',
        height: 56,
        marginBottom: 15
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
        fontSize: 25,
        backgroundColor: '#BBDEFB'
    },
    block: {
        flex: 1,
        justifyContent: 'flex-start',
        borderWidth: 1 / PixelRatio.get(),
        height:40,
    },
    blockSeperator: {
        borderRightWidth: 2
    },
    blockText: {
        fontSize: 25,
        paddingTop: 4,
        alignSelf: 'center'
    },
});

AppRegistry.registerComponent('goku', () => Goku);
