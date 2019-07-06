import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,TouchableOpacity } from 'react-native'
import styles from './Styles/BottomButtonFullStyle'

export default class BottomButtonFull extends Component {
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
    const navigation = this.props.navigation;
    return (
      <View style={[styles.container,this.props.style]}>
      <TouchableOpacity
      // onPress={() =>{
      //   if(this.props.goToPreview){
      //     navigation.navigate('PreviewScreen')
      //   }else{
          
      //   } }}
      onPress = {this.props.onPress}
      >
        <Text style = {styles.name}>{this.props.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
