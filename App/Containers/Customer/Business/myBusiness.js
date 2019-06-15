import React, { Component } from "react";
import { ScrollView, Text, Button, View } from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import Header from "../../../Components/Header";
import BusinessCard from "../../../Components/BusinessCard";
import style from '../../Styles/MainStyles';
import console = require("console");




class MyBusinessScreen extends Component {
  render() {
    return (
    
      <ScrollView style={style.container}>
        <Header
          show_search={false}
          type_of_nav={'bars'}
          placeholder="Search for a business/service..."
        />
        <View style={{marginLeft: 22, marginRight: 22, marginTop: 20}}>
        <Button
            onPress={() => console.log('test')}
            title="Add your Business"
            color="#2eb62c"
            />

        </View>

       



        <Text style={styles.favoriteText}>My Businesses</Text>

       

        <BusinessCard
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
        />
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
)(MyBusinessScreen);