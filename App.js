console.disableYellowBox = true;
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import JoinRoomScreen from './src/screens/JoinRoom';
import ChatRoomScreen from './src/screens/ChatRoom';
const JoinStack = createStackNavigator({JoinRoom: JoinRoomScreen});
const ChatRoomStack = createStackNavigator({ChatRoom: ChatRoomScreen});
// eslint-disable-next-line no-undef
export default (App = createAppContainer(
  createSwitchNavigator(
    {
      Join: {
        screen: JoinStack,
      },
      ChatRoom: {
        screen: ChatRoomStack,
      },
    },
    {
      initialRouteName: 'Join',
    },
  ),
));
