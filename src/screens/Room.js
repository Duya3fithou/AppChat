/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import firebaseSvc from '../FirebaseSvc';
class Room extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: (navigation.state.params || {}).name || 'Room!',
  });
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [],
    };
  }
  componentDidMount() {
    const arr = [];
    firebaseSvc.getChatRoom(list => {
      arr.push(list);
    });
    this.setState({listRoom: arr});
  }
  render() {
    //console.log(this.props);
    console.log(this.state.listRoom);
    return (
      <View style={styles.wrapper_all}>
        <Text style={styles.text_header}>
          Hiện đang có {this.state.listRoom.length} phòng chat
        </Text>
        <FlatList
          data={this.state.listRoom}
          renderItem={item => console.log(item)}
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
  },
  text_header: {
    fontSize: 18,
    marginLeft: 10,
  },
});
