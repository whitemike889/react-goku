'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActionSheetIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class GokuToolbar extends Component {
  propTypes: {
    actionsSelected: React.PropTypes.func
  };

  openActionSheet() {
    const { actionsSelected } = this.props;
    const options = {
      options: ['Solve', 'Reset', 'Save', 'Preload', 'Cancel'],
      cancelButtonIndex: 4,
      title: 'Options'
    };
    ActionSheetIOS.showActionSheetWithOptions(options, option => {
      actionsSelected(option);
    });
  }

  render() {
    return (
      <View>
        <View style={[{ marginBottom: 16 }, styles.toolbar]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 24,
              height: 28
            }}>
            <Text style={styles.title}>
              Go-ku
            </Text>
            <TouchableOpacity
              style={styles.options}
              onPress={this.openActionSheet.bind(this)}>
              <Icon
                name="ios-more"
                size={30}
                color="white"
                style={{
                  marginTop: -8
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#E91E63',
    height: 56
  },
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '400'
  },
  options: {
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 8
  }
});
