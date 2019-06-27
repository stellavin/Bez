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
       categories:[],
       selected:"",

    }
    console.warn(JSON.stringify(this.props.categories))
   
  }
  componentDidMount(){
    
  }

  renderCategory(){
    return this.props.categories.map((category, i)=>{
         return (
          <TouchableOpacity
          key={i}
           onPress = {()=>{
            this.props.onCategoryChange(category.category)
             this.setState({selected:category.category})
            
            // console.warn("the selected is "+ category.category)
           }}
           >
           <View>
           {this.state.selected == category.category?
            <Text style = {[styles.cat,{color:'#2EB62C'}]}>{category.category}</Text>:
            <Text style = {styles.cat}>{category.category}</Text>
            
           }
          
          </View>
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
