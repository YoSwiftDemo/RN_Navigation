import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StackNavigator,
  TabNavigator,
  TabBarBottom,
} from 'react-native';
//导入2个页面
import HomePage from "./src/HomePage.js"
import MyPage from "./src/MyPage.js"

export default  class MyStackNavigator extends Component{
  render (){
    return(
      <TabNavigator>
        
      </TabNavigator>
    );
  }
}
//
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  tab:{
    height:70,
    backgroundColor:"#222222",
    alignItems:"center",
  },
  tabText:{
    marginTop:1,
    color:"red",
    fontSize:16,
  },
  selectedTabText:{
    marginTop:1,
    color:"#FFD700",
    fontSize:16,
  },
  icon:{
    width:30,
    height:31,
    resizeModel:"stretch",
    marginTop:10,
  },
})
