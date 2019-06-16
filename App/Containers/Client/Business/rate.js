import React, { Component } from "react";
import { ScrollView, Text,Dimensions, Image, View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import Header from "../../../Components/Header";
import Slideshow from 'react-native-image-slider-show';
import style from '../../Styles/MainStyles';
import StarRating from 'react-native-star-rating';
import Icon from "react-native-vector-icons/FontAwesome5";
import Dialog, { DialogContent,DialogFooter, DialogButton } from 'react-native-popup-dialog';



const screenHeight = Dimensions.get('window').height
class RateScreen extends Component {

constructor(props) {
    super(props);
    
    this.state = {
        starCount: 3.5,
        showRating: false,
      
    };
}
    
componentWillMount() {
    
}
submitRate(){
  this.setState({showRating: false})

}

submitReview(){
  this.setState({showRating: true})

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
                    <Text style={style.header1}>Koi's Boutique </Text>
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
                

                {/* display review */}
                <View style={{flexDirection: "row",marginTop: 15}}>
                    <Icon name = 'user-circle' size = {25} color = '#000' />

                    <View style={{marginLeft: 20}}>
                        <Text style={style.menuTitle}>John Doe</Text>
                        <View style={{width: 70}}>
                        <StarRating
                            disabled={true}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            starSize={10}
                            rating={this.state.starCount}
                            selectedStar={(rating) => console.log(rating)}
                            fullStarColor={'#83d475'}
                        />
                        </View>
                        <Text style={style.reviewText}>
                            Lorem Ipsum is simply dummy text of the 
                            printing and typesetting industry. Lorem 
                            Ipsum has been the industry's...</Text>
                    </View>

                </View>

                {/* second review */}

                <View style={{flexDirection: "row",marginTop: 15}}>
                    <Icon name = 'user-circle' size = {25} color = '#000' />

                    <View style={{marginLeft: 20}}>
                        <Text style={style.menuTitle}>Stella Sikhila</Text>
                        <View style={{width: 70}}>
                        <StarRating
                            disabled={true}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            starSize={10}
                            rating={this.state.starCount}
                            selectedStar={(rating) => console.log(rating)}
                            fullStarColor={'#83d475'}
                        />
                        </View>
                        <Text style={style.reviewText}>
                            Lorem Ipsum is simply dummy text of the 
                            printing and typesetting industry. Lorem 
                            Ipsum has been the industry's...</Text>
                    </View>

                </View>


            </View>

            
            
            </View>

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
                  disabled={true}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  starSize={30}
                  rating={this.state.starCount}
                  selectedStar={(rating) => console.log(rating)}
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
