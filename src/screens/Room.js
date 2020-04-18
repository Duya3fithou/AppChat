/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebaseSvc from '../FirebaseSvc';
import GLOBAL from './global.js';
import {ScaledSheet} from 'react-native-size-matters';
const {width, height} = Dimensions.get('window');
class Room extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Room!',
    header: null,
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
  navigateChatRoom = roomName => {
    GLOBAL.roomName = roomName;
    this.props.navigation.navigate('ChatRoom123', {user: this._getUser()});
  };
  render() {
    console.log('this.props: ', this.props);
    console.log(this.state.listRoom);
    return (
      <View style={styles.wrapper_all}>
        <View style={styles.wrapper_header}>
          <View />
          <Text style={styles.header_text}>Rooms list</Text>
          <TouchableOpacity>
            <Image
              style={styles.create_room}
              source={require('../Assets/icon/create.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper_text_room}>
          <Text style={styles.text_header}>
            Hiện đang có {this.state.listRoom.length} phòng chat
          </Text>
        </View>
        <FlatList
          data={this.state.listRoom}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.navigateChatRoom(item.id)}>
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
const styles = ScaledSheet.create({
  create_room: {
    width: 35,
    height: 35,
  },
  wrapper_text_room: {
    height: '40@vs',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  wrapper_header: {
    height: '40@vs',
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'space-between',
    width,
    flexDirection: 'row',
    paddingHorizontal: '10@s',
  },
  header_text: {
    color: '#fff',
    fontSize: 17,
  },
  wrapper_all: {
    flex: 1,
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
