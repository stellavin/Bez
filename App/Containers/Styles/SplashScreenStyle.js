import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  splash_image:{
    width:180,
    height:32
  }
})
