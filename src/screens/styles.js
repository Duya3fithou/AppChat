import {StyleSheet} from 'react-native';

const styledChatlineHolder = StyleSheet.create({
  chatLineHolder: {
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
  myChatLineHolder: {
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#0079FF',
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  sender: {
    color: '#005ce6',
    marginBottom: 5,
  },
  wrapperBlock1: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  wrapperChildBlock1: {
    width: '60%',
    justifyContent: 'flex-start',
  },
  wrapperBlock2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperChildBlock2: {
    width: '60%',
  },
  textColor: {
    color: '#fff',
  },
});
const styledChatRoom = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#B8B6AD',
  },
  wrapperChat: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width: '100%',
    height: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 2,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
  },
  styleImageBackground: {
    flex: 9 / 10,
    backgroundColor: '#A5A5A5',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  iconSend: {
    width: 25,
    height: 25,
    paddingRight: 30,
  },
  textInput: {
    height: 100,
    fontSize: 16,
  },
  imageBackground: {
    opacity: 0.35,
  },
});

const styledJoinRoom = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    paddingBottom: 15,
  },
  nameInput: {
    borderColor: '#A5A5A5',
    borderWidth: 0.5,
    padding: 8,
    width: '100%',
    marginBottom: 15,
    marginTop: 15,
  },
});

export {styledChatlineHolder, styledJoinRoom, styledChatRoom};
