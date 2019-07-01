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
import firebase from "react-native-firebase";
import firebase_app from "../Firebase";

const dummy_category_data = [
  { category: "Restaurants" },
  { category: "Garage" },
  { category: "Boutique" },
  { category: "Salon" },
  { category: "Supermarket" }
];

class HomeScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state ={
       selected:"",
       businesses:[]

    }

    console.warn(JSON.stringify(this.props.categories))

    
  }
   
  componentDidMount(){
    this.fetchBusiness()
  
  }

  fetchBusiness(){
    firebase_app.firestore().collection('customer-businesses')
    .get()
    .then(snapshot => {
      var data = [];
      snapshot
        .docs
        .forEach(doc => {
          console.log(doc._document.data.toString())
          data.push(doc.data());
        });
        this.setState({businesses: data})
        console.log('data-------', data)
    });
  }

  renderBusiness =() => {
    const businesses = this.state.businesses;

    if(businesses.length != 0){
      return businesses.map((business, index) => {
        console.log("business---------", business );
        return (
        <BusinessCard
            key={index}
            name= {business.business_name}
            rating={4.2}
            // source={this.business.business_thumbnail}
            source={require("../Images/sample1.png")}
            navigate={this.props.navigation}
          />
        );

      });

    }else {
      return (
          <Text>No Items</Text>
      )

      
    }

  }



  render() {
    const {businesses} = this.state;
    console.log('length---',this.state.businesses.length, businesses)
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



       {this.state.businesses.length != 0?(
         <View>
            {this.renderBusiness()}

         </View>

        ):
        <View>
          <Text>Loading data ....</Text>
        </View>}

        
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
