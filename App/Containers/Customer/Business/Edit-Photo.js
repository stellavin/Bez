import React, { Component } from "react";
import { ScrollView, Text, Button, View, Image } from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import style from '../../Styles/MainStyles';
import BusinessCardCustomer from "../../../Components/BussinessCard-Customer";
import HeaderWithoutLogo from "../../../Components/HeaderWitoutLogo";




class EditPhotoScreen extends Component {
  render() {
    return (
    
      <View style={style.container}>
        <HeaderWithoutLogo
          type_of_nav={'arrow-left'}
          headerTitle = {'Photos'}
        />

            <View style={{backgroundColor:"#f5f5f5"}}>
                <View style={{marginLeft: 20, marginTop: 20}}>
                  <Text style={styles.photosText}>Add Service Photos (Max 20)</Text>
                </View>



               {/* Image section */}
             <View style={{marginTop: 10, flexDirection: 'row',flexWrap:'wrap'}}>
                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />
                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />
                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />

                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />

                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />

                 <Image source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} />

            </View>

            
           

            </View>
            <View style={style.footer}>
                <Button
                    onPress={() => console.log('test')}
                    title="Finish"
                    color="#2eb62c"
                />

            </View>

            

       
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
)(EditPhotoScreen);
