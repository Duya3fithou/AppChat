console.disableYellowBox = true;
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import CreateAccount from './src/screens/CreateAccount';
const JoinStack = createStackNavigator({
  JoinRoom: Login,
  CreateAccount: CreateAccount,
});
const ChatRoomStack = createStackNavigator({ChatRoom: Chat});
// eslint-disable-next-line no-undef
export default App = createAppContainer(
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
);
