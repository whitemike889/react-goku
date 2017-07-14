'use strict';
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';

import { ListView } from 'realm/react-native';
import GokuDB from '../db/GokuDB';
import styles from './SavedStyles';
const _ = require('lodash');

export default class SavedPage extends Component {
  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.solved !== r2.solved
    });
    this.state = {
      dataSource: ds.cloneWithRows(GokuDB.getBoards())
    };
  }
  render() {
    return (
      <View style={styles.parent}>
        <ScrollView>

          <ListView
            style={styles.listview}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        </ScrollView>
      </View>
    );
  }

  _onBoardClicked(board) {
    console.log('onBoardClicked: ' + board.solved);
  }

  _renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
    const { onPressItem } = this.props;
    return (
      <View style={styles.itemRow}>
        <View style={styles.circle}>
          <Text style={styles.itemRowID}>
            {rowID + 1}
          </Text>
        </View>

        <BoardItem item={rowData} onPress={() => onPressItem(rowData, rowID)} />
      </View>
    );
  }

  updateDataSource() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(GokuDB.getBoards())
    });
  }
}

class BoardItem extends Component {
  render() {
    let board = this.props.item;

    let rows = [];
    let blocks = [];
    let puzzle = _.chunk([...board.solved], 9);
    let userInserts = board.presolved.split(',');

    puzzle.map(row => {
      const rowSeperator = rows.length === 2 || rows.length === 5;

      row.map(block => {
        const key = rows.length + '_' + blocks.length;
        const blockSeperator = blocks.length === 2 || blocks.length === 5;

        let isUserInsert = false;
        userInserts.map(insertKey => {
          if (insertKey == key) {
            isUserInsert = true;
          }
        });

        blocks.push(
          <View
            key={key}
            style={[
              styles.boardBlock,
              blockSeperator && styles.boardBlockSeperator,
              isUserInsert && styles.boardBlockSelected
            ]}>
            <Text style={styles.boardBlockText}>{block}</Text>
          </View>
        );
      });
      rows.push(
        <View
          key={rows.length}
          style={[styles.boardRow, rowSeperator && styles.boardRowSeperator]}>
          {blocks}
        </View>
      );
      blocks = [];
    });
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.boardContent}>
        <View key={rows.length} style={styles.boardContainer}>
          {rows}
        </View>
      </TouchableOpacity>
    );
  }
}
