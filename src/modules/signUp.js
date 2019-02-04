import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    AsyncStorage,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

let users = [];

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '', password: '', allUsers: '', isRegistered: false };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Sign Up",
            headerLeft: (
                <TouchableHighlight
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[styles.button, { backgroundColor: '#C56EE0', width: 50 }]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableHighlight>
            )
        }
    };

    componentWillMount() {
        // let datas;
        AsyncStorage.getItem('users', (err, result) => {
            // datas = JSON.parse(result)
            if (result !== null) {
                this.setState({ allUsers: JSON.parse(result) });
                users = this.state.allUsers !== null ? this.state.allUsers : [];
            }
        });
    }

    newUser(name, email, password, navigate) {
        if (this.state.isRegistered) {
            console.log('out', this.state.isRegistered);
            this.setState({ isRegistered: false });
        }
        console.log(name + ':::::' + email + ':::::' + password);
        if (name != '' && email != '' && password != '') {
            let userObj = {
                name: name, email: email, password: password
            }
            AsyncStorage.getItem('users', (err, result) => {
                console.log(result);
                if (result !== null) {
                    users = JSON.parse(result);
                    for (let user of users) {
                        if (user.email == email) {
                            alert('User Already Registered');
                            this.setState({ isRegistered: true })
                        }
                    }
                }
                if (this.state.isRegistered === false) {
                    console.log('in', this.state.isRegistered);
                    users.push(userObj);
                    AsyncStorage.setItem('users', JSON.stringify(users), () => {
                        AsyncStorage.getItem('users', (err, result) => {
                            console.log(result);
                            if (result !== null) {
                                users = JSON.parse(result);
                                for (let user of users) {
                                    if (user.email == email && user.password == password) {
                                        navigate("Profile", { screen: user })
                                    }
                                }
                            }
                        });
                    });
                }
            });

        }
    }

    render() {
        const { state, navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, width: 300, borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ name: text })}
                    autoFocus={true}
                    value={this.state.name}
                />
                <TextInput
                    style={{ height: 40, width: 300, borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ email: text })}
                    autoFocus={true}
                    value={this.state.email}
                />
                <TextInput
                    style={{ height: 40, width: 300, borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ password: text })}
                    autoFocus={true}
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity
                    onPress={() => this.newUser(this.state.name, this.state.email, this.state.password, navigate)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 22
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    button: {
        borderRadius: 20,
        height: 30,
        margin: 10,
        padding: 10,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});
export default SignUp;
