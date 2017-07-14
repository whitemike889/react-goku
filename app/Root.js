'use strict';
import React, { Component } from 'react';
import {
  StatusBar,
  View,
  SegmentedControlIOS,
  ToolbarAndroid,
  ToastAndroid,
  Platform
} from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import SolvePage from './pages/SolvePage';
import SavedPage from './pages/SavedPage';
import styles from './RootStyles';

export default class Root extends Component {
  constructor(props) {
    super(props);

    this._onActionSelected = this._onActionSelected.bind(this);
    this._onItemSelected = this._onItemSelected.bind(this);

    this.state = {
      toggleActions: false,
      iOSSelectedPage: 0
    };
  }

  _onActionSelected(position) {
    if (position === 0) {
      this._onSolve();
    } else if (position === 1) {
      this._onDelete();
    } else if (position === 2) {
      this._onSave();
    }
  }

  _renderTitleIndicator() {
    return (
      <PagerTitleIndicator
        style={styles.indicatorContainer}
        itemTextStyle={styles.indicatorText}
        selectedItemTextStyle={styles.indicatorSelectedText}
        selectedBorderStyle={styles.selectedBorderStyle}
        titles={['SOLVE', 'SAVED']}
      />
    );
  }

  _onSolve() {
    this.refs.solvePage.convertPuzzle();
  }

  _onDelete() {
    this.refs.solvePage.deletePuzzle();
  }

  _onSave() {
    if (this.refs.solvePage.isSolved()) {
      this.refs.solvePage.savePuzzle(() => {
        this.refs.savedPage.updateDataSource();
        ToastAndroid.show('Saved puzzle.', ToastAndroid.SHORT);
      });
      return;
    }
    if (this.refs.solvePage.isCleared()) {
      ToastAndroid.show('Puzzle is not complete.', ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show('Must solve puzzle before saving.', ToastAndroid.SHORT);
  }

  _onItemSelected(board, id) {
    this.refs.tab.setPage(0);
    this.refs.solvePage.loadPuzzle(board);
  }

  render() {
    const mainWithTabs = Platform.OS === 'ios'
      ? <View style={{ flex: 1 }}>
          <SegmentedControlIOS
            style={styles.segmentedControl}
            values={['Solve', 'Saved']}
            selectedIndex={this.state.iOSSelectedPage}
            tintColor="#E91E63"
            onChange={event => {
              this.setState({
                iOSSelectedPage: event.nativeEvent.selectedSegmentIndex
              });
            }}
          />
          {this.state.iOSSelectedPage == 0 && <SolvePage ref={'solvePage'} />}
          {this.state.iOSSelectedPage == 1 &&
            <SavedPage ref={'savedPage'} onPressItem={this._onItemSelected} />}
        </View>
      : <IndicatorViewPager
          ref={'tab'}
          style={{ flex: 1, flexDirection: 'column-reverse' }}
          indicator={this._renderTitleIndicator()}>
          <View style={{ flex: 1 }}>
            <SolvePage ref={'solvePage'} />
          </View>
          <View style={{ flex: 1 }}>
            <SavedPage ref={'savedPage'} onPressItem={this._onItemSelected} />
          </View>
        </IndicatorViewPager>;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#C2185B" barStyle="light-content" />
        <ToolbarAndroid
          title="Go-ku"
          style={styles.toolbar}
          actions={toolbarActions}
          onActionSelected={this._onActionSelected}
          titleColor="#FFFFFF"
        />
        {mainWithTabs}
      </View>
    );
  }
}

const toolbarActions = [
  {
    title: 'Solve',
    icon: require('./assets/solve_icon.png'),
    show: 'always'
  },
  {
    title: 'Delete',
    icon: require('./assets/delete_icon.png'),
    show: 'always'
  },
  {
    title: 'Save',
    icon: require('./assets/save_icon.png'),
    show: 'always'
  }
];
