'use strict';
import React from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    ToastAndroid
} from 'react-native';

import SolvePage from './pages/SolvePage';
import SavedPage from './pages/SavedPage';

var ToolbarAndroid = require('ToolbarAndroid');
import {IndicatorViewPager, PagerTitleIndicator,} from 'rn-viewpager';

var Root = React.createClass({
    getInitialState() {
        return {
            toggleActions: false,   // true => showToolbarOptions
        }
    },

    _onActionSelected(position) {
        if (position === 0) {   // Solve
            this._onSolve();
        } else if (position === 1) {    // Delete
            this._onDelete();
        } else if (position === 2) {
            this._onSave();
        }
    },

  _renderTitleIndicator() {
    return <PagerTitleIndicator
      style={styles.indicatorContainer}
      itemTextStyle={styles.indicatorText}
      selectedItemTextStyle={styles.indicatorSelectedText}
      selectedBorderStyle={styles.selectedBorderStyle}
      titles={['SOLVE', 'SAVED']} />;
  },


  _onSolve() {
        this.refs.solvePage.convertPuzzle();
    },

    _onDelete() {
        this.refs.solvePage.deletePuzzle();
    },

    _onSave() {
        if (this.refs.solvePage.isSolved()) {
            this.refs.solvePage.savePuzzle(() => {
              console.log('going to update datasource');
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
        this.refs.tab.setPage(0);
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
                backgroundColor="#C2185B" />
            <ToolbarAndroid
                title="Go-ku"
                style={styles.toolbar}
                actions={toolbarActions}
                onActionSelected={this._onActionSelected}
                titleColor="#FFFFFF" />
          <IndicatorViewPager
            ref={'tab'}
            style={{flex: 1, flexDirection: 'column-reverse'}}
            indicator={this._renderTitleIndicator()} >
            <View style={{flex: 1}}>
              <SolvePage
                  ref={'solvePage'}
                  tabLabel="SOLVE" />
            </View>
            <View style={{flex: 1}}>
              <SavedPage
                  ref={'savedPage'}
                  tabLabel="SAVED"
                  onPressItem={this._onItemSelected} />
            </View>
          </IndicatorViewPager>
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
  },
  indicatorContainer: {
    backgroundColor: '#E91E63',
    height: 48,
  },
  indicatorText: {
    fontSize: 16,
    color: 'white'
  },
  indicatorSelectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  selectedBorderStyle: {
    height: 3,
    backgroundColor: 'white'
  }
});

module.exports = Root;
