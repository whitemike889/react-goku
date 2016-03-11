'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  ScrollView,
  TouchableOpacity,
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

    _onBoardClicked(board) {
        console.log("onBoardClicked: " + board.solved);
    },

    _renderRow(rowData, sectionID, rowID) {
        console.log(rowData);
        return (
            <View style={styles.itemRow}>
                <View
                    style={styles.circle}>
                    <Text style={styles.itemRowID}>
                        {rowID+1}
                    </Text>
                </View>

                <BoardItem
                    item={rowData}
                    onPress={() => this.props.onPressItem(rowData, rowID)} />
            </View>
        );
    },

    // _renderCuteBoard(board) {
    //     console.log("cuteBoard: " + board.presolved);
    //
    //     var rows = [];
    //     var blocks = [];
    //     var puzzle = _.chunk([...board.solved], 9);
    //     var userInserts = board.presolved.split(',');
    //
    //     puzzle.map((row) => {
    //         var rowSeperator = ((rows.length == 2 || rows.length == 5)) ? true : false;
    //
    //         row.map((block) => {
    //             var key = rows.length + "_" + blocks.length;
    //
    //             var isUserInsert = false;
    //             userInserts.map((insertKey) => {
    //                 if (insertKey == key) {
    //                     isUserInsert = true;
    //                     console.log(insertKey + " :: " + key + " :: found match");
    //                 }
    //             });
    //             var blockSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;
    //
    //             // console.log("block not null");
    //             blocks.push(
    //                 <View
    //                     key={key}
    //                     style={[
    //                         styles.boardBlock,
    //                         blockSeperator && styles.boardBlockSeperator,
    //                         isUserInsert && styles.boardBlockSelected
    //                     ]}
    //                 >
    //                     <Text style={styles.boardBlockText}>{block}</Text>
    //                 </View>
    //             );
    //         });
    //         rows.push(<View
    //                         key={rows.length}
    //                         style={[styles.boardRow, rowSeperator && styles.boardRowSeperator]}
    //                     >
    //                     {blocks}
    //                     </View>);
    //         blocks = [];
    //     });
    //     return (<View key={rows.length} style={styles.boardContainer}>{rows}</View>);
    // },

    updateDataSource() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(GokuDB.getBoards()),
        });
    }
});


class BoardItem extends React.Component {
    render() {
        var board = this.props.item;

        var rows = [];
        var blocks = [];
        var puzzle = _.chunk([...board.solved], 9);
        var userInserts = board.presolved.split(',');

        puzzle.map((row) => {
            var rowSeperator = ((rows.length == 2 || rows.length == 5)) ? true : false;

            row.map((block) => {
                var key = rows.length + "_" + blocks.length;

                var isUserInsert = false;
                userInserts.map((insertKey) => {
                    if (insertKey == key) {
                        isUserInsert = true;
                        console.log(insertKey + " :: " + key + " :: found match");
                    }
                });
                var blockSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;

                // console.log("block not null");
                blocks.push(
                    <View
                        key={key}
                        style={[
                            styles.boardBlock,
                            blockSeperator && styles.boardBlockSeperator,
                            isUserInsert && styles.boardBlockSelected
                        ]}
                    >
                        <Text style={styles.boardBlockText}>{block}</Text>
                    </View>
                );
            });
            rows.push(<View
                            key={rows.length}
                            style={[styles.boardRow, rowSeperator && styles.boardRowSeperator]}
                        >
                        {blocks}
                        </View>);
            blocks = [];
        });
        return (<TouchableOpacity
                    onPress={this.props.onPress}
                    style={styles.boardContent}>
                    <View
                        key={rows.length}
                        style={styles.boardContainer}>
                            {rows}
                    </View>
                </TouchableOpacity>);
    }
}

var styles = StyleSheet.create({
    // For the container View
    parent: {
        flex: 1,
        padding: 0
    },
    listview: {
    },
    itemRow: {
        flexDirection:'row',
        paddingLeft:16,
        paddingTop:10,
        paddingBottom:10,
    },
    itemRowID: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        flexDirection:'row',
        textAlign:'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#03A9F4',
        marginTop:32,
  },
  boardContent: {
      flex:1,
      paddingLeft:32,
  },
  boardContainer: {
      flex:1,
      width:200,
      borderWidth: 3,
      borderTopWidth: 2,
      borderBottomWidth: 2
  },
  boardRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
  },
  boardRowSeperator: {
      borderBottomWidth: 3
  },
  boardBlock: {
      flex: 1,
      justifyContent: 'flex-start',
      borderWidth: 5 / PixelRatio.get(),
      height:20,
  },
  boardBlockSelected: {
      flex: 1,
      justifyContent: 'flex-start',
      borderWidth: 1 / PixelRatio.get(),
      height:20,
      backgroundColor: '#81D4FA',
  },
  boardBlockSeperator: {
      borderRightWidth: 2
  },
  boardBlockText: {
      fontSize: 10,
      paddingTop: 8,
      alignSelf: 'center'
  },
});

module.exports = SavedPage;
