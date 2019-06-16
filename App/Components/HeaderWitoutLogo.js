import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,Image,TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderStyle'
import Input from './Input';
import Icon from "react-native-vector-icons/FontAwesome5";

export default class HeaderWithoutLogo extends Component {
  

  render () {
    return (
      <View style={styles.headerColor}>

      <View style = {styles.row}>
        <TouchableOpacity>
        <Icon name = {this.props.type_of_nav} size = {17.5} color = '#000' />
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.headerTitle}</Text>
      </View>
          
      </View>
    )
  }
}
