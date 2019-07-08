import React, { Component } from "react";
import { ScrollView, Text, Button, View , AsyncStorage} from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import Header from "../../../Components/Header";
import style from '../../Styles/MainStyles';
import BusinessCardCustomer from "../../../Components/BussinessCard-Customer";
import Icon from "react-native-vector-icons/FontAwesome5";
import firebase_app from "../../../Firebase";
import * as firebase from 'firebase';

class MyBusinessScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state ={
       selected:"",
       businesses:[],
       showAlert: true,
       search_term:"",
       category_data:[],
       businesses_id:[],
       limit:4,
       last_id:0,
       can_trigger_on_scroll: true,
       user_id:""

    }

    console.warn(JSON.stringify(this.props.categories))

    
  }
  componentWillMount() {
      this.getUser()
  }

  async getUser(){
    try{
    let fuid =  await AsyncStorage.getItem('FUID');
    let name =  await AsyncStorage.getItem('NAME');
    console.log('user id---', fuid)
    if(fuid != ""){
      this.setState({
        user_name:name,
        user_id:fuid
      })
      this.fetchItems(fuid)
    }
    }catch(error){
  
    }
  }

  fetchItems(user_id){
    firebase_app
      .firestore()
      .collection("customer-businesses")
      .where("user_uid", "==", user_id)
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
          console.log('my biz-------', data)
      });
    
  }

  checkIfUserIsLoggedIn = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         console.warn('user logged', user)
         this.props.navigation.navigate('AddBusinessScreen', {currentUser: user});
       }else{
         this.props.navigation.navigate('LoginScreen');
       }
    });
 
   }

  renderBusiness =() => {
    const businesses = this.state.businesses;

    if(businesses.length != 0){
      return businesses.map((business, index) => {
        
        return (
        <BusinessCardCustomer
            key={index}
           
            business_id= {business.business_uuid}
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

  render() {
    return (
    
      <ScrollView style={style.container}>
        <Header
          show_search={false}
          type_of_nav={'bars'}
          navigation = {this.props.navigation}
          placeholder="Search for a business/service..."
        />
        <View style={{marginLeft: 22, marginRight: 22, marginTop: 20}}>
        <Button
            onPress={() => this.checkIfUserIsLoggedIn()}
            title="Add your Business"
            color="#2eb62c"
            />

        </View>

    
        <Text style={styles.favoriteText}>My Businesses</Text>

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
