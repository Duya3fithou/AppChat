/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable no-alert */
import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FirebaseSvc from '../FirebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';
import {ScaledSheet} from 'react-native-size-matters';
const {width, height} = Dimensions.get('window');
const link =
  'https://firebasestorage.googleapis.com/v0/b/appchat-11.appspot.com/o/avatar%2F04bbb3c3-b564-4158-8dcc-3c44d1563842?alt=media&token=fa66b040-2e8f-426d-be98-fdfb29af9487';
export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    avatar: link,
    pickerResult: null,
    response: null,
    isHide: true,
  };

  onImageUpload = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Chat App Camera Roll Permission',
          message: 'Chat App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          title: 'Select Avatar',
          customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = {uri: response.uri};
            this.setState(
              {
                pickerResult: source,
                response,
              },
              async () => {
                var wantedMaxSize = 150;
                var rawheight = response.height;
                var rawwidth = response.width;

                var ratio = rawwidth / rawheight;
                var wantedwidth = wantedMaxSize;
                var wantedheight = wantedMaxSize / ratio;
                // check vertical or horizontal
                if (rawheight > rawwidth) {
                  wantedwidth = wantedMaxSize * ratio;
                  wantedheight = wantedMaxSize;
                }
                console.log(
                  'scale image to x:' + wantedwidth + ' y:' + wantedheight,
                );
                try {
                  // });
                  let uploadUrl = await FirebaseSvc.uploadImage(response.uri);
                  // console.log('response.uri: ', response.uri);
                  await this.setState({avatar: uploadUrl});
                  // console.log(' - await upload successful url:' + uploadUrl);
                  console.log(
                    ' - await upload successful avatar state:' +
                      this.state.avatar,
                  );
                  await FirebaseSvc.updateAvatar(uploadUrl);
                  this.setState({
                    isHide: false,
                  }); //might failed
                } catch (err) {
                  console.log('err:', err);
                }
              },
            );
          }
        });
      } else {
        alert('err');
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };

  _text = () => {
    if (this.state.isHide === true) return 'Skip';
    if (this.state.isHide === false) return 'Goto Chat Room';
  };

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }
  _logout = async user => {
    this.removeItemValue('@storage_token');
    await FirebaseSvc.onLogout(user);
    this.props.navigation.navigate('JoinRoom');
  };

  render() {
    console.log(this.props);
    return (
      <SafeAreaView>
        <View style={styles.wrapper_all}>
          <View style={styles.wrapper_header}>
            <View style={styles.wrapper_text_header}>
              <Text style={styles.text_header}>Profile</Text>
              <View style={styles.wrapper_info}>
                <Image
                  source={{uri: `${this.state.avatar}`}}
                  style={styles.avatar}
                />
                <View style={styles.wrapper_ic_edit}>
                  <TouchableOpacity onPress={this.onImageUpload}>
                    <Image
                      source={require('../Assets/icon/ic_create.png')}
                      style={styles.ic_edit}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.wrapper_text}>
                  <Text style={styles.text_hello}>Hello</Text>
                  <Text style={styles.user_name}>
                    {this.props.navigation.state.params.info.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.goto_chat}
            onPress={() => {
              this.props.navigation.navigate('Room', {
                info: this.props.navigation.getParam('info'),
                avatar: this.state.avatar,
              });
            }}>
            <Text style={styles.text_goto_chat}>Enjoy chat now</Text>
            <Image
              source={require('../Assets/icon/rightArrow.png')}
              style={styles.ic_arrow}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.wrapper_logout}
            onPress={this._logout}>
            <Text style={styles.text_signout}>Sign out</Text>
            <Image
              source={require('../Assets/icon/rightArrow.png')}
              style={styles.ic_arrow}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  wrapper_all: {
    flex: 1,
  },
  wrapper_header: {
    width,
    height: '190@vs',
    backgroundColor: '#0F192B',
    zIndex: 2,
  },
  text_header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  wrapper_text_header: {
    marginTop: '40@vs',
    marginLeft: '20@s',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  wrapper_info: {
    marginVertical: '15@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_hello: {
    color: '#fff',
    fontSize: 14,
    marginBottom: '5@vs',
  },
  user_name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  wrapper_text: {
    marginLeft: '10@s',
  },
  wrapper_ic_edit: {
    width: 20,
    height: 20,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40@s',
    marginLeft: '-17@vs',
  },
  ic_edit: {
    width: 15,
    height: 15,
  },
  wrapper_body: {
    backgroundColor: '#7A858F',
    alignItems: 'flex-end',
  },
  wrapper_logout: {
    height: '45@vs',
    width,
    paddingHorizontal: '20@vs',
    paddingVertical: '10@s',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#C1C8D9',
    marginTop: '327@vs',
  },
  goto_chat: {
    height: '45@vs',
    width,
    paddingHorizontal: '20@vs',
    paddingVertical: '10@s',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#C1C8D9',
  },
  ic_arrow: {
    width: 20,
    height: 20,
  },
  text_goto_chat: {
    color: '#2196F3',
    fontSize: 18,
  },
  text_signout: {
    color: '#FD282B',
    fontSize: 18,
  },
});
