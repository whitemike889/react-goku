import { StyleSheet, PixelRatio, Platform } from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    padding: 0
  },
  listview: {},
  itemRow: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  itemRowID: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: 2,
    backgroundColor: 'transparent'
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#03A9F4',
    marginTop: 32
  },
  boardContent: {
    flex: 1,
    paddingLeft: 32
  },
  boardContainer: {
    flex: 1,
    width: 200,
    borderWidth: 3,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  boardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  boardRowSeperator: {
    borderBottomWidth: 3
  },
  boardBlock: {
    flex: 1,
    justifyContent: 'flex-start',
    borderWidth: 1 / PixelRatio.get(),
    height: 20
  },
  boardBlockSelected: {
    flex: 1,
    justifyContent: 'flex-start',
    borderWidth: 1 / PixelRatio.get(),
    height: 20,
    backgroundColor: '#E3F2FD'
  },
  boardBlockSeperator: {
    borderRightWidth: 2
  },
  boardBlockText: {
    fontSize: 10,
    paddingTop: 8,
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? -4 : 0,
    backgroundColor: 'transparent'
  }
});
