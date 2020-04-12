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
import ImageEditor from '@react-native-community/image-editor';
import firebaseSvc from '../FirebaseSvc';
export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    avatar: '',
    pickerResult: null,
    response: null,
  };

  onImageUpload = async () => {
    const {pickerResult} = this.state;
    //const {status: cameraRollPerm} = await PERMISSIONS(PERMISSIONS.CAMERA_ROLL);
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

            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };

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
                  // let resizedUri = new Promise((resolve, reject) => {
                  //   ImageEditor.cropImage(
                  //     response.uri,
                  //     {
                  //       offset: {x: 0, y: 0},
                  //       size: {
                  //         width: response.width,
                  //         height: response.height,
                  //       },
                  //       displaySize: {width: wantedwidth, height: wantedheight},
                  //       resizeMode: 'contain',
                  //     },
                  //     uri => resolve(uri),
                  //     () => reject(),
                  //   );
                  //   console.log('resizedUri:', resizedUri);
                  // });
                  let uploadUrl = await firebaseSvc.uploadImage(response.uri);
                  console.log('response.uri: ', response.uri);
                  console.log('uploadUrl:', uploadUrl);
                  await this.setState({avatar: uploadUrl});
                  console.log(' - await upload successful url:' + uploadUrl);
                  console.log(
                    ' - await upload successful avatar state:' +
                      this.state.avatar,
                  );
                  await firebaseSvc.updateAvatar(uploadUrl); //might failed
                  console.log('uploadUrl: ', uploadUrl);
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
  componentDidMount() {
    console.log('cc:', this.props.navigation.getParam('info'));
  }

  render() {
    //const {name, email, avatar} = this.props.navigation.getParam('info');
    return (
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
        <TouchableOpacity onPress={this.onImageUpload}>
          <View style={styles.buttonLogin}>
            <Text style={styles.textLogin}>Upload avatar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ChatRoom123', {
              info: this.props.navigation.getParam('info'),
            });
          }}>
          <View style={styles.buttonLogin}>
            <Text style={styles.textLogin}>Goto chat</Text>
          </View>
        </TouchableOpacity>
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
  wrapperButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    color: '#fff',
    fontSize: 15,
  },
});
