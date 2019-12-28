
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, AsyncStorage, ImageBackground, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { ChatLineHolder } from './ChatLineHolder'
import Firebase from 'firebase';
export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatData: [],
            username: '',
            chatInputContent: '',
        }
    }
    static navigationOptions = {
        title: 'Phòng Chat',
    }
    async componentDidMount() {
        let username = await AsyncStorage.getItem('name');
        this.setState({ username })
        Firebase.database().ref('/chatRoom').on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    chatData: Object.values(snapshot.val())
                });
            }
        });
        this.flatList.scrollToEnd();
    }

    _sendMessage = () => {
    
        Firebase.database().ref('/chatRoom').push({
            userName: this.state.username,
            chatContent: this.state.chatInputContent,

        });
        this.setState({
            chatInputContent: ''
        });
     
    }
    _renderChatLine = (item) => {
        
        if (item.userName === this.state.username) {
            return (
                <View style={{ alignItems: 'flex-end' }} >
                    <ChatLineHolder sender="YOU" chatContent={item.chatContent} />
                </View>
            );
        }
        return (
            <ChatLineHolder sender={item.userName} chatContent={item.chatContent} />
        );
        
    };
    _onChangeChatInput = (text) => {
        this.setState({ chatInputContent: text })
        
    }

    


    render() {
        const { container, wrapperChat, styleImageBackground } = styles
        return (
            <SafeAreaView style={container} >
                <ImageBackground
                    imageStyle={{ opacity: 0.35 }}
                    source={require('../src/images/background.jpg')}
                    style={styleImageBackground} >
                        <FlatList 
                        ref={flatList => { this.flatList = flatList }}
                        data={this.state.chatData} 
                        renderItem={({ item }, index) => this._renderChatLine(item)} />

                </ImageBackground>
                <View style={{ flex: 1 / 10 }} >
                    <View style={wrapperChat}  >
                        <View style={{ flex: 9 / 10 }} >
                            <TextInput placeholder="Nhập nội dung chat" value={this.state.chatInputContent}
                                onChangeText={(text) => this._onChangeChatInput(text)} style={{ height: 100, fontSize: 16 }} />
                        </View>
                        <View style={{ flex: 1 / 10 }} >
                            <TouchableOpacity onPress={() => {this._sendMessage(); this.flatList.scrollToEnd();}} >
                                <Image
                                source = {require('../src/images/send1.png')}
                                style = {{width:30, height:30, paddingRight: 30,}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-end'
    },
    wrapperChat: {
        flexDirection: 'row', backgroundColor: '#FFF',
        width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center', marginLeft: 2
    },
    styleImageBackground: {
        flex: 9 / 10, backgroundColor: '#A5A5A5', flexDirection: 'column', justifyContent: 'flex-end'
    }
})