import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat'; // 0.3.0
import PropTypes from 'prop-types';
import firebaseSvc from '../FirebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';
class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation}) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
    avatar: '',
  };

  get user() {
    return {
      name: this.props.navigation?.getParam('info')?.name,
      email: this.props.navigation?.getParam('info')?.email,
      avatar: this.state.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }

  render() {
    console.log(this.props.navigation?.getParam('avatar'));
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSvc.send}
        user={this.user}
        scrollToBottom={true}
        isTyping={true}
      />
    );
  }

  componentDidMount() {
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      })),
    );
  }
  componentWillUnmount() {
    firebaseSvc.refOff();
  }
}

Chat.PropTypes = {
  name: PropTypes.string || null,
  email: PropTypes.string || null,
  avatar: PropTypes.string || null,
};
export default Chat;
