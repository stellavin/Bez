
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Styles/MainStyles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

import { StackNavigator } from 'react-navigation';

class SideMenu extends Component {
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
          {/* Logo section */}
            <View style={{flexDirection: 'row', marginLeft: 24, marginTop: 34}}>
            <TouchableOpacity 
            style={{marginRight: 22}}
            >
                  <Icon name = 'arrow-left' size = {17.5} color = '#000' />
            </TouchableOpacity>
            <Image
                style={styles.logo}
                source={require("../Images/logo.png")}
              />
            </View>

            {/* Rate section */}

            <View style={{ flex: 1,alignItems: 'center',width:'100%', marginRight: 20, marginTop: 30}}> 
                <View style={{width: '80%'}}> 
                <Button
                    onPress={() => this.props.navigation.navigate('AddBusinessScreen')}
                    title="Add Your Business"
                    color="#2eb62c"
                    style={{width: 100}}
                  />

                </View>
                </View>
   
            
          </View>
          {/* 1 */}
          <View style={{marginLeft: 25,marginTop: 37}}>

            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('FavoriteScreen')}
            style={{flexDirection: 'row'}}>
                <Icon name = 'bookmark' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>Your Favorites</Text>

            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => console.log('')}
              style={{flexDirection: 'row', marginTop: 26}}>
              <Icon name = 'star' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>Top places</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('MyBusinessScreen')}
            style={{flexDirection: 'row', marginTop: 26}}>
                <Icon name = 'book' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>My Business</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('AdvertScreen')}
            style={{flexDirection: 'row',  marginTop: 26}}>
                <Icon name = 'circle' size = {20.5} color = '#000' />
               <Text style={styles.sidebarText}>Advertise</Text>

            </TouchableOpacity>

            {/* google and facebook */}

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row',  marginTop: 45}}>
               <Image
                style={styles.logo}
                source={require("../Images/google.png")}
              />
            </TouchableOpacity>


            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row',  marginTop: 26}}>
               <Image
                style={styles.logo}
                source={require("../Images/facebook.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row', marginTop: 26}}>
               <Text style={styles.sidebarText2}>Contact Us for Ads</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row', marginTop: 26}}>
               <Text style={styles.sidebarText2}>Terms of service</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row', marginTop: 26}}>
               <Text style={styles.sidebarText2}>Help</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => console.log('')}
            style={{flexDirection: 'row', marginTop: 26}}>
               <Text style={styles.sidebarText2}>Send Feedback</Text>

            </TouchableOpacity>





            
                       
          </View>

        
         
        </ScrollView>
        
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;