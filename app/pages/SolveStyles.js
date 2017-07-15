import { StyleSheet, PixelRatio } from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: 16
  },
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    borderWidth: 3
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowSeperator: {
    borderBottomWidth: 3
  },
  textInput: {
    paddingBottom: 2,
    paddingLeft: 10,
    height: 34,
    fontSize: 25,
    backgroundColor: '#E3F2FD'
  },
  textInputSelected: {
    paddingBottom: 2,
    paddingLeft: 10,
    height: 34,
    fontSize: 25
  },
  block: {
    width: 34,
    height: 34,
    borderWidth: 1 / PixelRatio.get()
  },
  blockSeperator: {
    borderRightWidth: 3
  },
  blockSelected: {
    backgroundColor: '#03A9F4',
    opacity: 0.7
  },
  blockText: {
    fontSize: 18,
    paddingTop: 4,
    alignSelf: 'center'
  }
});
