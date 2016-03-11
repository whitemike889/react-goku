'use strict';
import React, {
    StyleSheet,
	Button,
	Text,
    View,
	Animated
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');

var GokuToolbar = React.createClass({
	selectedTabIcons:   [],
  	unselectedTabIcons: [],

	propTypes: {
		goToPage:  React.PropTypes.func,
		activeTab: React.PropTypes.number,
		tabs:      React.PropTypes.array
	},

	toolbarActions (currentTab) {
	  switch (currentTab) {
	    case 0:
	        return solveToolbarActions
	    case 1:
	        return savedToolbarAction
	    }
	},

	renderTabOption( name, page ) {
	    var isTabActive = this.props.activeTab === page;

	    return (
	        <View>
	            <Button key={name} onPress={() => this.props.goToPage(page)}>
	                <Text>
	                    {name}
	                </Text>
	            </Button>
	        </View>
	    );
	},

	render() {
		var containerWidth = this.props.containerWidth;
	    var numberOfTabs      = this.props.tabs.length;
	    var tabUnderlineStyle = {
	        position:        'absolute',
	        width:            containerWidth / numberOfTabs,
	        height:          4,
	        backgroundColor: 'white',
	        bottom:          0,
	    };

	    var left = this.props.scrollValue.interpolate({
	        inputRange: [ 0, 1 ], outputRange: [ 0, containerWidth / numberOfTabs ]
	    });

	    return (
	        <View>
	            <ToolbarAndroid
	                title="Goku"
	                titleColor='white'
	                style={styles.toolbar}
	                actions={this.toolbarActions(this.props.activeTab)}
	            />
			</View>
	    );
  }
});

var solveToolbarActions = [
    {title: 'Solve', icon: require('../assets/solve_icon.png'), show:'always'},
    {title: 'Delete', icon: require('../assets/delete_icon.png'), show:'always'},
    {title: 'Save', icon: require('../assets/save_icon.png'), show:'always'},
];

var savedToolbarAction = [];

const styles = StyleSheet.create({
  toolbar: {
      backgroundColor: '#2196F3',
      height: 56
  },
  tabs: {

  }
});

module.exports = GokuToolbar;
