import React, { Component } from "react";
import { ScrollView, Text, KeyboardAvoidingView, View } from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import Header from "../../../Components/Header";
import BusinessCard from "../../../Components/BusinessCard";
import style from '../../Styles/MainStyles';


class FavoriteScreen extends Component {
  render() {
    return (
    
      <ScrollView style={style.container}>
        <Header
          show_search={true}
          type_of_nav={'bars'}
          navigation={this.props.navigation}
          placeholder="Search for a business/service..."
        />

        <View style={style.line}></View>


        <Text style={styles.favoriteText}>Your Favorites</Text>

       

        {/* <BusinessCard
          name="Champion Garage"
          rating={4.2}
          source={require("../../../Images/sample1.png")}
          navigate={this.props.navigation}
        />

        <BusinessCard
          style = {{marginTop:21}}
          name="Happy Eateries"
          rating={4.2}
          source={require("../../../Images/sample2.png")}
          navigate={this.props.navigation}
        /> */}
      </ScrollView>
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
)(FavoriteScreen);
