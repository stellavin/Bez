import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import styles from './Styles/InputStyle'
import Icon from "react-native-vector-icons/FontAwesome5";
export default class Input extends Component {
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
      <View style={styles.container}>
       <TextInput
                 style = {styles.input}
                underlineColorAndroid="transparent"
                placeholderTextColor="#939393"
                placeholder={this.props.placeholder}
                style={{
                  width: 260,
                  fontSize: 14,
                  height: 33,
                  padding: 5,
                  color: "#000"
                }}
                name="email"
                onChangeText={this.props.onChangeText}
                value={this.props.value}
              />
          <TouchableOpacity onPress = {this.props.onSearch}>    
            <Icon name = "search" color = '#2eb62c' size = {14.8}/>
          </TouchableOpacity>
      </View>
    )
  }
}
