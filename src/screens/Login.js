/* eslint-disable no-alert */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ImageEditor,
} from 'react-native';
import FirebaseSvc from '../FirebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends React.Component {
  state = {
    name: 'Duy',
    email: 'Duya3@gmail.com',
    password: 'Duymeo11',
    avatar: '',
  };

  storeToken = async () => {
    try {
      const token = await FirebaseSvc.getToken();
      console.log(token);
      await AsyncStorage.setItem('@storage_token', 'token');
    } catch (e) {
      //alert(e);
    }
  };
  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_token');
      if (value !== null) {
        this.loginSuccess();
      }
    } catch (e) {
      //alert('Error read token');
    }
  };
  componentDidMount() {
    this.getToken();
  }
  loginSuccess = () => {
    const info = {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
    };
    console.log('login successful, navigate to chat.');
    this.storeToken();
    this.props.navigation.navigate('Profile', {info});
  };

  loginFailed = () => {
    console.log('login failed ***');
    alert('Login failure. Please tried again.');
  };
  onPressLogin = async () => {
    console.log('pressing login... email:' + this.state.email);
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      avatar: this.state.avatar,
    };

    const response = FirebaseSvc.login(
      user,
      this.loginSuccess,
      this.loginFailed,
    );
  };

  onChangeTextEmail = email => this.setState({email});
  onChangeTextPassword = password => this.setState({password});

  render() {
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Email"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
          underlineColorAndroid="transparent"
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
          secureTextEntry
          placeHolder="Password"
        />
        <View style={styles.wrapperButton}>
          <TouchableOpacity onPress={this.onPressLogin}>
            <View style={styles.buttonLogin}>
              <Text style={styles.textLogin}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CreateAccount')}>
            <View style={styles.buttonLogin}>
              <Text style={styles.textLogin}>Create Account</Text>
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
    paddingHorizontal: offset,
    paddingVertical: 0,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: offset,
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

export default Login;
