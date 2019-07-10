import React, { Component } from "react";
import { TouchableOpacity, Text, Button, View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import style from '../../Styles/MainStyles';
import HeaderWithoutLogo from "../../../Components/HeaderWitoutLogo";
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from "react-native-image-picker";
import AwesomeAlert from 'react-native-awesome-alerts';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase_app from "../../../Firebase";
import firebase from "react-native-firebase";


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


class EditPhotoScreen extends Component {

  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      images:[],
      currentUser:"",
      successMessage:"",
      showAlert: false,
      showSuccess: false,
      showDanger: false,
      addedImages:[],
      newImages:[],
      business_data:[]
    };

}
 
componentWillMount() {
    console.warn("images---- "+ this.params.images)
    this.setState({images: this.params.images, newImages: this.params.images, business_data: this.params.business_data})
  }

  checkIfUserIsLoggedIn = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         console.warn('user logged', user)
         this.setState({currentUser: user.uid});
       }
    });
 
   }


  pickItem(item){
    ImagePicker.showImagePicker(options, response => {
      console.log('options------', options)
      console.log('response------', response)
      if(response.uri != undefined){
      const source = response.uri ; 
      const timestamp = Date.now();
      console.log('uri----', source) 
      var array = [...this.state.images];
      var index = array.indexOf(item)
        if (index !== -1) {
          array.splice(index, 1, source);
         // array.push(source);
          this.setState({images: array});
        }

        this.setState(prevState => ({
          addedImages: [...prevState.addedImages, {
            name: source,
            time: timestamp}]
        }))
      console.log('imagessss------', this.state.images)
     
  
      console.log('images----', this.state.images)
      }
      else{
        console.log('error')
        
      }
    });
  }

  pickItem2(){
    ImagePicker.showImagePicker(options, response => {
      console.log('options------', options)
      console.log('response------', response)
      if(response.uri != undefined){
      const source = response.uri ; 
      const timestamp = Date.now();
      console.log('uri----', source) 
      console.log('imagessss------', this.state.images)
      this.setState(prevState => ({
        images: [...prevState.images, source]
      }))

     this.state.addedImages.push({
      name: source,
      time: timestamp})
  
      console.log('images----', this.state.images)
      }
      else{
        console.log('error')
        
      }
    });
  }

  uploadListImageMeal = () => {
    const userID = this.state.currentUser;
    this.setState({showAlert: true})
    const urls = this.state.addedImages.map((image) => {
      const uploadUri =image.name;
      const time = image.time;
      const mime = 'application/octet-stream';
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      // let uploadBlob = null
      const currentTime = Date.now()
      console.log('im here 1')
      const imageRef = firebase.storage().ref(`images/${userID}/items/`).child(`${currentTime}.png`)
      return fs.readFile(uploadUri, 'base64')
        .then((data) => {
          console.log('im here 2')
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          // uploadBlob = blob
          console.log('im here 3')
          return imageRef.put(blob._ref, blob, { contentType: mime })
        })
        .then(() => {
          // uploadBlob.close()
          console.log('im here 4')
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          console.log('im here 5')
          return (url)
        })
        .catch((error) => {
          console.log('im here 6')
          return host
        })
    })
    return Promise.all(urls)
    .then((thumbnail_uri) => {
      console.log('im here 7')
      console.log('urls---------', thumbnail_uri);
      const arr = this.state.newImages.concat(thumbnail_uri)
      this.setState({newImages: arr})
      console.log('final images----', this.state.newImages)
      // this.state.newImages.push(thumbnail_uri)
      this.updateBusiness()
    })
  }

  updateBusiness = () => {
    

      // save to firebase
      console.log('images----00000--', this.state.newImages)
      
      firebase_app.firestore().collection('business-items').doc(this.state.business_data.business_item_uuid).update({
          business_uuid:this.state.business_data.business_uuid,
          items:this.state.business_data.items,
          images: this.state.newImages,
          service: this.state.business_data.service,
          business_item_uuid: this.state.business_data.business_item_uuid
      
      }).then((doc) => {  // fetch the doc again and show its data
            console.log("Business----data---",doc)  // prints {id: "the unique id"}
            this.setState({showAlert: false})
            this.setState({showSuccess: true, successMessage: "Congratulations you have successfully updated your business"})
      
    })
      
    

  }

  

  GotoServices(){
    this.props.navigation.navigate("MyBusinessScreen");
  }

  showSuccess = () => {
    this.setState({
      showSuccess: false
    });
    this.GotoServices();
  };

  renderCustomSuccessAlert = () => {
    <View>
      <Icon style={{fontSize: 80, color: 'green',alignSelf :"center",}} name="check"></Icon>
      <Text>{this.state.successMessage}</Text>
    </View>
  }
  

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
// new image




  render() {

    const {images}= this.state

    return (
    
      <View style={style.container}>
      
        <HeaderWithoutLogo
          type_of_nav={'arrow-left'}
          headerTitle = {'Photos'}
          navigation = {this.props.navigation}
        />

            <View style={{backgroundColor:"#f5f5f5", flex:1}}>
                <View style={{marginLeft: 20, marginTop: 20}}>
                  <Text style={styles.photosText}>Add Service Photos (Max 20)</Text>
                </View>



               {/* Image section */}
               <View style={{marginTop: 10, flexDirection: 'row',flexWrap:'wrap'}}>

               {
                      images.map((item, index) => (
                        <View style={{width: 120, height: 120}} >
                           <ImageBackground source={{uri: item}} style={{width: 120, height: 120}} >
                               <View style={style.footerAlign}>
                               <TouchableOpacity
                               style={style.deleteIcon}
                               onPress={() => {this.pickItem(item,index)}}
                               >
                                   <Icon name = 'trash-alt' size = {20} color = '#fff' />
                               </TouchableOpacity>
       
                               </View>
                           
                           </ImageBackground>
                               
                   
                        </View>
                   ))
                  }
            

                 {/* End */}

                 <TouchableOpacity 
                 style={style.addPhoto}
                 onPress={() => {this.pickItem2()}}
                  >
                     <View style={{marginTop: 20}}></View>
                    <Icon name = 'image' size = {40} color = '#b5b5b5' /> 
                    <Text style={style.addImageText}>+ Add Photo</Text> 
                 </TouchableOpacity>
               </View>
                
            </View>


            <View style={style.footer}>
                <Button
                    onPress={() => this.uploadListImageMeal()}
                    title="Finish"
                    color="#2eb62c"
                />

            </View>


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
              message="Please fill in all the fields to continue"
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
)(EditPhotoScreen);
