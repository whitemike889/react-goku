import React, {
    StyleSheet,
    StatusBar,
    View
} from 'react-native';
import SolvePage from './pages/SolvePage';
import SavedPage from './pages/SavedPage';
var ToolbarAndroid = require('ToolbarAndroid');

var ScrollableTabView = require('react-native-scrollable-tab-view');
const MK = require('react-native-material-kit');

const {
    MKButton,
    MKColor,
} = MK;

const MaterialButton = new MKButton.Builder()

var Root = React.createClass({

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
        this.refs.solvePage.savePuzzle(() => {
            this.refs.savedPage.updateDataSource();
        });
    },

  render() {
    return (
        <View style={styles.container}>
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

          <ScrollableTabView
            tabBarBackgroundColor='#2196F3'
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

const styles = StyleSheet.create({
  container: {
    flex: 1
},
  toolbar: {
      backgroundColor: '#2196F3',
      height: 56
  }
});

module.exports = Root;
