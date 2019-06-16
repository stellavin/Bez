import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderTabsStyle'
import Icon from "react-native-vector-icons/FontAwesome5";


export default class HeaderTabs extends Component {
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
        <View style = {styles.row}>
        <TouchableOpacity>
        <Icon name = 'bars' size = {17.5} color = '#000' />
        </TouchableOpacity>

        <Text style = {styles.title}>
          {this.props.title}
        </Text>
        
      </View>
      </View>
    )
  }
}
