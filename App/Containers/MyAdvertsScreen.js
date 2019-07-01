import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  CheckBox,
  TextInput
} from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from "react-native-vector-icons/FontAwesome5";

// Styles
import HeaderTabs from "../Components/HeaderTabs";
import InputComponent from "../Components/InputComponent";
import Thumbnail from "../Components/Thumbnail";
import BottomButtonFull from "../Components/BottomButtonFull";
import AddButton from "../Components/AddButton";
// Styles
import styles from "./Styles/MyAdvertsScreenStyle";
import PaymentAmount from "../Components/PaymentAmount";
import AdvertCard from "../Components/AdvertCard";
import firebase_app from "../Firebase";
class MyAdvertsScreen extends Component {
  constructor(props) {
    super(props);
    // TODO: undo the lines
    this.state = {
      ads_array:[]
    }
    this.params = this.props.navigation.state.params;
    
  }
  componentWillMount(){
    this.getMyAds()
  }
  render() {
    return (
      <View style={styles.container}>
        <HeaderTabs
          title="My Adverts"
          sub_title1="Active"
          sub_title2="History"
          navigation={this.props.navigation}
          tab1={this.renderMyAds()}
          tab2={ this.renderHistory()}
        />
      </View>
    );
  }


  //.where("fuid", "==", this.params.fuid)
  getMyAds(){
    let fetched
    firebase_app
      .firestore()
      .collection("adverts")
      .where("fuid", "==", this.params.fuid)
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          console.warn("the data is "+JSON.stringify(doc.data()))
          this.setState({
            ads_array:[...this.state.ads_array,doc.data()]
          })
          // this.state.ads_array.push(doc.data())
        });
    });
  }
  renderAds(){
    console.warn("the stringified data is "+ JSON.stringify(this.state.ads_array))
   return  this.state.ads_array.map((ad)=>{
   return(
    <AdvertCard
    preferred_time = {ad.preferred_time}
    days_active = {ad.days_active}
    style = {{marginLeft:22, marginRight:22,marginTop:19}}
      source={require("../Images/wide_image.png")}
    />
   )
    })
  }
  renderMyAds() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>My Adverts</Text>

           {this.renderAds()}

        </ScrollView>
      </View>
    );
  }
  renderHistory(){
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>My History</Text>

           {this.renderAds()}

        </ScrollView>
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
)(MyAdvertsScreen);
