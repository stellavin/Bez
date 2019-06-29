import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import favorite from '../Client/Business/favorite';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:"#FAFAFA"
    
  },
  title:{
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
    marginBottom:14
  },
  row1:{
    marginLeft:21,
    marginTop:43,
    flexDirection:'row'
  },
  distance:{
    width: 51,
    height: 19,
    borderRadius: 3,
    backgroundColor: "#ffc765",
    justifyContent:'center',
    alignItems:'center',
    marginLeft:217
  },
  distance_text:{
    fontFamily: "Roboto",
  fontSize: 11,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 15,
  letterSpacing: 0,
  textAlign: "left",
  color: "#fafafa"  
  },

  // stl 

  favoriteText:{
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
    marginTop: 30,
    marginLeft: 22,
    marginBottom: 10
  },
  line:{
    width: screenWidth,
    height: 0,
    opacity: 0.29,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#2eb62c"
  },
  edit2: {
    fontFamily: "Roboto",
    fontSize: 9,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 11,
    letterSpacing: 0,
    textAlign: "left",
    color: "#83d475"
  }
})

