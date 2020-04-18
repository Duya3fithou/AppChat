/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
console.disableYellowBox = true;
import React from 'react';
import {View, Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import CreateAccount from './src/screens/CreateAccount';
import icon from './src/Assets/icon/icon';
import Room from './src/screens/Room';
const JoinStack = createStackNavigator(
  {
    JoinRoom: Login,
    CreateAccount: CreateAccount,
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: false,
    }),
  },
);
const ChatRoom = createStackNavigator({
  Room,
  ChatRoom123: Chat,
});
ChatRoom.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'ChatRoom123') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const TabNavigator = createBottomTabNavigator(
  {
    Profile: Profile,
    Chatting: ChatRoom,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;

        if (routeName === 'Profile') {
          return focused ? (
            <Image source={icon.onPersonal} style={{width: 25, height: 25}} />
          ) : (
            <Image source={icon.inPersonal} style={{width: 25, height: 25}} />
          );
        }
        if (routeName === 'Chatting') {
          return focused ? (
            <View style={{width: 25, height: 25}}>
              <Image source={icon.onChatting} style={{width: 25, height: 25}} />
            </View>
          ) : (
            <View style={{width: 25, height: 25}}>
              <Image source={icon.inChatting} style={{width: 25, height: 25}} />
            </View>
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2196F3',
      inactiveTintColor: '#fff',
    },
  },
);
const Switch = createSwitchNavigator(
  {
    Join: JoinStack,
    TabNavigator,
  },
  {
    initialRouteName: 'Join',
  },
);
const App = createAppContainer(Switch);
export default App;
