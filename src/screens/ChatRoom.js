/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Platform,
  AsyncStorage,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ChatLineHolder, MyChatLineHolder} from './ChatLineHolder';
import Firebase from 'firebase';
import Assets from '../Assets/Images/Assets';
import {styledChatRoom} from './styles';
export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatData: [],
      username: '',
      chatInputContent: '',
    };
  }
  static navigationOptions = {
    title: 'Phòng Chat',
  };
  async componentDidMount() {
    let username = await AsyncStorage.getItem('name');
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({username});
    Firebase.database()
      .ref('/chatRoom')
      .on('value', snapshot => {
        if (snapshot.val() !== undefined && snapshot.val() !== null) {
          this.setState({
            chatData: Object.values(snapshot.val()),
          });
        }
      });
    this.flatList.scrollToEnd();
  }

  _sendMessage = () => {
    Firebase.database()
      .ref('/chatRoom')
      .push({
        userName: this.state.username,
        chatContent: this.state.chatInputContent,
      });
    this.setState({
      chatInputContent: '',
    });
  };
  _renderChatLine = item => {
    if (item.userName === this.state.username) {
      return (
        <View style={{alignItems: 'flex-end'}}>
          <MyChatLineHolder sender="YOU" chatContent={item.chatContent} />
        </View>
      );
    }
    return (
      <ChatLineHolder sender={item.userName} chatContent={item.chatContent} />
    );
  };
  _onChangeChatInput = text => {
    this.setState({chatInputContent: text});
  };
  render() {
    const {container, wrapperChat, iconSend, textInput} = styledChatRoom;
    return (
      <KeyboardAwareScrollView
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({animated: true});
        }}
        extraHeight={Platform.OS === 'android' ? 0 : 100}>
        <View style={container}>
          <FlatList
            ref={flatList => {
              this.flatList = flatList;
            }}
            data={this.state.chatData}
            renderItem={({item}, index) => this._renderChatLine(item)}
          />
        </View>
        <View style={{flex: 1 / 10}}>
          <View style={wrapperChat}>
            <View style={{flex: 9 / 10}}>
              <TextInput
                placeholder="Nhập nội dung chat"
                value={this.state.chatInputContent}
                onChangeText={text => this._onChangeChatInput(text)}
                style={textInput}
              />
            </View>
            <View style={{flex: 1 / 10}}>
              <TouchableOpacity
                onPress={() => {
                  this._sendMessage();
                  this.flatList.scrollToEnd();
                }}>
                <Image source={Assets.send1} style={iconSend} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
