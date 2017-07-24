import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class MyTabBarItem extends Component{
  render (){
    <Image
      source = {this.props.focused?this.props.selectedImage:this.props.normalImage}
      style = {{tintColor:this.props.tintColor,width:25,height:25}}
      />
  }
}
