import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text ,Image, TouchableOpacity} from 'react-native'
import styles from './Styles/BusinessCardStyle'
import Icon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating';




export default class BusinessCardCustomer extends Component {

  render () {
    const navigate = this.props.navigate;
    return (
      <TouchableOpacity 
           onPress = {()=>{
             navigate.navigate("ViewCustomerBusinessScreen")
           }}
          >

             <View style={[styles.container,this.props.style]}>
              <Image
                    style={styles.image}
                    source={this.props.source}
                  />
                  <View style = {styles.column1}>
                  <View style = {styles.row}> 
                    <Text style = {styles.title}>{this.props.name}</Text>
                    <View style={{ flex:1,justifyContent: 'flex-end', alignItems:'flex-end'}}>
                        <Icon name = 'share' size = {17.5} color = '#2f2e41' />
                    </View>
                  </View>

                  <View style={{flexDirection:'row'}}>
                    <View style={{width: 80, flexDirection:'row', marginTop:5}}> 
                        <Text style = {styles.rating_text}>{this.props.rating}  </Text>
                        <StarRating
                              disabled={true}
                              emptyStar={'ios-star-outline'}
                              fullStar={'ios-star'}
                              halfStar={'ios-star-half'}
                              iconSet={'Ionicons'}
                              maxStars={5}
                              starSize={15}
                              rating={4}
                              selectedStar={(rating) => console.log(rating)}
                              fullStarColor={'#83d475'}
                          />
                          
                      </View> 
                      <View style={{ flex:1,justifyContent: 'flex-end', alignItems:'flex-end', flexDirection:'row'}}>
                          <Icon name = 'book' size = {17.5} color = '#b5b5b5' />
                          <Text style={styles.rateValue}> 24</Text>
                        </View>
                      
                    </View>

                  <View style = {styles.row}> 
                  <Text style = {styles.advertise_text}>Advertise</Text>
                  <View style={{ flex:1,justifyContent: 'flex-end', alignItems:'flex-end'}}>
                        <Text style={styles.edit}>EDIT</Text>
                    </View>
                  </View>

                  </View>
                
                
              </View>

          </TouchableOpacity>
     
    )
  }
}
