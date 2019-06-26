
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Styles/MainStyles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager ,LoginButton} from 'react-native-fbsdk';

import { StackNavigator } from 'react-navigation';
import firebase from "react-native-firebase";
import firebase_app from "../Firebase";
import { Left } from 'native-base';

GoogleSignin.configure({
  webClientId: '527122886768-h4mdfrgv7h7c68551edc2esd1pfv48b8.apps.googleusercontent.com', offlineAccess: true,
});

class SideMenu extends Component {
  constructor() {
    super();
    this.ref = firebase_app.firestore().collection('users');
    
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.warn('user logged')
      }
   });
  }


  googleLogin = async () => {
        GoogleSignin.hasPlayServices()
        const data1 = await GoogleSignin.signIn();
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data1.idToken
        );
        firebase.auth().signInWithCredential(credential)
        .then(function (userCredential) {
              //sign in
              console.log(userCredential);
              //Fetch user data from user database using fuid
              let fuid = userCredential.user.uid;
              var userRef = firebase_app.firestore().collection('users').doc(fuid);
                  userRef.get().then(function(doc) {
                      if (doc.exists) {
                          console.log("Users first name is:", doc.data().name);

                          // user logged in

                      } else {
                          // doc.data() will be undefined in this case
                          console.log("No such document!");
                         let fuid = userCredential.user.uid

                         firebase_app.firestore().collection('users').doc(fuid).set({
                            name: userCredential.user.displayName,
                            uid:userCredential.user.uid,
                            email:userCredential.user.email,
                            photo_url:userCredential.user.photoURL
                          
                      })
                      // save currentUser to localstorage
                      console.warn('saved user')
                      }
                  }).catch(function(error) {
                      console.log("Error getting document:", error);
                  });

           }).catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              if (errorCode === 'auth/user-not-found') {
                  //handle this
              } else {
                  console.error(error);
              }
        });

  };



  async facebookLogin() {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request'); 
      }
  
      console.log('Login success with permissions :'+ result.grantedPermissions.toString());
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
  
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    } catch (e) {
      console.error(e);
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
          {/* Logo section */}
            <View style={{flexDirection: 'row', marginLeft: 24, marginTop: 34}}>
            <TouchableOpacity 
            style={{marginRight: 22}}
            >
                  <Icon name = 'arrow-left' size = {17.5} color = '#000' />
            </TouchableOpacity>
            <Image
                style={styles.logo}
                source={require("../Images/logo.png")}
              />
            </View>

            {/* Rate section */}

            <View style={{ flex: 1,alignItems: 'center',width:'100%', marginRight: 20, marginTop: 30}}> 
                <View style={{width: '80%'}}> 
                <Button
                    onPress={() => this.props.navigation.navigate('AddBusinessScreen')}
                    title="Add Your Business"
                    color="#2eb62c"
                    style={{width: 100}}
                  />

                </View>
                </View>

                {/*  */}

                <View style={{ flex: 1,alignItems: 'center',width:'100%', marginRight: 20, marginTop: 30}}> 
                <View style={{width: '80%'}}> 
                <Button
                    onPress={() => this.props.navigation.navigate('AdvertScreen')}
                    title="Create Advert"
                    color="#2f2e41"
                    style={{width: 100}}
                  />

                </View>
                </View>
   
            
          </View>
          {/* 1 */}
          <View style={{marginLeft: 25,marginTop: 37}}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('HomeScreen')}
            style={{flexDirection: 'row'}}>
                <Icon name = 'home' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>Home</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('FavoriteScreen')}
            style={{flexDirection: 'row',marginTop: 26}}>
                <Icon name = 'bookmark' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>Your Favorites</Text>

            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => console.log('')}
              style={{flexDirection: 'row', marginTop: 26}}>
              <Icon name = 'star' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>Top places</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('MyBusinessScreen')}
            style={{flexDirection: 'row', marginTop: 26}}>
                <Icon name = 'book' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>My Business</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('MyAdvertsScreen')}
            style={{flexDirection: 'row',  marginTop: 26}}>
                <Icon name = 'circle' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>My Adverts</Text>

            </TouchableOpacity>

            {/* google and facebook */}

            <TouchableOpacity 
            onPress={() => this.googleLogin()}
            style={{flexDirection: 'row',  marginTop: 45}}>
               <Image
                style={styles.logo}
                source={require("../Images/google.png")}
              />
            </TouchableOpacity>


            <TouchableOpacity 
            onPress={() => this.facebookLogin()}
            style={{flexDirection: 'row',  marginTop: 26}}>
               <Image
                style={styles.logo}
                source={require("../Images/facebook.png")}
              />
            </TouchableOpacity>

            {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row', marginTop: 26}}>
               <Text style={styles.sidebarText2}>Contact Us for Ads</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row', marginTop: 26}}>
               <Text style={styles.sidebarText2}>Terms of service</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row', marginTop: 26}}>
               <Text style={styles.sidebarText2}>Help</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row', marginTop: 26}}>
               <Text style={styles.sidebarText2}>Send Feedback</Text>

            </TouchableOpacity>
         
          </View>

        
         
        </ScrollView>
        
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;