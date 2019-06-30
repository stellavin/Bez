import React, { Component } from "react";
import { ScrollView, Text, Button, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/HomeScreenStyle";
import firebase from 'firebase'
import Header from "../Components/Header";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state ={
        user: null
    }
    
  }
  componentDidMount(){
    
  }
  login = () => {
    
  }

  logout = () => {
    
  }

  render() {
    const { user } = this.state
    return (
      <ScrollView style={styles.container2}>
        {/* <Header
          show_search={true}
          type_of_nav={'bars'}
          navigation = {this.props.navigation}
          placeholder="Search for a business/service..."
        /> */}

         <View style={styles.top}></View>

        <View style={styles.alignCenter}>
          <View style={{marginLeft: 62, marginRight: 62}}>
            <Image
              style={{marginTop: 10, marginLeft: 10}}
              source={require("../Images/logo.png")}
            />
          </View>
        </View>
        
        <View style={styles.top}></View>

        <View style={styles.alignCenter}>
          <View style={{marginLeft: 62, marginRight: 62}}>
           <Text style={styles.text}>Sign up to add, Favourite & Rate your 
            favorite places
            </Text>
          </View>
        </View>
        <View style={{marginTop: 35 }}></View>

        <View style={styles.alignCenter}>
          <View style={{marginLeft: 62, marginRight: 62}}>
           <TouchableOpacity
             style={styles.google}
           >
             <View style={{width: 40}}>
             <Image
             style={{marginTop: 10, marginLeft: 10}}
              source={require("../Images/google2.png")}
            />

             </View>
              
              <View style={{backgroundColor: '#4285F4', width: 180}}>
               <Text style={styles.googleText}>Sign in with Google</Text>
              </View>
              

           </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 15 }}></View>



        <View style={styles.alignCenter}>
          <View style={{marginLeft: 62, marginRight: 62}}>
           <TouchableOpacity
             style={styles.google}
           >
             <View style={{width: 40}}>
             <Image
             style={{marginTop: 10, marginLeft: 10}}
              source={require("../Images/facebook2.png")}
            />

             </View>
              <View style={{backgroundColor: '#4267B2', width: 180}}>
               <Text style={styles.googleText}>Sign in with Facebook</Text>
             </View>
              

           </TouchableOpacity>
          </View>
        </View>

        
        
      
      </ScrollView>
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
)(LoginScreen);
