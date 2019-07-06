import React, { Component } from "react";
import { ScrollView, Text,Dimensions, Image, View,TouchableOpacity, Button,AsyncStorage } from "react-native";
import { connect } from "react-redux";
import Header from "../../../Components/Header";
import Slideshow from 'react-native-image-slider-show';
import style from '../../Styles/MainStyles';
import StarRating from 'react-native-star-rating';
import Icon from "react-native-vector-icons/FontAwesome5";
import firebase_app from "../../../Firebase";



const screenHeight = Dimensions.get('window').height
class ViewBusinessScreen extends Component {

constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
        starCount: 0,
        user_id:'',
        user_name:''
    };

}
    
componentWillMount() {
    console.warn("the name is "+ this.params.business_name+ 'the cover photos urls is '+ JSON.stringify(this.params.cover_photos_urls))
     this.getUser()
  }
  async getUser(){
    try{
    let fuid =  await AsyncStorage.getItem('FUID');
    let name =  await AsyncStorage.getItem('NAME');
    if(name && fuid){
      this.setState({
        user_name:name,
        user_id:fuid
      })
    }
    }catch(error){
  
    }
  }
addFavorite(){
  
    let data = {
      user_id: this.state.user_id,
      business_uid: this.params.business_id,
    }
    console.warn('the data is '+ JSON.stringify(data))
      firebase_app
          .firestore()
          .collection("favorite")
          .doc(new Date().toLocaleString())
          .set(data)
          .then(doc => {
            alert("Business successfully added to favorites");
          })
          .catch(function(error) {
            console.warn("Error getting document:", error);
          });
}
  render() {
    return (
      <View style={style.container}>
        <Header
          show_search={false}
          navigation={this.props.navigation}
          type_of_nav = {'arrow-left'}
        />
        
        <View style={{marginTop: 20}}>
        <Slideshow 
            dataSource={this.params.cover_photos_urls}/>
            <ScrollView>
            <View style={{marginLeft: 22,marginRight: 22}}>

                <View style={{flexDirection: "row", marginTop: 18}}>
                    <Text style={style.header1}>{this.params.business_name} </Text>
                    <View style={{ flex: 1,alignItems: 'flex-end'}}>
                    <TouchableOpacity
                    >
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
                    </TouchableOpacity>
                    </View>
                    
                </View>

                <View style={{flexDirection: "row", marginTop: 18,textAlign: "right"}}>
                    <Text style={style.distance}> 28 meters </Text>
                    <View style={{ flex: 1,alignItems: 'flex-end'}}>
                    <Icon name = 'book' size = {20} color = '#000' />
                    </View>
                </View>

                <TouchableOpacity onPress = {()=>{
                   this.addFavorite()
                }}>
                <View style={{flexDirection: "row", marginTop: 18}}>
                     <Icon name = 'bookmark' size = {17.5} color = '#000' />
                    <Text style={style.favorite}>  Favorite </Text>
                    <View style={{ flex: 1,alignItems: 'flex-end'}}>
                        <Icon name = 'share' size = {17.5} color = '#000' />
                    </View>
                </View>
                </TouchableOpacity>

                <View style={{flexDirection: "row", marginTop: 18}}>
                <Icon name = 'phone' size = {17.5} color = '#000' />
                    <Text style={style.constct}>  0718 555 832 </Text>
                    <View style={{ flex: 1,alignItems:'center'}}>
                        <Text style={style.contactText}>(Call or Text)</Text>
                    </View>
                </View>
                </View>
                <View style={{ flex: 1,alignItems: 'flex-end', marginRight: 20}}> 
                <View style={style.button}> 
                <Button
                    onPress={() => this.props.navigation.navigate('RateScreen',{business_id:this.params.business_id})}
                    title="Rate"
                    color="#2eb62c"
                    style={{width: 100}}
                  />

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
                 <Image source={require("../../../Images/gallery/2.png")} style={{width: 120, height: 120}} />
                 <Image source={require("../../../Images/gallery/3.png")}style={{width: 120, height: 120}} />
                 <Image source={require("../../../Images/gallery/4.png")}style={{width: 120, height: 120}} />

                 <Image source={require("../../../Images/gallery/5.png")}style={{width: 120, height: 120}} />

                 <Image source={require("../../../Images/gallery/6.png")}style={{width: 120, height: 120}} />

                 <Image source={require("../../../Images/gallery/7.png")}style={{width: 120, height: 120}} />

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
