console.disableYellowBox = true;
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import JoinRoomScreen from './screens/JoinRoom';
import ChatRoomScreen from './screens/ChatRoom';
const JoinStack = createStackNavigator({ JoinRoom: JoinRoomScreen });
const ChatRoomStack = createStackNavigator({ChatRoom : ChatRoomScreen});
export default App = createAppContainer(createSwitchNavigator(
{
  Join : {  
    screen : JoinStack
},
  ChatRoom : {
    screen : ChatRoomStack
  }
},
{
initialRouteName: 'Join',
}
));