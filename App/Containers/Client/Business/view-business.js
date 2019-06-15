import React, { Component } from "react";
import { ScrollView, Text, KeyboardAvoidingView, View } from "react-native";
import { connect } from "react-redux";
import Header from "../../../Components/Header";

class ViewBusinessScreen extends Component {
  render() {
    return (
      <View>
        <Header
          show_search={false}
          type_of_nav = {'arrow-left'}
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
)(ViewBusinessScreen);
