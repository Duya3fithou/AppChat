/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable no-alert */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FirebaseSvc from '../FirebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';
export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    avatar: '',
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
    const user = {};
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <View
          style={{
            marginVertical: 15,
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16}}>
            Bạn nên đặt một ảnh đại diện để mọi người nhận ra bạn dễ dàng hơn
          </Text>
        </View>

        <TouchableOpacity onPress={this.onImageUpload}>
          <View style={styles.buttonLogin}>
            <Text style={styles.textLogin}>Upload avatar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Room', {
              info: this.props.navigation.getParam('info'),
              avatar: this.state.avatar,
            });
          }}>
          <View style={styles.buttonLogin}>
            <Text style={styles.textLogin}>{this._text()}</Text>
          </View>
        </TouchableOpacity>

        <View style={{marginTop: 300}}>
          <TouchableOpacity onPress={this._logout}>
            <View style={styles.buttonLogout}>
              <Text style={styles.textLogin}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    marginTop: 5,
    paddingHorizontal: offset,
    paddingVertical: 0,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: 42,
  },
  buttonLogin: {
    width: 300,
    height: 40,
    backgroundColor: '#2196F3',
    margin: 10,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonLogout: {
    width: 300,
    height: 40,
    backgroundColor: '#F88070',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  wrapperButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    color: '#fff',
    fontSize: 15,
  },
});
