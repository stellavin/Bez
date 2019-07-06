import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex:1,
    elevation:0,
    backgroundColor:"#f5f5f5",
    
  },
  radio_title:{
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070",
    marginTop:15,
    marginLeft:22
  },
  business_location:{
    fontFamily: "Roboto",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 19,
  letterSpacing: 0,
  textAlign: "left",
  color: "#707070",
  marginLeft:22,
  marginTop:13
  },
  tip1:{
    fontFamily: "Roboto",
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "italic",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: "#b5b5b5"
  ,marginLeft:22
  },
  bus_thumb:{
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070",
    marginTop:22,
    marginLeft:22
  },
  title2:{
    fontFamily: "Roboto",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 19,
  letterSpacing: 0,
  textAlign: "left",
  color: "#b5b5b5",
  marginTop:19,
  marginLeft:22

  },
  que1:{
    fontFamily: "Roboto",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 19,
  letterSpacing: 0,
  textAlign: "left",
  color: "#707070",
  marginLeft:22,
  marginTop:8
  },
  footer: {
    position: 'absolute',
    height: 51,
    left: 0, 
    top: screenHeight - 40, 
    width: screenWidth,
 },
})
