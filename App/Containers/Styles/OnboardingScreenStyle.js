import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title:{
    fontFamily: "ChunkFive-Roman",
    fontSize: 37,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#2f2e41"  ,
    marginTop:91
  },
  explanation:{
    fontFamily: "Roboto",
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: "#848484",
  width:196
  },
  slider_image:{
    marginTop:90, width: 237.2, height: 213.4 
  },
  logo:{
     width: 88.8, 
     height: 30.2,
     marginTop:-100,
     alignSelf:"flex-start",
     marginLeft:22 
  },
  arrow:{
    position:'absolute',
    marginTop:5,
    marginBottom:5
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a4d19c",
    flexDirection:'column',
    alignItems:'center',
    justifyContent:"center"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a4d19c"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a4d19c"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
})
