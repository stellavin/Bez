import React, { Component } from "react";
import { TouchableOpacity, Text, Button, View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import style from '../../Styles/MainStyles';
import HeaderWithoutLogo from "../../../Components/HeaderWitoutLogo";
import Icon from "react-native-vector-icons/FontAwesome5";

class EditPhotoScreen extends Component {
  render() {
    return (
    
      <View style={style.container}>
        <HeaderWithoutLogo
          type_of_nav={'arrow-left'}
          headerTitle = {'Photos'}
          navigation = {this.props.navigation}
        />

            <View style={{backgroundColor:"#f5f5f5", flex:1}}>
                <View style={{marginLeft: 20, marginTop: 20}}>
                  <Text style={styles.photosText}>Add Service Photos (Max 20)</Text>
                </View>



               {/* Image section */}
             <View style={{marginTop: 10, flexDirection: 'row',flexWrap:'wrap'}}>
                 {/* Image 1 */}
                 <View style={{width: 120, height: 120}} >
                    <ImageBackground source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} >
                        <View style={style.footerAlign}>
                        <TouchableOpacity
                        style={style.deleteIcon}
                        >
                            <Icon name = 'trash-alt' size = {20} color = '#fff' />
                        </TouchableOpacity>

                        </View>
                    
                    </ImageBackground>
                        
                 </View>

                 {/* End */}

                  {/* Image 1 */}
                  <View style={{width: 120, height: 120}} >
                    <ImageBackground source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} >
                        <View style={style.footerAlign}>
                        <TouchableOpacity
                        style={style.deleteIcon}
                        >
                            <Icon name = 'trash-alt' size = {20} color = '#fff' />
                        </TouchableOpacity>

                        </View>
                    
                    </ImageBackground>
                        
                 </View>

                 {/* End */}

                  {/* Image 1 */}
                  <View style={{width: 120, height: 120}} >
                    <ImageBackground source={{uri: 'http://placeimg.com/640/480/any'}} style={{width: 120, height: 120}} >
                        <View style={style.footerAlign}>
                        <TouchableOpacity
                        style={style.deleteIcon}
                        >
                            <Icon name = 'trash-alt' size = {20} color = '#fff' />
                        </TouchableOpacity>

                        </View>
                    
                    </ImageBackground>
                        
                 </View>

                 {/* End */}

                 <TouchableOpacity style={style.addPhoto} >
                     <View style={{marginTop: 20}}></View>
                    <Icon name = 'image' size = {40} color = '#b5b5b5' /> 
                    <Text style={style.addImageText}>+ Add Photo</Text> 
                 </TouchableOpacity>
                
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
