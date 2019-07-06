import React, { Component } from "react";
import { ScrollView, Text, AsyncStorage, View } from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import Header from "../../../Components/Header";
import BusinessCard from "../../../Components/BusinessCard";
import style from '../../Styles/MainStyles';
import firebase_app from "../../../Firebase";


class FavoriteScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      favorites_array:[],
      user_id:'',
      businesses_id:[]
    }
  }
  componentWillMount(){
  
   this.getUser();
  }
  async getUser(){
    try{
    let fuid =  await AsyncStorage.getItem('FUID');
    if(fuid){
      console.warn(">>>>>>>>>>>the fuid ssss"+fuid)
      firebase_app
      .firestore()
      .collection("favorite")
      .where("user_id", "==",fuid)
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          console.warn("the data is "+JSON.stringify(doc.data()))
          this.setState({
            favorites_array:[...this.state.favorites_array,doc.data()],
            businesses_id:[...this.state.businesses_id,id]
          })
        });
    });
    }
    }catch(error){
  
    }
  }
  fetchFavorites(){
    console.warn('the fuid is '+ fuid)
    
}
renderBusiness =() => {
  const favorites_array = this.state.favorites_array;

  if(favorites_array.length != 0){
    return favorites_array.map((business, index) => {
      
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

       
      {this.renderBusiness()}
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
