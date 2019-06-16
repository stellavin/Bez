import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  // View Business
  container:{
    backgroundColor:'#FAFAFA',
    flex: 1
  },
  header1: {
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#303030"

  },
  distance: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#b5b5b5"
  },
  favorite: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070"
  },
  constct:{
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#303030"
  },
  menu:{
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#2eb62c",
    marginTop: 31
  },
  menuTitle:{
    fontFamily: "Helvetica",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
    color: "#303030"
  },
  menuDesscription:{
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070"
  },
  text:{
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070"
  },
  img:{
    width: 120,
    height: 108.3
  },
  contactText:{
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "italic",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070"
  },
  reviewText: {
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070",
    flexWrap: 'wrap'
  },
  textArea:{
    width: 315,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: "#000",
    elevation: 5,
    marginTop: 20


  },
  button:{
    width: 108,
    height: 33,
    borderRadius: 3,
    backgroundColor: "#2eb62c",
    marginTop: 20
  },
  rateText:{
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070",
    marginLeft: 72,
    marginRight: 72,
    marginTop: 30,
    marginBottom: 30
  },
  dialogueButton:{
    width: 108,
    height: 33,
    borderRadius: 3,
    backgroundColor: "#2eb62c",
    marginTop: 20,
  },
  line:{
    height: 0,
    opacity: 0.29,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#2eb62c",
    marginTop: 15
  },
  actionSection:{
    width: screenWidth,
    height: 49,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: "#000",
    elevation: 5,
    marginTop: 20,
    flexDirection:"row"

  },
  actionBox:{
    width: screenWidth/3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  },
  action: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070",
    
   
  },
  verticalLine: {
    width: 0,
    height: 48.5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e6e6e6"
  },
  photosText: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070",
    marginLeft: 20,
    marginTop: 20
  },
  footer: {
    position: 'absolute',
    height: 51,
    left: 0, 
    top: screenHeight - 40, 
    width: screenWidth,
 },
 deleteIcon: {
    position: 'absolute',
    bottom:10,
    right:10
    
 },
 footerAlign:{
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-end'

 },
 addPhoto:{
    borderRadius: 3,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    width: 120,
    height: 120,
    alignItems: 'center',
    
 },
 addImageText:{
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "#b5b5b5"
 }


 
})
