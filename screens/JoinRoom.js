
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
var firebase = require('firebase');
//import firebase from 'react-native-firebase';

export default class JoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }
    _onChangeName = (text) =>{
        this.setState({ name: text})
    }
    _toChatRoom = () => {
        firebase.auth().signInAnonymously().then((user) => {
            AsyncStorage.setItem('name',this.state.name);
            this.props.navigation.navigate('ChatRoom');
        }).catch( (err) => alert(err) );
    }
    componentWillMount() {
        var config = {
            apiKey: "AIzaSyC20GfRRHUujxgkQbHiYQWNgd_Zi5XH55k",
            authDomain: "appchat-11.firebaseapp.com",
            databaseURL: "https://appchat-11.firebaseio.com",
            projectId: "appchat-11",
            storageBucket: "appchat-11.appspot.com",
            messagingSenderId: "943863919238",
            appId: "1:943863919238:web:c431b32190dc47ad30d707"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
         }
    };
    render() {

        return (
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10, paddingBottom: 15 }} >
                <Text>
                    ENTER YOUR NAME :
                </Text>
                <TextInput placeholder="" style={{
                    borderColor: "#A5A5A5",
                    borderWidth: 0.5, padding: 8, width: '100%', marginBottom: 15, marginTop: 15
                }}
                   onChangeText={(text) => this._onChangeName(text)}
                />
                <TouchableOpacity onPress={() => this._toChatRoom()} >
                    <Text style={{ fontWeight: 'bold' }} >
                        Join Now
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
