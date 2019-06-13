import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import styles from './Styles/CategoriesStyle'

export default class Categories extends Component {
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
  constructor(props) {
    super(props);

    this.state ={
       categories:[]
    }
    console.warn(JSON.stringify(this.props.categories))
   
  }
  componentDidMount(){
    
  }

  renderCategory(){
    return this.props.categories.map((category)=>{
         return (
          <TouchableOpacity
            // onPress = {this.props.onPress}
           >
          <Text style = {styles.cat}>{category.category}</Text>
        </TouchableOpacity>
         )
    })
      
   
    
  }

  render () {
    return (
      <View style = {styles.container}>
      <ScrollView horizontal = {true}>
           {this.renderCategory()}
      </ScrollView>
      </View>
    )
  }
}
