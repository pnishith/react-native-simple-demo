/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { AppRegistry } from 'react-native';
import Login from './src/modules/login';
import SignUp from './src/modules/signUp';
import Profile from './src/modules/profile';
// import List from './src/modules/list';
// import AddItem from './src/modules/addItem';
// import ViewItem from './src/modules/viewItem';
// import ScreenThree from './ScreenThree';

const App = createStackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  Profile: { screen: Profile },
  // List: { screen: List },
  // AddItem: { screen: AddItem },
  // ViewItem: { screen: ViewItem }
});

export default createAppContainer(App);

// AppRegistry.registerComponent('ThisDemo', () => App);