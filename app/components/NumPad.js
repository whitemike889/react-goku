'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PixelRatio
} from 'react-native';

const renderNumKey = (val, keyPressed) => {
  return (
    <TouchableOpacity key={val} onPress={() => keyPressed(val)}>
      <View style={styles.button}><Text style={styles.text}>{val}</Text></View>
    </TouchableOpacity>
  );
};

export default class NumPad extends Component {
  render() {
    const { keyPressed } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {[1, 2, 3].map(val => renderNumKey(val, keyPressed))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map(val => renderNumKey(val, keyPressed))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map(val => renderNumKey(val, keyPressed))}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#9E9E9E',
    width: 42,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    margin: 8
  },
  text: {
    color: 'white'
  }
});
