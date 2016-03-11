
'use strict';
import React, {
    StyleSheet,
    StatusBar,
    View,
    ToastAndroid
} from 'react-native';
import SolvePage from './pages/SolvePage';
import SavedPage from './pages/SavedPage';
var ToolbarAndroid = require('ToolbarAndroid');

var ScrollableTabView = require('react-native-scrollable-tab-view');

var Root = React.createClass({
    getInitialState() {
        return {
            toggleActions: false,   // true => showToolbarOptions
        }
    },

    _onActionSelected(position) {
        if (position === 0) {   // Solve
            console.log("solving puzzle with Go");
            this._onSolve();
        } else if (position === 1) {    // Delete
            console.log("cleaning up board");
            this._onDelete();
        } else if (position === 2) {
            console.log("saving board");
            this._onSave();
        }
    },

    _onSolve() {
        this.refs.solvePage.convertPuzzle();   // will processPuzzle
    },

    _onDelete() {
        this.refs.solvePage.deletePuzzle();
    },

    _onSave() {
        if (this.refs.solvePage.isSolved()) {
            this.refs.solvePage.savePuzzle(() => {
                this.refs.savedPage.updateDataSource();
            });
            return;
        }

        if (this.refs.solvePage.isCleared()) {
            console.log("Puzzle is not complete.");
            ToastAndroid.show('Puzzle is not complete.', ToastAndroid.SHORT);
            return;
        }

        console.log("Must solve puzzle before saving.");
        ToastAndroid.show('Must solve puzzle before saving.', ToastAndroid.SHORT);

    },

    _onItemSelected(board, id) {
        this.refs.tab.goToPage(0);
        console.log("loading puzzle: ");
        this.refs.solvePage.loadPuzzle(board);
    },

    _toggleToolbarAction(tab) {
        // TODO:
        // you can't toggle.. unless it's connected to ScrollableTabView
        // and used activeTab property
        // http://stackoverflow.com/questions/33411590/how-to-render-actions-in-toolbarandroid-for-react-native
        // but you sacrifice having reference to SolvePage and SavedPage :( I might be overlooking something..
    },

  render() {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#C2185B"
            />
            <ToolbarAndroid
                title="Goku"
                style={styles.toolbar}
                actions={toolbarActions}
                onActionSelected={this._onActionSelected}
                titleColor="#FFFFFF"
            />

          <ScrollableTabView
            ref={'tab'}
            tabBarBackgroundColor='#E91E63'
            tabBarActiveTextColor='#FFFFFF'
            tabBarInactiveTextColor='#212121'
            tabBarUnderlineColor='#FFFFFF'
          >
            <SolvePage
                ref={'solvePage'}
                tabLabel="SOLVE"
            />
            <SavedPage
                ref={'savedPage'}
                tabLabel="SAVED"
                onPressItem={this._onItemSelected}
            />
          </ScrollableTabView>
        </View>
    );
  }
});

var toolbarActions = [
    {title: 'Solve', icon: require('./assets/solve_icon.png'), show:'always'},
    {title: 'Delete', icon: require('./assets/delete_icon.png'), show:'always'},
    {title: 'Save', icon: require('./assets/save_icon.png'), show:'always'},
];

var toolbarEmptyActions = [];

const styles = StyleSheet.create({
  container: {
    flex: 1
},
  toolbar: {
      backgroundColor: '#E91E63',
      height: 56
  }
});

module.exports = Root;
