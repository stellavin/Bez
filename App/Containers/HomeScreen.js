import React, { Component } from "react";
import { ScrollView, Text, KeyboardAvoidingView, View } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/HomeScreenStyle";
import Header from "../Components/Header";
import FullButton from "../Components/FullButton";
import Categories from "../Components/Categories";
import BusinessCard from "../Components/BusinessCard";

const dummy_category_data = [
  { category: "Restaurants" },
  { category: "Garage" },
  { category: "Boutique" },
  { category: "Salon" },
  { category: "Supermarket" }
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state ={
       selected:"",

    }
    console.warn(JSON.stringify(this.props.categories))
   
  }
  componentDidMount(){
    
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Header
          show_search={true}
          type_of_nav={'bars'}
          navigation = {this.props.navigation}
          placeholder="Search for a business/service..."
        />

        <View style={{marginTop: 15}}></View>

        <View style={styles.line}></View>
        <Categories categories={dummy_category_data}
          onCategoryChange = {(selected)=>{
            console.warn("The selected category is "+ selected)
          }}
         />
        <View style={styles.row1}>
          <Text style={styles.title}>Near You</Text>

          <View style={styles.distance}>
            <Text style={styles.distance_text}>1 Km</Text>
          </View>
        </View>

        <BusinessCard
          name="Champion Garage"
          rating={4.2}
          source={require("../Images/sample1.png")}
          navigate={this.props.navigation}
        />

        <BusinessCard
          style = {{marginTop:21}}
          name="Happy Eateries"
          rating={4.2}
          source={require("../Images/sample2.png")}
          navigate={this.props.navigation}
        />
        <BusinessCard
          style = {{marginTop:21}}
          name="Happy Eateries"
          rating={4.2}
          source={require("../Images/sample2.png")}
          navigate={this.props.navigation}
        />
        <BusinessCard
           style = {{marginTop:21}}
          name="Champion Garage"
          rating={4.2}
          source={require("../Images/sample1.png")}
          navigate={this.props.navigation}
        />
        <BusinessCard
           style = {{marginTop:21}}
          name="Nick's Garage"
          rating={4.2}
          source={require("../Images/sample1.png")}
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
)(HomeScreen);
