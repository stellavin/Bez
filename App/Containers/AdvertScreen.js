import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  CheckBox,
  TextInput
} from "react-native";
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

class AdvertScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderTabs
          title="Ad Details"
          sub_title1="Ad Details"
          sub_title2="Payment"
          navigation = {this.props.navigation}
          tab1={<AddDetails navigation={this.props.navigation} />}
          tab2={<Payment navigation={this.props.navigation} />}
        />
      </View>
    );
  }
}
class AddDetails extends React.Component<Props, State> {
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

          <Text style={styles.title}>Ad Type</Text>

          <View style={{ flexDirection: "row" }}>
            <InputComponent
              style={{
                marginTop: 23,
                width: 150,
                marginLeft: 22
              }}
              placeholder="Preferred Time"
              is_picker={true}
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
            />
          </View>

          <InputComponent
            style={{ marginTop: 29, marginLeft: 22, marginRight: 22 }}
            placeholder="Ad-Redirect link"
          />

          <InputComponent
            style={{ marginTop: 29, marginLeft: 22, marginRight: 22 }}
            placeholder="Name of Business -Redirect"
            is_picker={true}
          />

          <TextInput
            style={styles.ItemInput}
            underlineColorAndroid="transparent"
            placeholder="Add Caption"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={false}
          />

          {/* <Thumbnail style={{ marginLeft: 14, marginTop: 8 }} /> */}
          <View style = {[styles.ItemInput,{justifyContent:"center",alignItems:'center', marginBottom:10}]}>
          <Icon name = "image" size = {24.5} color = '#b5b5b5'/>
          </View>
          <BottomButtonFull name="Continue" />
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

          <InputComponent
            style={{ marginTop: 15, marginLeft: 22, marginRight: 22 }}
            placeholder="Enter Code"
          />

          <BottomButtonFull name="Publish" />
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
