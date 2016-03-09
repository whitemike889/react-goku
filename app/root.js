'use strict';
import React, {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import SudokuSolver from './native/SolverAndroid'

var Goku = React.createClass({

    getInitialState: function() {
        return {input: '', output: ''}
    },

    render: function(){
        var layout =
            <View style = {styles.parent} >
                <Text>
                    Enter the sudoku puzzle:
                </Text>

                <TextInput
                    text = {this.state.input}
                    onChangeText={(e) => this.setState({input: e})}
                    onSubmitEditing={this.processPuzzle}
                />

                <Text style = {styles.sudokuLabel} >
                    Sudoku puzzle solved:
                </Text>

                <Text style = { styles.sudokuPuzzle } >
                    {this.state.output}
                </Text>

            </View>
        ;

        return layout;
    },

    processPuzzle: async function() {
        var puzzle = this.state.input;

        // SudokuSolver.solve("4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......");

        try {
            var {
                result,
            } = await SudokuSolver.solve("4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......");

            this.setState({
                output: result
            });
        } catch (e) {
            console.error(e);
        }
    }
});



var styles = StyleSheet.create({
    // For the container View
    parent: {
        padding: 16
    },
    // For the Text label
    sudokuLabel: {
        marginTop: 20,
        fontWeight: 'bold'
    },

    // For the Text meaning
    sudokuPuzzle: {
        marginTop: 15,
        fontSize: 30,
        fontStyle: 'italic'
    }

});
