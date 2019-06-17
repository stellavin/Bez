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
import styles from "./Styles/MyAdvertsScreenStyle";
import PaymentAmount from "../Components/PaymentAmount";
import AdvertCard from "../Components/AdvertCard";

class MyAdvertsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderTabs
          title="My Adverts"
          sub_title1="Active"
          sub_title2="History"
          navigation={this.props.navigation}
          tab1={<Active navigation={this.props.navigation} />}
          tab2={<History navigation={this.props.navigation} />}
        />
      </View>
    );
  }
}
class Active extends React.Component<Props, State> {
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
          <Text style={styles.title}>My Adverts</Text>

         <AdvertCard
         style = {{marginLeft:22, marginRight:22,marginTop:19}}
           source={require("../Images/wide_image.png")}
         />
          <AdvertCard
         style = {{marginLeft:22, marginRight:22,marginTop:10}}
           source={require("../Images/wide_image.png")}
         />
          <AdvertCard
         style = {{marginLeft:22, marginRight:22,marginTop:10}}
           source={require("../Images/wide_image.png")}
         />

        </ScrollView>
      </View>
    );
  }
}

class History extends React.Component<Props, State> {
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
          <Text style={styles.title}>My History</Text>

         <AdvertCard
         history = {true}
         style = {{marginLeft:22, marginRight:22,marginTop:19}}
           source={require("../Images/wide_image.png")}
         />
          <AdvertCard
          history = {true}
         style = {{marginLeft:22, marginRight:22,marginTop:10}}
           source={require("../Images/wide_image.png")}
         />
          <AdvertCard
          history = {true}
         style = {{marginLeft:22, marginRight:22,marginTop:10}}
           source={require("../Images/wide_image.png")}
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
)(MyAdvertsScreen);
