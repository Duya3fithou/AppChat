import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat'; // 0.3.0
import PropTypes from 'prop-types';
import firebaseSvc from '../FirebaseSvc';
import GLOBAL from './global';
import {ScaledSheet} from 'react-native-size-matters';
class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation}) => ({
    title: GLOBAL.roomName,
  });

  state = {
    messages: [],
    avatar: '',
  };

  get user() {
    return {
      name: this.props.navigation?.getParam('user')?.name,
      email: this.props.navigation?.getParam('user')?.email,
      avatar: this.props.navigation?.getParam('user')?.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }

  render() {
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
