import React, { Component } from 'react'
import { View, Text, Image,AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import firebase from "react-native-firebase";
// Styles
import styles from './Styles/SplashScreenStyle';
import firebase_app from "../Firebase";


class SplashScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state ={
       onboarding_done:false,

    }
    // console.warn(JSON.stringify(this.props.categories))
   
  }
  componentDidMount(){
    window = undefined;
    this.getCategories()
    
   
  }
  saveCategories(cat){
    try{
      AsyncStorage.setItem('CAT',cat);

    }catch(error){

    }
  }
  checkUser(){
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.warn('user logged')
          this.props.navigation.navigate("HomeScreen")
        }else{
          this.checkOnBoarding();
        }
     });
    }
    catch (error) {
      console.warn('error', error)
    }
  }
  
  async checkOnBoarding(){
    console.log('1')
    try {
     let onboarding_done =  await AsyncStorage.getItem("ONBOARDING_DONE");
     console.log('4', onboarding_done )
      if(onboarding_done != null){
        console.log('2')
          this.props.navigation.navigate("HomeScreen")          
      }else{
        console.log('3')
        this.props.navigation.navigate("OnboardingScreen")
      }
    } catch (error) {
      console.warn('error', error)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
                style={styles.splash_image}
                source={require("../Images/logo.png")}
              />
      </View>
    )
  }
  getCategories(){
    
    firebase_app
      .firestore()
      .collection("business-categories")
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          console.warn("the data is "+JSON.stringify(doc.data()));
           this.saveCategories(JSON.stringify(doc.data()))
         
          // this.state.ads_array.push(doc.data())
        });

        this.checkUser()
    });
  }
 
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
