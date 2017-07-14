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
    height: 40,
    fontSize: 25,
    backgroundColor: '#E3F2FD'
  },
  textInputSelected: {
    paddingBottom: 2,
    paddingLeft: 10,
    height: 40,
    fontSize: 25
  },
  block: {
    width: 40,
    height: 40,
    borderWidth: 1 / PixelRatio.get()
  },
  blockSeperator: {
    borderRightWidth: 3
  },
  blockText: {
    fontSize: 25,
    paddingTop: 4,
    alignSelf: 'center'
  }
});
