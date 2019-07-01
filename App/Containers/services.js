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



class AddServicesScreen extends React.Component {

    constructor(props) {
      super(props);
      // TODO: undo the lines
  
      this.state = {
        driversExist: false
      };
    }
  
    render() {
      return (
        <View style={styles.container}>
         <ScrollView>
         <Text style = {styles.title2}>
         Type of Category: Hotel
         </Text>
  
         <Text style = {styles.que1}>What do you want to add</Text>
  
         <Text  style = {styles.que1}>Add (menu)</Text>
         <InputComponent
              style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
              placeholder="Item"
            />
            <AddButton style = {{marginLeft:240,marginTop:10}}/>
  
  
          <Text  style = {styles.que1}>Add (services)</Text>
  
          <InputComponent
              style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
              placeholder="Item"
            />
            <AddButton style = {{marginLeft:240,marginTop:10}}/>
  
          <Text  style = {styles.que1}>Add (products)</Text>
          <InputComponent
              style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
              placeholder="Item"
            />
            <AddButton style = {{marginLeft:240,marginTop:10}}/>
  
            <Text style={styles.bus_thumb}>Add Service Photos (Max 12)
  
              </Text>
  
              <View
              style={{
                  flexDirection: "row",
                  marginLeft: 22,
                  marginBottom: 60
              }}
              >
              <Thumbnail style={{ marginTop: 8 }} />
              <Thumbnail style={{ marginTop: 8 }} />
              
              </View>
            <BottomButtonFull
              navigation={this.props.navigation}
              goToPreview = {true}
              name="Finish"
             
            />
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
)(AddServicesScreen);
