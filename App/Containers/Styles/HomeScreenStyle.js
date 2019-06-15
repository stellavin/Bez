import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import favorite from '../Client/Business/favorite';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex:1,
    flexDirection:'column',
    
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
  }
})

