import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Assets from '../Assets/Images/Assets';
import {styledChatlineHolder} from './styles';
export const ChatLineHolder = item => {
  return (
    <View style={styledChatlineHolder.wrapperBlock1}>
      <View style={styledChatlineHolder.wrapperChildBlock1}>
        <TouchableOpacity>
          <View style={styledChatlineHolder.chatLineHolder}>
            <Text>{item.chatContent}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const MyChatLineHolder = item => {
  return (
    <View style={styledChatlineHolder.wrapperBlock2}>
      <View style={styledChatlineHolder.wrapperChildBlock2}>
        <TouchableOpacity>
          <View style={styledChatlineHolder.myChatLineHolder}>
            <Text style={styledChatlineHolder.textColor}>
              {item.chatContent}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image style={styledChatlineHolder.iconUserSeen} source={Assets.user} />
    </View>
  );
};
