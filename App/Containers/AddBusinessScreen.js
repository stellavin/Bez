import React, { Component } from "react";
import { ScrollView, Text, View, Picker, PermissionsAndroid, Dimensions, TouchableOpacity} from "react-native";
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

export interface Props {
  navigation: any;
  list: any;
}
export interface State {}

const options = {
  title: "Take Photo",
  quality: 0.1,
  storageOptions: {
    skipBackup: true,
    initialLoader: false,
    path: "images"
  }
};

const screenWidth = Dimensions.get('window').width;



class AddBusinessScreen extends React.Component {

  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = { 
      item:"yes-------",
      latitude:"",
      longitude:"",
      error:"",
      latitudeDelta:"",
      longitudeDelta:"",
      pos: []
      

     };
     this.toggle = this.toggle.bind(this);

  }

  componentWillMount(){
    this.requestAccess();  
  }



toggle = () => {
  console.log('current user----', this.state.item)
}

requestAccess = async () => {
  console.log('im here ---- 1')
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location permission',
        'message': 'App needs access to your location ' +
                   'so we can show your location.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('im here ---- 2')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("positions---->>>", position)
          const latitude = position.coords.latitude
            const longitude = position.coords.longitude
          
          let data = [
            latitude,
            longitude
            
          ]
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            pos: data
          });
                
        },
        (error) => this.setState({ error: error.message })
      );

    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}




  render() {

    
    return (
      <View style={styles.container}>
        <HeaderTabs
          title="Add Business"
          sub_title1="Business Info"
          sub_title2="Services"
          navigation = {this.props.navigation}
          tab1={<BusinessInfo navigation={this.props.navigation} pos= {this.state.pos}  />}
          tab2={<ServicesInfo navigation={this.props.navigation} />}
        />
      </View>
    );
  }
}

class BusinessInfo extends React.Component<Props, State> {
  constructor(props) {
    super(props); 
    this.state = {
      driversExist: false,
      picker_items: [
        {
          id: 'item',
          name: 'item'
        },
        {
          id: 'item 1',
          name: 'item 1'
        }
      ],
      picker_items2: [
        {
          id: 'item 3',
          name: 'item 3'
        },
        {
          id: 'item 6',
          name: 'item 6'
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
      longitudeDelta:""
    };
  }

  componentWillUnmount(){
    this.props.pos
  }

  pickItem(name, category, index){
    console.warn('item---', name, category)
    ImagePicker.launchCamera(options, response => {
      if(response.uri != undefined){
      const source = { uri: response.uri };
      console.warn("url----",source )
      this.saveToFirebase(name,category,source, index)
    }else{
      
    }
    });
  }

  saveToFirebase(name,category,source, index){
    this.setState({initialLoader: true})
    this.firebaseFunction(
      source,
      name,
      "DP_attachments",
      index
    );
   
  }

  firebaseFunction(uri, imageName, folderName, index) {
    firebase_app
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
        console.warn('url---', firebase_uri)
        // this._updateAttachments(src,firebase_uri, index)
        // this._updateImageObject (firebase_uri, name) 
        
      })
      .catch(error => {
        // this.setState({ showLoading: false });
        console.log(error);
      });
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

 
  render() {
    const {picker_items, picker_items2} = this.state;
    console.log('pos---00000----', this.props.pos)
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
          <TouchableOpacity
          onPress={this.pickItem('Thumbnail')}
          
          >
              <Thumbnail style={{ marginLeft: 22, marginTop: 8 }} />
          </TouchableOpacity>


          <Text style={styles.bus_thumb}>Business cover photos (3 only)</Text>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 22,
              marginBottom: 60
            }}
          >
            <TouchableOpacity>
               <Thumbnail style={{ marginTop: 8 }} />

            </TouchableOpacity>
            

            <TouchableOpacity>
                <Thumbnail style={{ marginLeft: 14, marginTop: 8 }} />
              
            </TouchableOpacity>

            <TouchableOpacity>
             <Thumbnail style={{ marginLeft: 14, marginTop: 8 }} />
              
            </TouchableOpacity>
            
            
           
          </View>

          <BottomButtonFull
            navigation={this.props.navigation}
            goToPreview = {false}
            name="Continue"
           
          />
        </ScrollView>
      </View>
    );
  }
}

class ServicesInfo extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    // TODO: undo the lines

    this.state = {
      driversExist: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
       <ScrollView>
       <Text style = {styles.title2}>
       Type of Category: Hotel
       </Text>

       <Text style = {styles.que1}>What do you want to add</Text>

       <Text  style = {styles.que1}>Add (menu)</Text>
       <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Item"
          />
          <AddButton style = {{marginLeft:240,marginTop:10}}/>


      <Text  style = {styles.que1}>Add (services)</Text>

<InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Item"
          />
          <AddButton style = {{marginLeft:240,marginTop:10}}/>

<Text  style = {styles.que1}>Add (products)</Text>
<InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Item"
          />
          <AddButton style = {{marginLeft:240,marginTop:10}}/>

          <Text style={styles.bus_thumb}>Add Service Photos (Max 12)

</Text>

<View
  style={{
    flexDirection: "row",
    marginLeft: 22,
    marginBottom: 60
  }}
>
  <Thumbnail style={{ marginTop: 8 }} />
  <Thumbnail style={{ marginTop: 8 }} />
  
</View>
          <BottomButtonFull
            navigation={this.props.navigation}
            goToPreview = {true}
            name="Finish"
           
          />
          </ScrollView>

          
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
)(AddBusinessScreen);
