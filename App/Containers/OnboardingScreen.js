import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import Swiper from "react-native-swiper";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/OnboardingScreenStyle";

class OnboardingScreen extends Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        dotStyle={{ width: 20, height: 10, borderRadius: 5 }}
        paginationStyle = {{}}
        activeDotColor="#2eb62c"
        dotColor="#fff"
      >
        <View style={styles.slide1}>
        <Image
            style={styles.logo}
            source={require("../Images/logo.png")}
          />
          <Image
            style={styles.slider_image}
            source={require("../Images/slider1.png")}
          />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.explanation}>
            A new way to find business near you. Convenience and time above all
            with
          </Text>
        </View>

        <View style={styles.slide2}>
        <Image
            style={styles.logo}
            source={require("../Images/logo.png")}
          />

          <Image
           style={styles.slider_image}
            source={require("../Images/slider2.png")}
          />
          <Text style={styles.title}>Search</Text>
          <Text style={styles.explanation}>
            Don't wonder around! Search for places and businesses near you
          </Text>
        </View>

        <View style={styles.slide3}>
        <Image
            style={styles.logo}
            source={require("../Images/logo.png")}
          />
          <Image
           style={styles.slider_image}
            source={require("../Images/slider3.png")}
          />
          <Text style={styles.title}>Find</Text>
          <Text style={styles.explanation}>
            A new way to find business near you convenience and save time with
          </Text>
          <TouchableOpacity 
           onPress = {()=>{
             this.props.navigation.navigate("HomeScreen");
           }}
          >
            <Icon size = {21} color = '#000' name = 'arrow-right'/>
          </TouchableOpacity>
        </View>
      </Swiper>
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
)(OnboardingScreen);
