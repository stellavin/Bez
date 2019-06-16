import React, { Component } from "react";
import { TouchableOpacity,Dimensions, Text, Button, View, TextInput, CheckBox } from "react-native";
import { connect } from "react-redux";
import styles from "../../Styles/HomeScreenStyle";
import style from '../../Styles/MainStyles';
import HeaderWithoutLogo from "../../../Components/HeaderWitoutLogo";
import Icon from "react-native-vector-icons/FontAwesome5";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class UpdateBusinessScreen extends Component {
  render() {
    return (
    
      <View style={style.container}>
        <HeaderWithoutLogo
          type_of_nav={'arrow-left'}
          headerTitle = {'Business Updates'}
        />

            <View style={{backgroundColor:"#f5f5f5", flex:1}}>
                <View style={{marginLeft: 20, marginTop: 20, marginRight: 20}}>

                
                    <TouchableOpacity style={style.addPhoto2} >
                        <View style={{marginTop: 20}}></View>
                        <Icon name = 'image' size = {40} color = '#b5b5b5' /> 
                        <Text style={style.addImageText}>+ Add Photo</Text> 
                    </TouchableOpacity>

                    <TextInput
                        style={style.textArea2}
                        underlineColorAndroid="transparent"
                        placeholder="Add Caption"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        />

                    <View style={style.updateLine}></View>
                    <View style={{marginTop: 20}}></View>

                    <Text style={style.catText}>Type of Category: Hotel</Text>
                    <View style={{marginTop: 20}}></View>

                    <Text style={style.txt}>What do you want to add</Text>
                    <View style={{marginTop: 20}}></View>

                    <View style={{flexDirection:'row', width: screenWidth}}>
                        <View style={{flexDirection:'row', width: screenWidth/3}}>
                            <CheckBox
                                value={false}
                                onValueChange={() => console.log('checked')}
                                />
                            <Text style={{marginTop: 5}}> Menu</Text>
                        </View>

                        <View style={{flexDirection:'row', width: screenWidth/3}}>
                            <CheckBox
                                value={false}
                                onValueChange={() => console.log('checked')}
                                />
                            <Text style={{marginTop: 5}}> Services</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <CheckBox
                                value={false}
                                onValueChange={() => console.log('checked')}
                                />
                            <Text style={{marginTop: 5}}> Products</Text>
                        </View>

                    </View>
                    <View style={{marginTop: 20}}></View>
                    <Text style={style.txt}>Add (Services)</Text>

                    <TextInput
                        style={style.ItemInput}
                        underlineColorAndroid="transparent"
                        placeholder="Add Item"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={false}
                        />

                    <View style={{ flex: 1,alignItems: 'flex-end'}}> 
                        <View style={style.button}> 
                            <Button
                                onPress={() => this.submitReview()}
                                title="+ Add"
                                color="#2f2e41"
                                style={{width: 100}}
                            />

                        </View>
                    </View>

                
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
)(UpdateBusinessScreen);
