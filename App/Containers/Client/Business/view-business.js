import React, { Component } from "react";
import { ScrollView, Text,Dimensions, Image, View } from "react-native";
import { connect } from "react-redux";
import Header from "../../../Components/Header";
import Slideshow from 'react-native-image-slider-show';
import style from '../../Styles/MainStyles';
import StarRating from 'react-native-star-rating';
import Icon from "react-native-vector-icons/FontAwesome5";



const screenHeight = Dimensions.get('window').height
class ViewBusinessScreen extends Component {

constructor(props) {
    super(props);
    
    this.state = {
        starCount: 3.5
      
    };
}
    
componentWillMount() {
    
}

  render() {
    return (
      <View style={style.container}>
        <Header
          show_search={false}
          type_of_nav = {'arrow-left'}
        />
        
        <View style={{marginTop: 20}}>
        <Slideshow 
            dataSource={[
                { url:'http://placeimg.com/640/480/any' },
                { url:'http://placeimg.com/640/480/any' },
                { url:'http://placeimg.com/640/480/any' }
            ]}/>
            <ScrollView>
            <View style={{marginLeft: 22,marginRight: 22}}>

                <View style={{flexDirection: "row", marginTop: 18}}>
                    <Text style={style.header1}>Buffet Spot </Text>
                    <View style={{ flex: 1,alignItems: 'flex-end'}}>
                    <StarRating
                        disabled={true}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        starSize={15}
                        rating={this.state.starCount}
                        selectedStar={(rating) => console.log(rating)}
                        fullStarColor={'#83d475'}
                    />
                    </View>
                    
                </View>

                <View style={{flexDirection: "row", marginTop: 18,textAlign: "right"}}>
                    <Text style={style.distance}> 28 meters </Text>
                    <View style={{ flex: 1,alignItems: 'flex-end'}}>
                    <Icon name = 'book' size = {20} color = '#000' />
                    </View>
                </View>

                <View style={{flexDirection: "row", marginTop: 18}}>
                     <Icon name = 'bookmark' size = {17.5} color = '#000' />
                    <Text style={style.favorite}>  Favorite </Text>
                    <View style={{ flex: 1,alignItems: 'flex-end'}}>
                        <Icon name = 'share' size = {17.5} color = '#000' />
                    </View>
                </View>

                <View style={{flexDirection: "row", marginTop: 18}}>
                <Icon name = 'phone' size = {17.5} color = '#000' />
                    <Text style={style.constct}>  0718 555 832 </Text>
                    <View style={{ flex: 1,alignItems:'center'}}>
                        <Text style={style.contactText}>(Call or Text)</Text>
                    </View>
                </View>
                </View>
                <View style={{height: screenHeight}}>
                
                <View style={{marginLeft: 22,marginRight: 22}}>
                

                <Text style={style.menu}>Menu</Text>

                {/* display menu */}
                <View style={{flexDirection: "row",marginTop: 15}}>
                    <Icon name = 'stop-circle' size = {25} color = '#000' />

                    <View style={{marginLeft: 20}}>
                        <Text style={style.menuTitle}>Ugali & Fish</Text>
                        <Text style={style.menuDesscription}>Served with greens</Text>
                    </View>
                    <View style={{ flex: 1,alignItems:'flex-end'}}>
                      <Icon name = 'check-double' size = {17.5} color = '#000' />
                    </View>

                </View>

                {/* menu 2 */}

                <View style={{flexDirection: "row",marginTop: 15}}>
                    <Icon name = 'stop-circle' size = {25} color = '#000' />

                    <View style={{marginLeft: 20}}>
                        <Text style={style.menuTitle}>Ugali & Fish</Text>
                        <Text style={style.menuDesscription}>Served with greens</Text>
                    </View>
                    <View style={{ flex: 1,alignItems:'flex-end'}}>
                      <Icon name = 'check-double' size = {17.5} color = '#000' />
                    </View>

                </View>

               

            </View>

             {/* Image section */}
             <View style={{marginTop: 30, flexDirection: 'row',flexWrap:'wrap'}}>
                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />
                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />
                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />

                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />

                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />

                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />

            </View>
            
            </View>

            </ScrollView>
        </View>
        
       
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewBusinessScreen);
