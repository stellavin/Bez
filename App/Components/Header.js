import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,Image,TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderStyle'
import Input from './Input';
import Icon from "react-native-vector-icons/FontAwesome5";

export default class Header extends Component {
  

  render () {
    const navigation = this.props.navigation;
    return (
      <View>

      <View style = {styles.row}>
      {/* this.props.navigation.goBack() */}
         
        <TouchableOpacity
        onPress={() => {
          if(this.props.type_of_nav == 'bars'){
            navigation.navigate("DrawerOpen");

          }else {
            navigation.goBack();
          }
          
        }}>
        <Icon name = {this.props.type_of_nav} size = {17.5} color = '#000' />
        </TouchableOpacity>
        <Image
            style={styles.logo}
            source={require("../Images/logo.png")}
          />
      </View>
        
         
          {this.props.show_search?<View style = {styles.search_input}><Input placeholder = {this.props.placeholder}/></View>:null}
        
          
          
      </View>
    )
  }
}
