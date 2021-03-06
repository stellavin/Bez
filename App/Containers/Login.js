import React, { Component } from "react";
import { ScrollView, Text, AsyncStorage, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/HomeScreenStyle";
import firebase from 'firebase'
import { GoogleSignin } from 'react-native-google-signin';
import firebase_app from "../Firebase";
import Header from "../Components/Header";
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from "react-native-vector-icons/FontAwesome5";


GoogleSignin.configure({
  webClientId: '527122886768-h4mdfrgv7h7c68551edc2esd1pfv48b8.apps.googleusercontent.com', offlineAccess: true,
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state ={
        user: null,
        successMessage:"",
        showAlert: false,
        showSuccess: false,
        showDanger: false,
        goToMyBusiness: false
    }
    
  }
  componentDidMount(){
    if(this.params.goToMyBusiness != undefined){
      this.setState({goToMyBusiness: this.params.goToMyBusiness})
    }
    
  }
  saveFuid(fuid){
    try{
      AsyncStorage.setItem("FUID", fuid);
    }catch(e){

    }
  }
  saveName (name){
    try{
      AsyncStorage.setItem("NAME", name);
    }catch(e){

    }
  }
  googleLogin = async () => {
    this.setState({showAlert: true})
    
    GoogleSignin.hasPlayServices()
    const data1 = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data1.idToken
    );
    // this.setState({showAlert: true})
   let  self = this;
    firebase.auth().signInWithCredential(credential)
    .then(function (userCredential) {
          //sign in
          console.log(userCredential);
          //Fetch user data from user database using fuid
          let fuid = userCredential.user.uid;
          self.setState({
            fuid:fuid
          })
          self.saveFuid(fuid)
          self.saveName(userCredential.user.displayName);
          var userRef = firebase_app.firestore().collection('users').doc(fuid);
              userRef.get().then((doc) => {
                  if (doc.exists) {
                    
                    console.log("Users first name is:", doc.data().name);
                    // this.setState = ({showAlert: false})
                      // user logged in
                      this.setState({showAlert: false})
                      // this.setState({showSuccess: true, successMessage: "Congratulations you have logged in"})



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
                  // this.setState({showAlert: false})
                  console.warn('saved user')
                  this.setState({showAlert: false})
                    // this.setState({showSuccess: true, successMessage: "Congratulations your account has been created"})
     
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

GotoServices(){
  if(this.state.goToMyBusiness){
    this.props.navigation.navigate("MyBusinessScreen");

  }else{
    this.props.navigation.navigate("HomeScreen");
  }
  
}

showSuccess = () => {
  this.setState({
    showSuccess: false
  });
  this.GotoServices();
};

renderCustomSuccessAlert = () => (
  <View>
    <Icon style={{fontSize: 80, color: 'green',alignSelf :"center",}} name="check"></Icon>
    <Text>{this.state.successMessage}</Text>
  </View>
);

  logout = () => {
    
  }

  render() {
    const { user } = this.state
    return (
      <View style={styles.container2}>
      <ScrollView >
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
             onPress = {this.googleLogin}
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



        {/* <View style={styles.alignCenter}>
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
        </View> */}

        
        
      
      </ScrollView>

      <AwesomeAlert
          show={this.state.showAlert}
          showProgress={true}
          message="loading ..."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          
        />

          <AwesomeAlert
              show={this.state.showDanger}
              showProgress={false}
              message="Please Fill All The Fields"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={false}
              cancelText="OK"
              confirmText="Yes, delete it"
              cancelButtonColor="red"
              onCancelPressed={() => {
                  this.setState({showDanger: false, showAlert: false, showSuccess: false})
              }}
              onConfirmPressed={() => {
                this.setState({showDanger: false, showAlert: false, showSuccess: false})
            }}
              
            />

            <AwesomeAlert
              show={this.state.showSuccess}
              customView={this.renderCustomSuccessAlert()}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={false}
              cancelText="Awesome"
              confirmText="Yes, delete it"
              cancelButtonColor="green"
              onCancelPressed={() => {
                this.showSuccess();
              }}
              onConfirmPressed={() => {
                this.showSuccess();
              }}
              
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
)(LoginScreen);
