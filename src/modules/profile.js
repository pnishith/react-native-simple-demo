import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { detail: '' };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Profile",
        }
    };

    render() {
        const { state, navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.buttonText}>{state.params.screen.name}</Text>
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
    button: {
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 22,
        alignSelf: 'center'
    }
});
export default Profile;
