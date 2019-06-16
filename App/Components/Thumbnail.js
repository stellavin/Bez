import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TouchableOpacity} from 'react-native'
import styles from './Styles/ThumbnailStyle'
import Icon from "react-native-vector-icons/FontAwesome5";

export default class Thumbnail extends Component {
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
      <View style={[styles.container,this.props.style]}>
       <TouchableOpacity>
       <View style = {styles.square}>
         <Icon name = "image" size = {24.5} color = '#b5b5b5'/>
         </View>
       </TouchableOpacity>
      </View>
    )
  }
}
