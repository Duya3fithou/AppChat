/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
console.disableYellowBox = true;
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import CreateAccount from './src/screens/CreateAccount';
const JoinStack = createStackNavigator({
  JoinRoom: Login,
  CreateAccount: CreateAccount,
});
const ChatRoom = createStackNavigator(
  {
    Profile,
    ChatRoom123: Chat,
  },
  {
    initialRouteName: 'Profile',
  },
);
export default (App = createAppContainer(
  createSwitchNavigator(
    {
      Join: {
        screen: JoinStack,
      },
      ChatRoom: {
        screen: ChatRoom,
      },
    },
    {
      initialRouteName: 'Join',
    },
  ),
));
