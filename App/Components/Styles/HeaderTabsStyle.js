import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    elevation:0
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:21,
    marginLeft:21,
  },
  title:{
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#303030",
    marginLeft:22.5
  },
  inactive_tab_text:{
    fontFamily: "Helvetica",
  fontSize: 14,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: "#b5b5b5"
  
  },
  active_tab_text:{
    fontFamily: "Helvetica",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#2eb62c"
  },
  activeTabStyle:{
    backgroundColor:'#fff',
    elevation:0
  }
})
