'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class GokuToolbar extends Component {
  propTypes: {
    actionsSelected: React.PropTypes.func
  };

  render() {
    const { actionsSelected } = this.props;

    return (
      <View>
        <Icon.ToolbarAndroid
          title="Go-ku"
          style={styles.toolbar}
          actions={toolbarActions}
          onActionSelected={actionsSelected}
          titleColor="#FFFFFF"
        />
      </View>
    );
  }
}

const toolbarActions = [
  {
    title: 'Solve',
    iconName: 'check-circle',
    show: 'always'
  },
  {
    title: 'Delete',
    iconName: 'delete',
    show: 'always'
  },
  {
    title: 'Save',
    iconName: 'save',
    show: 'always'
  }
];

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#E91E63',
    height: 56
  },
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16
  },
  options: {
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 8
  }
});
