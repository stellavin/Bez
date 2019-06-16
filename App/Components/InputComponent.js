import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,TextInput,Picker, } from 'react-native'
import styles from './Styles/InputComponentStyle'

export default class InputComponent extends Component {
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
      <View style={[styles.container, this.props.style]}>
      <View>
      {!this.props.is_picker?
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
              />:
               <Picker
                    selectedValue={"Type of Business"}
                    style={{
                      height: 35,
                      width: 270,
                      fontSize: 14,
                      color: "#939393"
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      
                    }}
                  >
                    <Picker.Item
                      label="Type of Business"
                      value="Type of Business"
                    />

                    </Picker>
      }
              </View>
             
      </View>
    )
  }
}
