import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex:1
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
   title:{
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
    marginLeft:22,
    marginTop:31
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
   ItemInput:{
     height: 102,
     marginRight:22,
     marginLeft:22,
   backgroundColor: "#ffffff",
   backgroundColor: "#ffffff",
   borderStyle: "solid",
   borderWidth: 1,
   borderColor: "#b5b5b5",
   marginTop:29
   }
})
