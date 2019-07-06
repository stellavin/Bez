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
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from "react-native-vector-icons/FontAwesome5";



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
       businesses:[],
       showAlert: true,
       search_term:""

    }

    console.warn(JSON.stringify(this.props.categories))

    
  }
   
  componentWillMount(){
    this.fetchBusiness()
  
  }
  getBusinessByCategory(category){
    this.setState({showAlert: true})
    this.setState({businesses: []})
    firebase_app
      .firestore()
      .collection("customer-businesses")
      .where("business_category", "==", category)
    .get()
    .then(snapshot => {
      var data = [];
      snapshot
        .docs
        .forEach(doc => {
          console.log(doc._document.data.toString())
          data.push(doc.data());
        });
        
        this.setState({
          showAlert:false,
          businesses: data
        })
        console.log('data-------', data)
    });
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
        this.setState({businesses: data, showAlert: false})
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
            style={{marginBottom: 20}}
            source={business.business_thumbnail}
            // source={require("../Images/sample1.png")}
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

  searchValue(value){
    this.setState({showAlert: true})
    this.setState({businesses: []})
    firebase_app
      .firestore()
      .collection("customer-businesses")
      .where("business_name", "==", value)
    .get()
    .then(snapshot => {
      var data = [];
      snapshot
        .docs
        .forEach(doc => {
          console.log(doc._document.data.toString())
          data.push(doc.data());
        });
        
        this.setState({
          showAlert:false,
          businesses: data
        })
        console.log('data-------', data)
    });
  }

  render() {
    const {businesses} = this.state;
    console.log('length---',this.state.businesses.length, businesses)
    return (
      <View style={styles.container}>
      <ScrollView >
        <Header
          show_search={true}
          type_of_nav={'bars'}
          navigation = {this.props.navigation}
          placeholder="Search for a business/service..."
          onSearch = {()=>{
           console.warn("the selected value is "+ this.state.search_term);
           this.searchValue(this.state.search_term)
          }}
          onChangeText = {(text)=>{
             this.setState({search_term:text})
          }}
        />

        <View style={{marginTop: 15}}></View>

        <View style={styles.line}></View>
        <Categories categories={dummy_category_data}
          onCategoryChange = {(selected)=>{
            console.warn("The selected category is "+ selected)
            this.getBusinessByCategory(selected);
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
          {/* <Icon size = {40} name = 'frown'/>
          <Text>So Empty</Text> */}
        </View>}

        
      </ScrollView>
      <AwesomeAlert
          show={this.state.showAlert}
          showProgress={true}
          message="Loading Businesses..."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          
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
)(HomeScreen);
