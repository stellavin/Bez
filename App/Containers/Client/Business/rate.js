import React, { Component } from "react";
import { ScrollView, Text,Dimensions,KeyboardAvoidingView, AsyncStorage, View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import Header from "../../../Components/Header";
import Slideshow from 'react-native-image-slider-show';
import style from '../../Styles/MainStyles';
import StarRating from 'react-native-star-rating';
import Icon from "react-native-vector-icons/FontAwesome5";
import Dialog, { DialogContent,DialogFooter, DialogButton } from 'react-native-popup-dialog';
import firebase_app from "../../../Firebase";



const screenHeight = Dimensions.get('window').height
class RateScreen extends Component {

constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
        starCount: 0,
        showRating: false,
        rating_text:'',
        rater_uid:'',
        rater_name:'',
        ratings_array:[],
        slider:[]
      
    };
}
    
componentWillMount() {
  console.warn("images----- ", this.params.cover_photos_urls)
   this.getUser();
    this.fetchRatings()

}
async getUser(){
  try{
  let fuid =  await AsyncStorage.getItem('FUID');
  let name =  await AsyncStorage.getItem('NAME');
  if(name && fuid){
    this.setState({
      rater_name:name,
      rater_uid:fuid
    })
  }
  }catch(error){

  }
}
onTextChange = (text)=>{
  this.setState({
    rating_text:text
  })
}
submitRate(){
let data = {
  rating_text:this.state.rating_text,
  rater_uid:this.state.rater_uid,
  rating:this.state.starCount,
  business_uid:  this.params.business_id,
  rater_name:this.state.rater_name
}
console.warn('the data is '+ JSON.stringify(data))
this.setState({showRating: false})
  firebase_app
      .firestore()
      .collection("rate")
      .doc()
      .set(data)
      .then(doc => {
        this.fetchRatings()
        alert("Congratulations you have added your advert");
        
      })
      .catch(function(error) {
        console.warn("Error getting document:", error);
      });
  

}

submitReview(){
  this.setState({showRating: true})

}
fetchRatings(){
    let fetched
    firebase_app
      .firestore()
      .collection("rate")
      .where("business_uid", "==", this.params.business_id)
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          console.warn("the data is "+JSON.stringify(doc.data()))
          this.setState({
            ratings_array:[...this.state.ratings_array,doc.data()]
          })
        });
    });
}
renderRatings(){
  return this.state.ratings_array.map((rating)=>{
   return(
    <View style={{flexDirection: "row",marginTop: 15}}>
    <Icon name = 'user-circle' size = {25} color = '#000' />

    <View style={{marginLeft: 20}}>
        <Text style={style.menuTitle}>{rating.rater_name}</Text>
        <View style={{width: 70}}>
        <StarRating
            disabled={true}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            starSize={10}
            rating={rating.rating}
            selectedStar={(rating) => console.log(rating)}
            fullStarColor={'#83d475'}
        />
        </View>
        <Text style={style.reviewText}>
            {rating.rating_text}</Text>
    </View>

</View>
   )
  })
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
              <KeyboardAvoidingView behavior="padding">
            <View style={{marginLeft: 22,marginRight: 22}}>

                <View style={{flexDirection: "row", marginTop: 18}}>
                    <Text style={style.header1}>{this.params.business_name} </Text>
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

                
                </View>
                <View style={{height: screenHeight}}>
                
                <View style={{marginLeft: 22,marginRight: 22}}>
                

                <Text style={style.menu}>Reviews</Text>
                <View>

                <TextInput
                    style={style.textArea}
                    onChangeText = {this.onTextChange}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    />

                <View style={{ flex: 1,alignItems: 'flex-end'}}> 
                <View style={style.button}> 
                <Button
                    onPress={() => this.submitReview()}
                    title="Submit"
                    color="#2eb62c"
                    style={{width: 100}}
                  />

                </View>
                </View>
                </View>

                <View style={{marginBottom: 50}}></View>
                

               {this.renderRatings()}

            </View>

            
            
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        </View>

        <Dialog
          visible={this.state.showRating}
          
        >
          <DialogContent>
            <Text style={style.rateText}>Finish rating this place</Text>
            <View style={{alignItems: 'center'}}>
            <View style={{width: 150}}>
              <StarRating
                 
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  starSize={30}
                  rating={this.state.starCount}
                  selectedStar={(rating) => {
                    this.setState({
                      starCount: rating
                    });
                  }}
                  fullStarColor={'#83d475'}
              />
          </View>
          </View>
          <View style={{alignItems: 'center'}}>

            <View style={style.dialogueButton} > 
              <Button
                  onPress={() => this.submitRate()}
                  title="Done"
                  color="#2eb62c"
                />

              </View>
          </View>
          </DialogContent>
        </Dialog>


        
       
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
)(RateScreen);
