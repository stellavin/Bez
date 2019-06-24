import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    marginLeft:21
  },
  image:{
    width: 109,
    height: 83,
    borderRadius: 3 
  },
  directions_text:{
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#2f2e41",
    marginLeft:10
  },
  rating_text:{
    fontFamily: "Roboto",
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: "#848484",
  marginLeft:8
  },
  title:{
    fontFamily: "Helvetica",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#303030"
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:6,
    width: 200,
  },
  column1:{
    marginLeft:8,

  },
  advertise_text:{
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffc765"
  },
  edit: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#2f2e41"
  },
  rateValue: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "#c1c1c1"
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
