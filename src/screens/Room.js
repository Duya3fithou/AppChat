import React from 'react';
import {View, Text} from 'react-native';
class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text>Room</Text>
      </View>
    );
  }
}

export default Room;
