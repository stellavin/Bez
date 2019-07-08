import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  Picker,
  AsyncStorage,
  PermissionsAndroid,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
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
import MapView, {Marker} from "react-native-maps";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import AwesomeAlert from "react-native-awesome-alerts";
import RNFetchBlob from "react-native-fetch-blob";
import uuid from "react-native-uuid";

// var uuid = require('react-native-uuid');

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

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class BusinessInfo extends React.Component {
  state = {
    driversExist: false,
    picker_items2: [
      {
        id: "Menu",
        name: "Menu"
      },
      {
        id: "Services",
        name: "Services"
      },
      {
        id: "Products",
        name: "Products"
      }
    ],
    categories_obj: [],
    type: "",
    category: "",
    business_name: "",
    phone_number: "",
    latitude: "",
    longitude: "",
    error: "",
    latitudeDelta: "",
    longitudeDelta: "",

    showAlert: false,
    showSuccess: false,
    showDanger: false,
    last_id: 0,

    business_uuid: "",
    images: [],
    imageUrls: [],
    thumbnail_uri: "",
    thumbnail: [],
    thumbnail_src: "",
    successMessage: "",
    lastLat:-1.288882480710017,
    lastLong:36.822870410978794,
  };
 

  componentWillMount() {
    this.getBusinessCatories();
    this.getbusinessesCount();
  }

  getbusinessesCount() {
    let self = this;
    firebase_app
      .firestore()
      .collection("customer-businesses")
      .get()
      .then(function(querySnapshot) {
        console.warn("the item count is " + querySnapshot.size);
        self.setState({
          last_id: querySnapshot.size
        });
      });
  }

  async getBusinessCatories() {
    //get the saved business categories .... saved at splash from firestore
    try {
      let categories = await AsyncStorage.getItem("CAT");
      if (categories) {
        console.warn("the categories list is " + categories);
        let cat_array = JSON.parse(categories).categories;
        console.warn("the array is --------" + cat_array);
        let category_data = [];
        for (let i = 0; i < cat_array.length; i++) {
          category_data.push({
            id: cat_array[i],
            name: cat_array[i]
          });
        }
        this.setState({
          categories_obj: category_data
        });
      }
    } catch (error) {}
  }

  CreateBusiness = (imageUrls, thumbnail_uri) => {
    const business_uuid = uuid.v4();
    this.setState({ business_uuid: business_uuid });

    console.log("business_uuid-----", business_uuid);

    // save to firebase

    firebase_app
      .firestore()
      .collection("customer-businesses")
      .doc(business_uuid)
      .set({
        user_uid: this.props.currentUser.uid,
        id: this.state.last_id + 1,
        business_name: this.state.business_name,
        business_uuid: business_uuid,
        business_type: this.state.category,
        business_category: this.state.type,
        phone_number: this.state.phone_number,
        location: this.props.pos,
        business_thumbnail: thumbnail_uri[0],
        business_cover_photos: imageUrls
      })
      .then(doc => {
        // fetch the doc again and show its data
        console.log("Business----data---", doc); // prints {id: "the unique id"}
        this.setState({ showAlert: false });
        this.setState({
          showSuccess: true,
          successMessage:
            "Congratulations you have successfully added your business"
        });
      });
  };

  GotoServices() {
    this.props.navigation.navigate("AddServicesScreen", {
      user_uid: this.props.currentUser.uid,
      business_uuid: this.state.business_uuid
    });
  }

  showSuccess = () => {
    this.setState({
      showSuccess: false
    });
    this.GotoServices();
  };

  renderCustomSuccessAlert = () => {
    <View>
      <Icon
        style={{ fontSize: 80, color: "green", alignSelf: "center" }}
        name="check"
      />
      <Text>{this.state.successMessage}</Text>
    </View>;
  };

  handleChange = (itemValue, itemIndex) => {
    this.setState({ type: itemValue });
  };

  handleChangeCateory = (itemValue, itemIndex) => {
    this.setState({ category: itemValue });
  };

  handleChangeBizName = value => {
    this.setState({ business_name: value });
    console.log("text----", value);
  };

  handleChangePhoneNo = value => {
    this.setState({ phone_number: value });
    console.log("text----", value);
  };
  // new image

  pickItem() {
    ImagePicker.showImagePicker(options, response => {
      console.log("options------", options);
      console.log("response------", response);
      if (response.uri != undefined) {
        const source = response.uri;
        const timestamp = Date.now();
        console.log("uri----", source);
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            {
              name: source,
              time: timestamp
            }
          ]
        }));

        console.log("images----", this.state.images);
      } else {
        console.log("error");
      }
    });
  }

  uploadListImageMeal = () => {
    this.setState({ showAlert: true });
    const userID = this.props.currentUser.uid;

    const urls = this.state.images.map(image => {
      const uploadUri = image.name;
      const time = image.time;
      const mime = "application/octet-stream";
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      // let uploadBlob = null
      const currentTime = Date.now();
      const imageRef = firebase
        .storage()
        .ref(`images/${userID}/items/${time}`)
        .child(`${currentTime}.png`);
      return fs
        .readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          // uploadBlob = blob
          return imageRef.put(blob._ref, blob, { contentType: mime });
        })
        .then(() => {
          // uploadBlob.close()
          return imageRef.getDownloadURL();
        })
        .then(url => {
          return url;
        })
        .catch(error => {
          return host;
        });
    });
    return Promise.all(urls).then(imageUrls => {
      console.log("urls---------", imageUrls);
      this.setState({ imageUrls: imageUrls });
      this.uploadListImageMeal2(imageUrls);
    });
  };

  pickItem2() {
    ImagePicker.showImagePicker(options, response => {
      console.log("options------", options);
      console.log("response------", response);
      if (response.uri != undefined) {
        const source = response.uri;
        const timestamp = Date.now();
        console.log("uri----", source);
        this.setState(prevState => ({
          thumbnail: [
            ...prevState.thumbnail,
            {
              name: source,
              time: timestamp
            }
          ],
          thumbnail_src: source
        }));

        console.log("images----", this.state.thumbnail);
      } else {
        console.log("error");
      }
    });
  }

  uploadListImageMeal2 = imageUrls => {
    const userID = this.props.currentUser.uid;

    const urls = this.state.thumbnail.map(image => {
      const uploadUri = image.name;
      const time = image.time;
      const mime = "application/octet-stream";
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      // let uploadBlob = null
      const currentTime = Date.now();
      const imageRef = firebase
        .storage()
        .ref(`images/${userID}/items/${time}`)
        .child(`${currentTime}.png`);
      return fs
        .readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          // uploadBlob = blob
          return imageRef.put(blob._ref, blob, { contentType: mime });
        })
        .then(() => {
          // uploadBlob.close()
          return imageRef.getDownloadURL();
        })
        .then(url => {
          return url;
        })
        .catch(error => {
          return host;
        });
    });
    return Promise.all(urls).then(thumbnail_uri => {
      console.log("urls---------", thumbnail_uri);
      this.setState({ thumbnail_uri: thumbnail_uri });
      this.CreateBusiness(imageUrls, thumbnail_uri);
    });
  };

  render() {
    const {
      picker_items,
      picker_items2,
      thumbnail_src,
      biz_cover_photo_1_src,
      biz_cover_photo_2_src,
      biz_cover_photo_3_src
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <InputComponent
            style={{ marginTop: 23, marginRight: 22, marginLeft: 22 }}
            placeholder="Business Name"
            onChangeText={this.handleChangeBizName}
          />

          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            is_picker={true}
            items={this.state.categories_obj}
            itemValue={this.state.type}
            handleChange={this.handleChange}
            placeholder="Select Type of Business"
          />

          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            is_picker={true}
            items={picker_items2}
            itemValue={this.state.category}
            handleChange={this.handleChangeCateory}
            placeholder="Select Business Category"
          />

          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Phone Number"
            onChangeText={this.handleChangePhoneNo}
            inputType={"numeric"}
          />

          <Text style={styles.radio_title}>Take Order/Calls</Text>

          <Text style={styles.business_location}>Business Location</Text>

          <Text style={styles.tip1}>
            It's Recommended to be at the location of the business!
          </Text>
          {this.props.pos.length != undefined || this.props.pos.length > 0 ? (
            <MapView
              zoomEnabled={false}
              scrollEnabled={false}
              style={{ width: 400, height: 200 }}
              initialRegion={{
                // initial region set to Bileto
                latitude: -1.288882480710017, //this.props.pos[0],
                longitude: 36.822870410978794, // this.props.pos[1],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <Marker
                draggable
                title={"Long Press on the marker to set the location"}
                coordinate={{
                  latitude: this.state.lastLat,
                  longitude: this.state.lastLong,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121
                }}
                onDragEnd={e => {
                  console.warn(
                    "the coordinates is long:" +
                      e.nativeEvent.coordinate.longitude +
                      " \nlat:" +
                      e.nativeEvent.coordinate.latitude
                  );
                  //this.getRegion(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)
                }}
              />
            </MapView>
          ) : null}

          <Text style={styles.bus_thumb}>Business Thumbnail</Text>

          {thumbnail_src != "" ? (
            <Image
              source={{ uri: thumbnail_src }}
              style={{ width: 73, height: 69, marginLeft: 22, marginTop: 8 }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.pickItem2();
              }}
              style={{
                width: 73,
                height: 69,
                borderRadius: 3,
                marginLeft: 22,
                backgroundColor: "#ffffff",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#b5b5b5",
                alignItems: "center",
                marginTop: 8
              }}
            >
              <Image
                style={{ marginTop: 20 }}
                source={require("../Images/image_icon.png")}
              />
            </TouchableOpacity>
          )}

          <Text style={styles.bus_thumb}>Business cover photos (3 only)</Text>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 22,
              marginBottom: 60,
              flexWrap: "wrap"
            }}
          >
            {this.state.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.name }}
                style={{
                  width: 73,
                  height: 69,
                  borderRadius: 3,
                  marginRight: 10,
                  marginTop: 8
                }}
              />
            ))}

            <TouchableOpacity
              onPress={() => {
                this.pickItem();
              }}
              style={{
                width: 73,
                height: 69,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#b5b5b5",
                alignItems: "center",
                marginTop: 8
              }}
            >
              <Image
                style={{ marginTop: 20 }}
                source={require("../Images/image_icon.png")}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.uploadListImageMeal()}
          style={{
            width: screenWidth,
            bottom: 0,
            backgroundColor: "#2eb62c",
            alignItems: "center",
            height: 50
          }}
        >
          <View>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Roboto",
                fontSize: 16,
                fontWeight: "500",
                fontStyle: "normal",
                lineHeight: 19,
                letterSpacing: 0,
                marginTop: 15
              }}
            >
              Continue
            </Text>
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

        {/* <View> 
        <Button
            onPress={() => this.uploadListImageMeal()}
            title="Continue"
            
            color="#2eb62c"
        />
        </View> */}

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
            this.setState({
              showDanger: false,
              showAlert: false,
              showSuccess: false
            });
          }}
          onConfirmPressed={() => {
            this.setState({
              showDanger: false,
              showAlert: false,
              showSuccess: false
            });
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
