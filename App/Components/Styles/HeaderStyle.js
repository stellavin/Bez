import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000',
    marginBottom:14,
    borderBottomWidth:3,
    borderColor:'#000'
  },
  logo:{
    width: 88, 
    height: 32,
    alignSelf:"flex-start",
    marginLeft:22 ,
    marginTop:3
 
 },
 search_input:{
   marginTop:27,
   marginLeft:21,
   marginRight:21
 },
 row:{
   flexDirection:'row',
   alignItems:'center',
   marginTop:21,
   marginLeft:21,
 },
 text: {
  fontFamily: "Helvetica",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 19,
  letterSpacing: 0,
  textAlign: "left",
  color: "#303030",
  marginLeft: 20
 },
 headerColor: {
   backgroundColor:'#FAFAFA',
   height: 65

 }
})
