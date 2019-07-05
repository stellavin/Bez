import React, { Component } from "react";
import { ScrollView, Text, View,Image, Dimensions, TouchableOpacity, StyleSheet} from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/AddBusinessScreenStyle";
import InputComponent from "../Components/InputComponent";
import Thumbnail from "../Components/Thumbnail";
import BottomButtonFull from "../Components/BottomButtonFull";
import AddButton from "../Components/AddButton";
import { CheckBox } from 'react-native-elements'

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
const screenHeight = Dimensions.get('window').height;



class AddServicesScreen extends React.Component {

    constructor(props) {
      super(props);
      // TODO: undo the lines
  
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
        images:[]
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
        console.log('uri----', source) 
        this.setState(prevState => ({
          images: [...prevState.images, {
            name: source}]
        }))

        console.log('images----', this.state.images)
        }
        else{
          console.log('error')
          
        }
      });
    }
  
    render() {
      const {servicesChecked, menuChecked, productsChecked} = this.state;
      return (
        <View style={styles.container}>
         <ScrollView style={{height:'100%',flexGrow: 1}}>
         <Text style = {styles.title2}>
         Type of Category: Hotel
         </Text>
  
         <Text style = {styles.que1}>What do you want to add</Text>

        <View style={{flexDirection:"row"}}>
          <CheckBox
              title='Menu'
              checked={this.state.menuChecked}
              onPress={() => this.handleMenu()}

            />

            <CheckBox
              title='Services'
              checked={this.state.servicesChecked}
              onPress={() => this.handleServices()}

            />

            <CheckBox
              title='Products'
              checked={this.state.productsChecked}
              onPress={() => this.handleProducts()}

            />

        </View>

        {
          menuChecked ?(

            <View>
              <Text  style = {styles.que1}>Add (menu)</Text>
              <View style={{marginLeft: 22,width: 320, marginTop: 20, marginBottom: 20}}>
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

                <View style={{marginLeft: 22,width: 320, marginTop: 20, marginBottom: 20}}>
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

                <View style={{marginLeft: 22,width: 320, marginTop: 20, marginBottom: 20}}>
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
                onPress={() => this.addServiceItem()}
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
