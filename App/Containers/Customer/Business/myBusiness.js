import React, { Component } from "react";
import { ScrollView, Text, Button, View } from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import Header from "../../../Components/Header";
import style from '../../Styles/MainStyles';
import BusinessCardCustomer from "../../../Components/BussinessCard-Customer";




class MyBusinessScreen extends Component {
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
            onPress={() => this.props.navigation.navigate('AddBusinessScreen')}
            title="Add your Business"
            color="#2eb62c"
            />

        </View>

       



        <Text style={styles.favoriteText}>My Businesses</Text>

       

        <BusinessCardCustomer
          name="Champion Garage"
          rating={4.2}
          source={require("../../../Images/sample1.png")}
          navigate={this.props.navigation}
        />

        <BusinessCardCustomer
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
