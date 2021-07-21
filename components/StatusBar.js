import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import getLang from '../wallet/get-lang.js';

export default class app extends Component {
  render() {
    if (Platform.OS === 'ios'/* && !this.props.barStyle*/) {
      return (
         <StatusBar barStyle = 'light-content'
           hidden={false}
           translucent = {true}
           {...this.props}
         />
     );
    }
   return (
      <StatusBar barStyle = "light-content"
        backgroundColor="transparent"
        translucent = {true}
        {...this.props}
      />
  );
 }
}
