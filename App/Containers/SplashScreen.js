import React, { Component } from 'react'
import { View, Text, Image,AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import firebase from "react-native-firebase";
// Styles
import styles from './Styles/SplashScreenStyle'

class SplashScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state ={
       onboarding_done:false,

    }
    console.warn(JSON.stringify(this.props.categories))
   
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.warn('user logged')
        this.props.navigation.navigate("HomeScreen")
      }else{
        this.checkOnBoarding();
      }
   });
   
  }
  
  async checkOnBoarding(){
    try {
     let onboarding_done =  await AsyncStorage.getItem("ONBOARDING_DONE");
      if(onboarding_done){
          this.props.navigation.navigate("HomeScreen")          
      }else{
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
