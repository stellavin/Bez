import React, { Component } from "react";
import { ScrollView, Text, AsyncStorage, View } from "react-native";
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



const category_data = [
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
       search_term:"",
       category_data:[],
       businesses_id:[],
       limit:7,
       last_id:0,
       can_trigger_on_scroll: true,

    }

    console.warn(JSON.stringify(this.props.categories))

    
  }
  async getBusinessCatories(){
    //get the saved business categories .... saved at splash
    try{
    let categories = await AsyncStorage.getItem('CAT');
    if(categories){
      console.warn('the categories list is '+ categories);
      let cat_array = JSON.parse(categories).categories;
      console.warn('the array is --------'+ cat_array)
      let category_data = []
      for(let i = 0; i < cat_array.length; i ++){
           category_data.push({
             category:cat_array[i]
           })
      }
      this.setState({
        category_data:category_data
      })
    }


    }catch(error){

    }
  }
   
  componentWillMount(){
    
    this.fetchBusiness();
    this.getBusinessCatories()
  
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
  handleScroll = (e) => {
    if (this.state.can_trigger_on_scroll) {
      let paddingToBottom = 10;
      paddingToBottom += e.nativeEvent.layoutMeasurement.height;
      if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
        // make something...
        //console.warn("the array is ", this.state.services_array.length);
       // this.getServices();
       console.warn('has reached the end');
       this.fetchBusiness();
      }
    }
  }

  fetchBusiness(){
   this.setState({
     can_trigger_on_scroll:false
   })
    firebase_app.firestore().collection('customer-businesses').orderBy('id')
    .startAfter(this.state.last_id).limit(this.state.limit)
    .get()
    .then(snapshot => {
       snapshot
        .docs
        .forEach(doc => {
          console.log(doc._document.data.toString())
          const id = doc.id;
          console.warn('the name of the doc is '+ id);
          this.setState({
            businesses:[...this.state.businesses,doc.data()],
            businesses_id:[...this.state.businesses_id,id],
          })
        });
        let last_item = snapshot.docs[snapshot.docs.length - 1];
        console.warn('the last id is '+last_item.data().id)
        this.setState({
           last_id:last_item.data().id,
           can_trigger_on_scroll:true,
          showAlert: false})
        console.log('data-------', data)

    });
  }

  renderBusiness =() => {
    const businesses = this.state.businesses;

    if(businesses.length != 0){
      return businesses.map((business, index) => {
        
        return (
        <BusinessCard
            key={index}
           
            business_id= {this.state.businesses_id[index]}
            business_name={business.business_name}
            cover_photos_urls = {business.business_cover_photos}
            name= {business.business_name}
            rating={4.2}
            style={{marginBottom: 20}}
            source={business.business_thumbnail}
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
      <ScrollView 
         onScroll={this.handleScroll}
      >
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
        <Categories categories={this.state.category_data}
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
