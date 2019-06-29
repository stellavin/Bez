import React, { Component } from "react";
import { ScrollView, Text, Button, View } from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/HomeScreenStyle";
import firebase from 'firebase'
import Header from "../Components/Header";

class FacebookLoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state ={
        user: null
    }
    
  }
  componentDidMount(){
    
  }
  login = () => {
    
  }

  logout = () => {
    
  }

  render() {
    const { user } = this.state
    return (
      <ScrollView style={styles.container}>
        <Header
          show_search={true}
          type_of_nav={'bars'}
          navigation = {this.props.navigation}
          placeholder="Search for a business/service..."
        />

        <View style={{marginTop: 15}}></View>
        <View style={{marginLeft: 22, marginRight: 22, marginTop: 20}}>
        <Text>{user ? `Hi, ${user.displayName}!` : 'Hi!'}</Text>
        <Button
            onPress={() => this.login()}
            title="Facebook Login"
            color="#2eb62c"
            />

        </View>
        
      
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
)(FacebookLoginScreen);
