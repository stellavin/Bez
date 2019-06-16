import { StackNavigator ,DrawerNavigator } from 'react-navigation'
import AddBusinessScreen from '../Containers/AddBusinessScreen'
import HomeScreen from '../Containers/HomeScreen'
import OnboardingScreen from '../Containers/OnboardingScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'


const MyDrawerNavigator = DrawerNavigator ({
  Home: {
    screen: HomeScreen,
  },
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AddBusinessScreen: { screen: AddBusinessScreen },
  HomeScreen: { screen: HomeScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'AddBusinessScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})



export default PrimaryNav
