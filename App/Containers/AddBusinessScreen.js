import React, { Component } from "react";
import { ScrollView, Text, View, Picker, PermissionsAndroid,Image, Dimensions, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/AddBusinessScreenStyle";
import InputComponent from "../Components/InputComponent";
import Thumbnail from "../Components/Thumbnail";
import BottomButtonFull from "../Components/BottomButtonFull";
import AddButton from "../Components/AddButton";
import firebase from "react-native-firebase";
import HeaderTabs from "../Components/HeaderTabs";
import firebase_app from "../Firebase";
import MapView from "react-native-maps";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import AwesomeAlert from 'react-native-awesome-alerts';
import BusinessInfo from "./BusinessInfo";
import AddServicesScreen from "./services"


export interface Props {
  navigation: any;
  list: any;
}
export interface State {}

const options = {
  title: "Select Photo",
  quality: 0.1,
  storageOptions: {
    skipBackup: true,
    initialLoader: false,
    path: "images"
  }
};

const screenWidth = Dimensions.get('window').width;



class AddBusinessScreen extends React.Component {

  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = { 
      item:"yes-------",
      latitude:"",
      longitude:"",
      error:"",
      latitudeDelta:"",
      longitudeDelta:"",
      pos: []
      

     };
     this.toggle = this.toggle.bind(this);

  }

  componentWillMount(){
    console.log('current user------id----', this.params.currentUser.uid)
    this.requestAccess();  
  }

  componentWillUnmount(){
    this.requestAccess();

  }



toggle = () => {
  console.log('current user----', this.state.item)
}

requestAccess = async () => {
  console.log('im here ---- 1')
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location permission',
        'message': 'App needs access to your location ' +
                   'so we can show your location.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('im here ---- 2')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("positions---->>>", position)
          const latitude = position.coords.latitude
            const longitude = position.coords.longitude
          
          let data = [
            latitude,
            longitude
            
          ]
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            pos: data
          });
                
        },
        (error) => this.setState({ error: error.message })
      );

    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}




  render() {

    
    return (
      <View style={styles.container}>
        <HeaderTabs
          title="Add Business"
          sub_title1="Business Info"
          sub_title2="Services"
          navigation = {this.props.navigation}
          tab1={<BusinessInfo navigation={this.props.navigation} pos= {this.state.pos} currentUser={this.params.currentUser} />}
          tab2={<AddServicesScreen navigation={this.props.navigation} />}
        />
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
)(AddBusinessScreen);
