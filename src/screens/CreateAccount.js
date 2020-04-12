/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable no-alert */
import React from 'react';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
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
class CreateAccount extends React.Component {
  static navigationOptions = {
    title: 'Create account',
  };

  state = {
    name: 'Duy',
    email: 'Duya3@gmail.com',
    password: 'Duymeo11',
    avatar: '',
    pickerResult: null,
    response: null,
  };

  onPressCreate = async () => {
    console.log('create account... email:' + this.state.email);
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
      };
      await firebaseSvc.createAccount(user);
      console.log('create account success. please login');
    } catch ({message}) {
      console.log('create account failed. catch error:' + message);
    }
  };

  onChangeTextEmail = email => this.setState({email});
  onChangeTextPassword = password => this.setState({password});
  onChangeTextName = name => this.setState({name});

  render() {
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Email"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
          secureTextEntry
          placeHolder="Password"
        />
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextName}
          value={this.state.name}
          placeHolder="Your name"
        />
        <View style={styles.wrapperButton}>
          <TouchableOpacity onPress={this.onPressCreate}>
            <View style={styles.buttonLogin}>
              <Text style={styles.textLogin}>Create</Text>
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
  wrapperButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    color: '#fff',
    fontSize: 15,
  },
});

export default CreateAccount;
