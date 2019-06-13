import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,Image,TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderStyle'
import Input from './Input';
import Icon from "react-native-vector-icons/FontAwesome5";

export default class Header extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View>

      <View style = {styles.row}>
        <TouchableOpacity>
        <Icon name = 'bars' size = {17.5} color = '#000' />
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
