import React, { Component } from "react";
import { ScrollView,CheckBox, Text, View,Image, Dimensions, TouchableOpacity, StyleSheet} from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/AddBusinessScreenStyle";
import InputComponent from "../Components/InputComponent";
import Thumbnail from "../Components/Thumbnail";
import BottomButtonFull from "../Components/BottomButtonFull";
import AddButton from "../Components/AddButton";
// import { CheckBox } from 'react-native-elements'

import firebase from "react-native-firebase";
import HeaderTabs from "../Components/HeaderTabs";
import firebase_app from "../Firebase";
import MapView from "react-native-maps";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import AwesomeAlert from 'react-native-awesome-alerts';
import RNFetchBlob from 'react-native-fetch-blob'
import HeaderWithoutLogo from "../Components/HeaderWitoutLogo";


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
    path: "images",
    showAlert: false,
    showSuccess: false,
    showDanger: false
  }
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



class AddServicesScreen extends React.Component {

    constructor(props) {
      super(props);
      this.params = this.props.navigation.state.params;
      this.state = {
        driversExist: false,
        menuChecked: false,
        servicesChecked: false,
        productsChecked: false,
        menuItems: [],
        servicesItems: [],
        productsItems: [],
        menuItem:"",
        serviceItem:"",
        productItem:"",
        images:[],
        imageUrls:[]
      };
    }

    handleMenu (){
      this.setState({
        menuChecked: !this.state.menuChecked,
        servicesChecked: false,
        productsChecked: false
      })

    }

    handleServices (){
      this.setState({
        servicesChecked: !this.state.servicesChecked,
        menuChecked: false,
        productsChecked: false
      })

    }

    handleProducts(){
      this.setState({
        productsChecked: !this.state.productsChecked,
        servicesChecked: false,
        menuChecked: false
      })

    }

    handleMenuItem  =(value) => {
       this.setState({ menuItem: value });
      console.log('text----', value)
    }

    addItem (){
      if(this.state.menuItem == ""){
        console.log('fill in -----')

      }else {
        this.setState(prevState => ({
          menuItems: [...prevState.menuItems, {
            name: this.state.menuItem
          }]
        }))
         console.log('menu ----item', this.state.menuItems)  

      }
      
    }

    handleServiceItem  =(value) => {
      this.setState({ serviceItem: value });
     console.log('text----', value)
   }

   addServiceItem (){
     if(this.state.serviceItem == ""){
       console.log('fill in -----')

     }else {
      this.setState(prevState => ({
        servicesItems: [...prevState.servicesItems, {
          name: this.state.serviceItem}]
      }))
       console.log('menu ----item', this.state.servicesItems)  

     }
     
   }

   handleProductItem  =(value) => {
    this.setState({ productItem: value });
   console.log('text----', value)
    }

    addProductItem (){
      if(this.state.productItem == ""){
        console.log('fill in -----')

      }else {
        this.setState(prevState => ({
          productsItems: [...prevState.productsItems, {
            name: this.state.productItem}]
        }))
        console.log('menu---products ----item', this.state.productsItems)  
      }
      
    }

    pickItem(){
      ImagePicker.showImagePicker(options, response => {
        console.log('options------', options)
        console.log('response------', response)
        if(response.uri != undefined){
        const source = response.uri ; 
        const timestamp = Date.now();
        console.log('uri----', source) 
        this.setState(prevState => ({
          images: [...prevState.images, {
            name: source,
            time: timestamp}]
        }))

        console.log('images----', this.state.images)
        }
        else{
          console.log('error')
          
        }
      });
    }

    uploadListImageMeal = () => {
      this.setState({showAlert: true})
      const userID = this.params.user_uid;
    
      const urls = this.state.images.map((image) => {
        const uploadUri =image.name;
        const time = image.time;
        const mime = 'application/octet-stream';
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        // let uploadBlob = null
        const currentTime = Date.now()
        const imageRef = firebase.storage().ref(`images/${userID}/items/${time}`).child(`${currentTime}.png`)
        return fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            // uploadBlob = blob
            return imageRef.put(blob._ref, blob, { contentType: mime })
          })
          .then(() => {
            // uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            return (url)
          })
          .catch((error) => {
            return host
          })
      })
    
    
      return Promise.all(urls)
        .then((data) => {
          console.log('urls---------', data);
          this.setState({imageUrls: data})
          this.saveItemsToDB(data)
        })
    }

    saveItemsToDB = (data) => {
      
      if(this.state.menuItems.length != undefined){
        
        firebase_app.firestore().collection('business-items').doc().set({
          business_uuid:this.params.business_uuid,
          items:this.state.menuItems,
          images: data
        
        }).then((doc) => {  // fetch the doc again and show its data
              console.log("item----data---",doc)  // prints {id: "the unique id"}
              this.setState({showAlert: false})
              this.setState({showSuccess: true, successMessage: "Congratulations you have successfully added your items"})
      })
        
      }else if(this.state.servicesItems.length != undefined){
        firebase_app.firestore().collection('business-items').doc().set({
          business_uuid:this.params.business_uuid,
          items:this.state.servicesItems,
          images: data
        
        }).then((doc) => {  // fetch the doc again and show its data
              console.log("item----data---",doc)  // prints {id: "the unique id"}
              this.setState({showAlert: false})
              this.setState({showSuccess: true, successMessage: "Congratulations you have successfully added your items"})
      })

      }else if(this.state.productsItems.length != undefined){
        firebase_app.firestore().collection('business-items').doc().set({
          business_uuid:this.params.business_uuid,
          items:this.state.productsItems,
          images: data
        
        }).then((doc) => {  // fetch the doc again and show its data
              console.log("item----data---",doc)  // prints {id: "the unique id"}
              this.setState({showAlert: false})
              this.setState({showSuccess: true, successMessage: "Congratulations you have successfully added your items"})
      })

      }else {
        console.log('Fill in all the fields')
        this.setState({showDanger: true})
      }
  
    }
  
    GotoServices(){
      this.props.navigation.navigate("HomeScreen");
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
  
    render() {
      const {servicesChecked, menuChecked, productsChecked} = this.state;
      return (
        <View style={styles.container}>
          <HeaderWithoutLogo
          type_of_nav={'arrow-left'}
          navigation={this.props.navigation}
          headerTitle = {'Add Items   '}
        />
         <ScrollView style={{height:'100%',flexGrow: 1}}>
         <Text style = {styles.title2}>
         Type of Category: Hotel
         </Text>
  
         <Text style = {styles.que1}>What do you want to add</Text>

       
        <View style={{flexDirection:'row', width: screenWidth, marginLeft: 10, marginTop: 8,marginBottom: 10}}>
            <View style={{flexDirection:'row', width: screenWidth/3}}>
                <CheckBox
                    value={this.state.menuChecked}
                    onValueChange={() => this.handleMenu()}
                    />
                <Text style={{marginTop: 5}}> Menu</Text>
            </View>

            <View style={{flexDirection:'row', width: screenWidth/3}}>
                <CheckBox
                    value={this.state.servicesChecked}
                    onValueChange={() => this.handleServices()}
                    />
                <Text style={{marginTop: 5}}> Services</Text>
            </View>

            <View style={{flexDirection:'row'}}>
                <CheckBox
                    value={this.state.productsChecked}
                    onValueChange={() => this.handleProducts()}
                    />
                <Text style={{marginTop: 5}}> Products</Text>
            </View>

        </View>

        {
          menuChecked ?(

            <View>
              <Text  style = {styles.que1}>Add (menu)</Text>
              <View style={{marginLeft: 22,width: 320, marginTop: 10, marginBottom: 20}}>
                  {
                    this.state.menuItems.map((item, index) => (
                      <View style = {serviceStyles.container}>
                        <TouchableOpacity
                          key = {item.id}
                          style={{width: 290}}
                          
                          // onPress = {() => this.alertItemName(item)}
                          >
                            <Text style = {serviceStyles.text}>
                              {item.name}
                          </Text>
                          
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={{alignItems:"flex-end"}}
                        onPress = {() => this.alertItemName(item)}>
                            <Icon  color="#fff" name="trash"></Icon>
                        </TouchableOpacity>
                           
                      </View>
                        
                    ))
                  }
              </View>
                
                <InputComponent
                  style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
                  placeholder="Item"
                  onChangeText ={this.handleMenuItem}
                  />
                  <View style = {{marginLeft:240,marginTop:10}}>
                  <View style={[styles.btncontainer,this.props.style]}>
                    <TouchableOpacity
                     onPress={() => this.addItem()}
                    >
                    <View>
                      <Text style = {styles.text}>+ Add</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>
            </View>

          ):null
        }

        {
          servicesChecked ?(
            <View>
                <Text  style = {styles.que1}>Add (Service)</Text>

                <View style={{marginLeft: 22,width: 320, marginTop: 10, marginBottom: 20}}>
                  {
                    this.state.servicesItems.map((item, index) => (
                      <View style = {serviceStyles.container}>
                        <TouchableOpacity
                          key = {item.id}
                          style={{width: 290}}
                          
                          // onPress = {() => this.alertItemName(item)}
                          >
                            <Text style = {serviceStyles.text}>
                              {item.name}
                          </Text>
                          
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={{alignItems:"flex-end"}}
                        onPress = {() => this.alertItemName(item)}>
                            <Icon  color="#fff" name="trash"></Icon>
                        </TouchableOpacity>
                           
                      </View>
                        
                    ))
                  }
              </View>

                <InputComponent
                  style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
                  placeholder="Item"
                  onChangeText ={this.handleServiceItem}
                  />
                  <View style = {{marginLeft:240,marginTop:10}}>
                  <View style={[styles.btncontainer,this.props.style]}>
                    <TouchableOpacity
                     onPress={() => this.addServiceItem()}
                    >
                    <View>
                      <Text style = {styles.text}>+ Add</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>
            </View>

          ):null
        }


        {
          productsChecked ?(
            <View>
                <Text  style = {styles.que1}>Add (Products)</Text>

                <View style={{marginLeft: 22,width: 320, marginTop: 10, marginBottom: 20}}>
                  {
                    this.state.productsItems.map((item, index) => (
                      <View style = {serviceStyles.container}>
                        <TouchableOpacity
                          key = {item.id}
                          style={{width: 290}}
                          
                          // onPress = {() => this.alertItemName(item)}
                          >
                            <Text style = {serviceStyles.text}>
                              {item.name}
                          </Text>
                          
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={{alignItems:"flex-end"}}
                        onPress = {() => this.alertItemName(item)}>
                            <Icon  color="#fff" name="trash"></Icon>
                        </TouchableOpacity>
                           
                      </View>
                        
                    ))
                  }
              </View>

                <InputComponent
                  style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
                  placeholder="Item"
                  onChangeText ={this.handleProductItem}
                  />
                  <View style = {{marginLeft:240,marginTop:10}}>
                  <View style={[styles.btncontainer,this.props.style]}>
                    <TouchableOpacity
                     onPress={() => this.addProductItem()}
                    >
                    <View>
                      <Text style = {styles.text}>+ Add</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>
            </View>

          ):null
        }
        
      
            <Text style={styles.bus_thumb}>Add Service Photos (Max 12)
  
              </Text>

              <View style={{marginBottom:20}}></View>
  
              <View
              style={{
                  flexDirection: "row",
                  marginLeft: 22,
                  marginBottom: 60,
                  flexWrap: 'wrap'
              }}
              >
                {
                    this.state.images.map((image, index) => (
                      <Image 
                      key={index}
                      source={{uri: image.name}}
                      style={{width: 73,
                          height: 69,
                          borderRadius: 3,
                          marginRight: 10,
                        marginTop: 8}}
                      />
                        
                    ))
                  }
                

                  <TouchableOpacity
                    onPress={() => {this.pickItem()}}
                    style={{ 
                      width: 73,
                      height: 69,
                      borderRadius: 3,
                      backgroundColor: "#ffffff",
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderColor: "#b5b5b5",
                      alignItems:"center",
                      marginTop: 8

                    }}
                  >
                    <Image
                    style={{marginTop: 20}}
                      source={require("../Images/image_icon.png")}
                    />
                  </TouchableOpacity>
                  
              
              </View>
              
            </ScrollView>
            <TouchableOpacity
                onPress={() => this.uploadListImageMeal()}
                style={{
                  width:screenWidth, 
                  bottom:0, 
                  backgroundColor:"#2eb62c",
                  alignItems:"center",
                height: 50}}
              >
              <View>
                <Text style={{color:"#fff",
               fontFamily: "Roboto",
               fontSize: 16,
               fontWeight: "500",
               fontStyle: "normal",
               lineHeight: 19,
               letterSpacing: 0,
               marginTop: 15}}>Finish</Text>
                </View>
              </TouchableOpacity>

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
)(AddServicesScreen);

const serviceStyles = StyleSheet.create ({
  container: {
     padding: 10,
     marginTop: 3,
     backgroundColor: '#303030',
     flex: 1,
     flexDirection:"row"
  },
  text: {
     color: '#fff'
  }
})
