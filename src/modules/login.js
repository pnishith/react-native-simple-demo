import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	AsyncStorage,
	TouchableOpacity
} from 'react-native';



class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
	}
	static navigationOptions = {
		title: "Login"
	}

	isLogin(email, password, navigate) {
		console.log(email + ':::::' + password);
		if (email != '' && password != '') {
			AsyncStorage.getItem('users', (err, result) => {
				if (result !== null) {
					users = JSON.parse(result);
					for (let user of users) {
						if (user.email == email && user.password == password) {
							navigate("Profile", { screen: user })
						}
					}
				} else {
					console.log("User is not registered2");
				}
			});
		}
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
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
					onPress={() => this.isLogin(this.state.email, this.state.password, navigate)}
					style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigate("SignUp", { screen: 'Sign Up' })}
					style={styles.button}>
					<Text style={styles.buttonText}>Register</Text>
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
		justifyContent: 'center',
		backgroundColor: 'red'
	},
	buttonText: {
		color: 'white',
		fontSize: 18
	}
});
export default Login;