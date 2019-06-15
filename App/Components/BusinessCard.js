import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text ,Image, TouchableOpacity} from 'react-native'
import styles from './Styles/BusinessCardStyle'
import Icon from "react-native-vector-icons/FontAwesome5";

export default class BusinessCard extends Component {
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
    const navigate = this.props.navigate;
    return (
      <TouchableOpacity 
           onPress = {()=>{
             navigate.navigate("ViewBusiness")
           }}
          >
             <View style={[styles.container,this.props.style]}>
              <Image
                    style={styles.image}
                    source={this.props.source}
                  />
                  <View style = {styles.column1}>
                  <Text style = {styles.title}>{this.props.name}</Text>
                  <Text style = {styles.rating_text}>{this.props.rating}</Text>

                  <View style = {styles.row}> 
                  <Icon name = 'map-marker-alt' color = '#2eb62c' />
                  <Text style = {styles.directions_text}>Get directions</Text>
                  </View>

                  </View>
                
                
              </View>

          </TouchableOpacity>
     
    )
  }
}
