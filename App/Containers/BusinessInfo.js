import React, { Component } from "react";
import { ScrollView, Text, View,Button, Picker, PermissionsAndroid,Image, Dimensions, TouchableOpacity} from "react-native";
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

  


class BusinessInfo extends React.Component{
  
    state = {
      driversExist: false,
      picker_items: [
        {
          id: 'Hotel',
          name: 'Hotel'
        },
        {
          id: 'Hospital',
          name: 'Hospital'
        },
        {
            id: 'Salon',
            name: 'Salon'
          },
          {
            id: 'Clothing',
            name: 'Clothing'
          },
          {
            id: 'Garage',
            name: 'Garage'
          }
      ],
      picker_items2: [
        {
          id: 'Menu',
          name: 'Menu'
        },
        {
          id: 'Services',
          name: 'Services'
        },
        {
            id: 'Products',
            name: 'Products'
          }
      ],
      type:"",
      category: "",
      business_name: "",
      phone_number:"",
      latitude:"",
      longitude:"",
      error:"",
      latitudeDelta:"",
      longitudeDelta:"",

      thumbnail_uri:"",
      thumbnail_src:"",

      biz_cover_photo_1_src: "",
      biz_cover_photo_1_uri: "",

      biz_cover_photo_2_src: "",
      biz_cover_photo_2_uri: "",

      biz_cover_photo_3_src: "",
      biz_cover_photo_3_uri: "",

      showAlert: false,
      showSuccess: false,
      showDanger: false
    };
  


  pickItem(name, category, index){
    ImagePicker.showImagePicker(options, response => {
      console.log('options------', options)
      console.log('response------', response)
      if(response.uri != undefined){
      const source = { uri: response.uri };
     
      if(name == "Thumbnail"){
        this.setState({thumbnail_src: response.uri });
        console.warn("url----",source )
      console.warn("url---000----",this.state.thumbnail_src )

      return this.saveToFirebase(name,category,source, index)
      }else if (name == "biz_cover_photo_1") {
        this.setState({biz_cover_photo_1_src: response.uri });
        console.warn("url----",source )
      console.warn("url---000----",this.state.thumbnail_src )

      return  this.saveToFirebase(name,category,source, index)

      }else if (name == "biz_cover_photo_2") {
        this.setState({biz_cover_photo_2_src: response.uri });
        console.warn("url----",source )
      console.warn("url---000----",this.state.thumbnail_src )

      return this.saveToFirebase(name,category,source, index)

      }else if (name == "biz_cover_photo_3") {
        this.setState({biz_cover_photo_3_src: response.uri });
        console.warn("url----",source )
      console.warn("url---000----",this.state.thumbnail_src )

      return this.saveToFirebase(name,category,source, index)

      }
      
    }
    else{
      console.log('error')
      
    }
    });
  }

  saveToFirebase(name,category,source, index){
    this.setState({showAlert: true})
    this.firebaseFunction(
      source,
      name,
      "Business_images",
      index
    );
   
  }

  firebaseFunction(uri, imageName, folderName, index) {
    firebase
      .storage()
      .ref(folderName)
      .child(imageName).putFile(uri.uri, { contentType: "image/jpg" })
      .then(url => {
        // URL of the image uploaded on Firebase storage
        console.warn(JSON.stringify(url.downloadURL));
        console.log('image',JSON.stringify(url.downloadURL));
        const src = uri
        const name = imageName
        const firebase_uri = url.downloadURL;
        console.warn('firebase url---', firebase_uri)
        
        if(imageName == "Thumbnail"){
          console.log('thumnanil', firebase_uri)
          return this.setState({thumbnail_uri: firebase_uri, showAlert: false})
        }else if (imageName == "biz_cover_photo_1") {
          return this.setState({biz_cover_photo_1_uri: firebase_uri, showAlert: false })

        }else if (imageName == "biz_cover_photo_2") {
          return this.setState({biz_cover_photo_2_uri: firebase_uri , showAlert: false})
          

        }else if (imageName == "biz_cover_photo_3") {
          return this.setState({biz_cover_photo_3_uri: firebase_uri, showAlert: false })
          

        }
        
      })
      .catch(error => {
        // this.setState({ showLoading: false });
        console.log(error);
      });
  }

  CreateBusiness = () => {
    this.setState({showAlert: true})
    
    if(
      this.state.type != "" ||
      this.state.category != "" ||
      this.state.business_name != "" ||
      this.state.phone_number != "" ||
      this.state.thumbnail_uri != "" ||
      this.state.biz_cover_photo_1_uri != "" ||
      this.state.biz_cover_photo_2_uri != "" ||
      this.state.biz_cover_photo_3_uri != ""
    ){

      // save to firebase
      
      firebase_app.firestore().collection('customer-businesses').doc().set({
        user_uid:this.props.currentUser.uid,
        business_name:this.state.business_name,
        business_type:this.state.type,
        business_category:this.state.category,
        phone_number: this.state.phone_number,
        location:this.props.pos,
        business_thumbnail: this.state.thumbnail_uri,
        business_cover_photos: [this.state.biz_cover_photo_1_uri,this.state.biz_cover_photo_2_uri, this.state.biz_cover_photo_3_uri]
      
      }).then((doc) => {  // fetch the doc again and show its data
            console.log("Business----data---",doc)  // prints {id: "the unique id"}
            this.setState({showAlert: false})
            this.setState({showSuccess: true, successMessage: "Congratulations you have successfully added your business"})
      
    })
      
    }else {
      console.log('Fill in all the fields')
      this.setState({showDanger: true})
    }

  }

  GotoServices(){
    this.props.navigation.navigate("AddServicesScreen");
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
  
  

 

  handleChange =(itemValue, itemIndex) => {
    this.setState({ type: itemValue });
  }

  handleChangeCateory  =(itemValue, itemIndex) => {
    this.setState({ category: itemValue });
    
  }

  handleChangeBizName  =(value) => {
    this.setState({ business_name: value });
    console.log('text----', value)
  }

  handleChangePhoneNo  =(value) => {
    this.setState({ phone_number: value });
    console.log('text----', value)
  }

 
  render() {
    const {picker_items, picker_items2, thumbnail_src, biz_cover_photo_1_src, biz_cover_photo_2_src, biz_cover_photo_3_src} = this.state;
    
    return (
      <View style={styles.container}>
        <ScrollView>
          <InputComponent
            style={{ marginTop: 23, marginRight: 22, marginLeft: 22 }}
            placeholder="Business Name"
            onChangeText ={this.handleChangeBizName}
          />
       
          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            is_picker={true}
            items={picker_items}
            itemValue={this.state.type}
            handleChange ={this.handleChange}
            placeholder="Select Type of Business"
          />

          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            is_picker={true}
            items={picker_items2}
            itemValue={this.state.category}
            handleChange ={this.handleChangeCateory}
            placeholder="Select Business Category"
          />

          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Phone Number"
            onChangeText = {this.handleChangePhoneNo}
            inputType = {'numeric'}
          />

          <Text style={styles.radio_title}>Take Order/Calls</Text>

          <Text style={styles.business_location}>Business Location</Text>

          <Text style={styles.tip1}>
            It's Recommended to be at the location of the business!
          </Text>
          {this.props.pos.length != undefined || this.props.pos.length > 0 ?(
            <MapView
            style={{width: 400, height: 200}}
              initialRegion={{ // initial region set to Bileto
                 latitude: this.props.pos[0],
                  longitude: this.props.pos[1],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
              }}
              >
  
              </MapView>

          ): 
          null
          }
          
          <Text style={styles.bus_thumb}>Business Thumbnail</Text>


          {thumbnail_src != ""?(
            <Image 
            source={{uri: thumbnail_src}}
            style={{width: 100, height: 100, marginLeft: 22, marginTop: 8}}
            />

              ):
              <TouchableOpacity
                onPress={() => {this.pickItem('Thumbnail', 'Thumbnail')}}
                style={{ marginLeft: 22, marginTop: 8}}
              >
                <Icon name="image" size={80}  />
              </TouchableOpacity>
              }
          
          <Text style={styles.bus_thumb}>Business cover photos (3 only)</Text>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 22,
              marginBottom: 60
            }}
          >
            {biz_cover_photo_1_src != ""?(
            <Image 
            source={{uri: biz_cover_photo_1_src}}
            style={{width: 100, height: 100, marginTop: 8}}
            />

              ):
              <TouchableOpacity
                onPress={() => {this.pickItem('biz_cover_photo_1', 'biz_cover_photo_1')}}
                style={{ marginLeft: 22, marginTop: 8}}
              >
                <Icon name="image" size={80}  />
              </TouchableOpacity>
              }

            {biz_cover_photo_2_src != ""?(
              <Image 
              source={{uri: biz_cover_photo_2_src}}
              style={{width: 100, height: 100,marginLeft: 14, marginTop: 8}}
              />

                ):
                <TouchableOpacity
                  onPress={() => {this.pickItem('biz_cover_photo_2', 'biz_cover_photo_2')}}
                  style={{ marginLeft: 22, marginTop: 8}}
                >
                  <Icon name="image" size={80}  />
                </TouchableOpacity>
                }


        {biz_cover_photo_3_src != ""?(
          <Image 
          source={{uri: biz_cover_photo_3_src}}
          style={{width: 100, height: 100,marginLeft: 14, marginTop: 8}}
          />

            ):
            <TouchableOpacity
              onPress={() => {this.pickItem('biz_cover_photo_3', 'biz_cover_photo_3')}}
              style={{ marginLeft: 22, marginTop: 8}}
            >
              <Icon name="image" size={80}  />
            </TouchableOpacity>
      }
            
          </View>

          {/* <BottomButtonFull
            navigation={this.props.navigation}
            performAnAction= {this.CreateBusiness()}
            goToPreview = {false}
            name="Continue"
           
          /> */}
          {/* <View style={styles.footer}> */}
                <Button
                    onPress={() => this.CreateBusiness()}
                    title="Continue"
                    color="#2eb62c"
                />

            {/* </View> */}
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





export default BusinessInfo;
