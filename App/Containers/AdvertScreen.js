import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  CheckBox,
  Image,
  TextInput
} from "react-native";
import { Radio } from "native-base";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from "react-native-vector-icons/FontAwesome5";

// Styles
import HeaderTabs from "../Components/HeaderTabs";
import InputComponent from "../Components/InputComponent";
import Thumbnail from "../Components/Thumbnail";
import BottomButtonFull from "../Components/BottomButtonFull";
import AddButton from "../Components/AddButton";
// Styles
import styles from "./Styles/AdvertScreenStyle";
import PaymentAmount from "../Components/PaymentAmount";
import firebase_app from "../Firebase";

class AdvertScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_business_ad: false,
      is_generic_ad: false,
      preferred_time: "",
      ad_link: "",
      business_name: "Champion Garage LTD",
      banner_url: "https://example.com",
      caption: "",
      days_active: 0,
      ad_type: "",
      has_added_ad: false,
      activeTab: 0
    };
    this.params = this.props.navigation.state.params;
    try {
      if (Platform.OS !== "web") {
        window = null;
      }
    } catch (error) {
      console.warn(error);
    }
  }
  saveAd(data) {
    console.warn("The data is " + JSON.stringify(data));
    let self = this;
    firebase_app
      .firestore()
      .collection("adverts")
      .doc(new Date().toLocaleString())
      .set(data)
      .then(doc => {
        alert("Congratulations you have added your advert");
        this.setState({
          has_added_ad: true,
        })
      })
      .catch(function(error) {
        console.warn("Error getting document:", error);
      });
  }
  onAdLinkChange = text => {
    this.setState({
      ad_link: text
    });
  };
  onCaptionChange = text => {
    this.setState({
      caption: text
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderTabs
          title="Create Advert"
          sub_title1="Ad Details"
          sub_title2="Payment"
          activeTab={this.state.activeTab}
          navigation={this.props.navigation}
          tab1={this.renderAddDetails()}
          tab2={<Payment navigation={this.props.navigation} />}
        />

        <BottomButtonFull
          onPress={() => {
            if (!this.state.has_added_ad) {
              this.saveAd({
                ad_link: this.state.ad_link,
                ad_type: this.state.is_business_ad
                  ? "Business Ad"
                  : "Generic Ad",
                banner_url: this.state.banner_url,
                business_name: this.state.business_name,
                caption: this.state.caption,
                days_active: Number(this.state.days_active),
                preferred_time: this.state.preferred_time,
                fuid: this.params.fuid
              });
            } else {
              this.setState({
                activeTab: 1,
                is_business_ad: false,
                is_generic_ad: false,
                preferred_time: "",
                ad_link: "",
                business_name: "",
                banner_url: "",
                caption: "",
                days_active: 0,
                ad_type: "",
               
              });
            }
          }}
          style={{
            position: "absolute",
            width: "100%",
            bottom: 0
          }}
          name={this.state.has_added_ad ? "Proceed" : "Continue"}
        />
      </View>
    );
  }

  renderAddDetails() {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <ScrollView>
          <PaymentAmount amount={2300} />

          <Text style={styles.title}>Ad Type</Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginLeft: 25 }}
              onPress={() => {
                this.setState({
                  is_business_ad: true,
                  is_generic_ad: false
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Radio
                  selectedColor="#2f2e41"
                  selected={this.state.is_business_ad}
                  style={{ marginRight: 12 }}
                />
                <Text style={{ marginRight: 7 }}>Business Ad</Text>
                <Icon color={"#83d475"} size={12} name="exclamation-circle" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginLeft: 51 }}
              onPress={() => {
                this.setState({
                  is_business_ad: false,
                  is_generic_ad: true
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Radio
                  selectedColor="#2f2e41"
                  selected={this.state.is_generic_ad}
                  style={{ marginRight: 12 }}
                />
                <Text style={{ marginRight: 7 }}>Generic Ad</Text>
                <Icon color={"#83d475"} size={12} name="exclamation-circle" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <InputComponent
              style={{
                marginTop: 23,
                width: 150,
                marginLeft: 22
              }}
              placeholder="Preferred Time"
              is_picker={true}
              itemValue={this.state.preferred_time}
              handleChange={value => {
                this.setState({
                  preferred_time: value
                });
              }}
              items={[
                { name: "Morning", id: "Morning" },
                { name: "Evening", id: "Evening" },
                { name: "Whole Day", id: "Whole Day" }
              ]}
              width={150}
            />

            <InputComponent
              style={{
                marginTop: 23,
                width: 150,
                marginLeft: 15,
                marginRight: 22
              }}
              placeholder="Days eg 56"
              width={150}
              handleChange={value => {
                this.setState({
                  days_active: value
                });
              }}
            />
          </View>

          {this.state.is_generic_ad ? (
            <InputComponent
              style={{ marginTop: 29, marginLeft: 22, marginRight: 22 }}
              placeholder="Ad-Redirect link"
              handleChange={this.onAdLinkChange}
            />
          ) : null}

          <InputComponent
            style={{ marginTop: 29, marginLeft: 22, marginRight: 22 }}
            placeholder="Name of Business -Redirect"
            is_picker={true}
            itemValue={this.state.business_name}
            handleChange={value => {
              this.setState({
                business_name: value
              });
            }}
            items={[
              { name: "Business A", id: "Business A" },
              { name: "Business B", id: "Business B" }
            ]}
          />

          <TextInput
            style={styles.ItemInput}
            underlineColorAndroid="transparent"
            placeholder="Add Caption"
            placeholderTextColor="grey"
            numberOfLines={10}
            onChangeText={text => {
              this.setState({
                caption: text
              });
            }}
            multiline={true}
          />

          {/* <Thumbnail style={{ marginLeft: 14, marginTop: 8 }} /> */}
          {this.state.is_generic_ad ? (
            <View
              style={[
                styles.ItemInput,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 80
                }
              ]}
            >
              <Icon name="image" size={24.5} color="#b5b5b5" />
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

class Payment extends React.Component<Props, State> {
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
          <PaymentAmount amount={2300} />

          <Image
            style={{
              width: 57,
              height: 29,
              marginLeft: 23,
              marginTop: 41
            }}
            source={require("../Images/mpesa-logo.png")}
          />

          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 14,
              fontWeight: "normal",
              fontStyle: "normal",
              lineHeight: 19,
              letterSpacing: 0,
              textAlign: "left",
              color: "#707070",
              marginLeft: 23
            }}
          >
            1. Pay KES 7,214 {"\n"}
            2. Pay tp paybill 123 456{"\n"}
            3. Enter the mpesa code below to confirm eg: MJH
          </Text>
          <InputComponent
            style={{
              marginTop: 15,
              marginLeft: 22,
              marginRight: 22,
              marginBottom: 10
            }}
            placeholder="Enter Code"
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
)(AdvertScreen);
