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
           onPress={() => {
            console.warn(
              "the clicked business name is " +
                this.props.business_name +
                "the id is " +
                this.props.business_id
            );
            let cover_photos_array = [];
            for (let i = 0; i < this.props.cover_photos_urls.length; i++) {
              cover_photos_array.push({ uri: this.props.cover_photos_urls[i] });
            }
            
            let  cover_photos = cover_photos_array;
            
            navigate.navigate("ViewCustomerBusinessScreen", {
              business_name: this.props.business_name,
              business_id: this.props.business_id,
              cover_photos_urls: cover_photos
            });
          }}

          style={{marginBottom: 10}}
          >

             <View style={[styles.container,this.props.style]}>
              <Image
                    style={styles.image}
                    source={{ uri: this.props.source }}
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
