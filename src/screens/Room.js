/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import firebaseSvc from '../FirebaseSvc';
class Room extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Room!',
  });
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [],
    };
  }
  componentDidMount = async () => {
    const arr = [];
    await firebaseSvc.getChatRoom(list => {
      arr.push(list);
    });
    this.setState({listRoom: arr});
  };
  _getUser() {
    const user = {
      name: this.props.navigation.state.params.info.name,
      email: this.props.navigation.state.params.info.email,
      avatar: this.props.navigation.state.params.avatar,
    };
    return user;
  }
  navigateChatRoom = () => {
    this.props.navigation.navigate('ChatRoom123', {user: this._getUser()});
  };
  render() {
    console.log('this.props: ', this.props);
    console.log(this.state.listRoom);
    return (
      <View style={styles.wrapper_all}>
        <Text style={styles.text_header}>
          Hiện đang có {this.state.listRoom.length} phòng chat
        </Text>
        <FlatList
          data={this.state.listRoom}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.navigateChatRoom()}>
              <View style={styles.wrapper_button}>
                <Text style={styles.button_text}>{item.id}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default Room;
const styles = StyleSheet.create({
  wrapper_all: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  text_header: {
    fontSize: 18,
    marginLeft: 10,
  },
  wrapper_button: {
    width: 300,
    height: 40,
    backgroundColor: '#2196F3',
    margin: 10,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button_text: {
    color: 'white',
  },
});
