'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';

import { ListView } from 'realm/react-native';
import GokuDB from '../db/GokuDB'

var SavedPage = React.createClass({

    getInitialState() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.solved !== r2.solved});
        return {
            dataSource: ds.cloneWithRows(GokuDB.getBoards()),
        };
    },
    render() {
        return(
            <View style = {styles.parent} >
                <ScrollView>

                <ListView
                    style={styles.listview}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />
                </ScrollView>
            </View>
        );
    },

    _renderRow(item, sectionID, rowID) {
        console.log(item);
        return (
            <View>
                <Text>
                    {rowID}
                </Text>
                <Text>
                    {item.solved}
                </Text>
            </View>
        );
    },
    updateDataSource() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(GokuDB.getBoards()),
        });
    }
});

var styles = StyleSheet.create({
    // For the container View
    parent: {
        flex: 1,
        padding: 0
    },
    listview: {
    }
});

module.exports = SavedPage;
