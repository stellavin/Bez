import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,TextInput,Picker, } from 'react-native'
import styles from './Styles/InputComponentStyle'

export default class InputComponent extends Component {

 

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
                  width: this.props.width?this.props.width: 260,
                  fontSize: 14,
                  height: 33,
                  padding: 5,
                  color: "#000"
                }}
                name="email"
                keyboardType = {this.props.inputType}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
              />:
               <Picker
                    selectedValue={this.props.itemValue}
                    style={{
                      height: 35,
                      width: this.props.width?this.props.width: 260,
                      color: "#939393",
                      
                    }}
                    onValueChange={this.props.handleChange}
                  >
                    <Picker.Item value= {this.props.placeholder} label={this.props.placeholder}/>
                    
                    {this.props.items.map((item, i) => {
                        return <Picker.Item key={i} value={item.id} label={item.name} />
                      })}

                  </Picker>
      }
              </View>
             
      </View>
    )
  }

}
