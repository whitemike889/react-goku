import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  segmentedControl: {
    width: 200,
    alignSelf: 'center'
  },
  toolbar: {
    backgroundColor: '#E91E63',
    height: 56
  },
  indicatorContainer: {
    backgroundColor: '#E91E63',
    height: 48
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
