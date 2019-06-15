import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import OnboardingScreen from '../Containers/OnboardingScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import viewBusiness from '../Containers/Client/Business/view-business'
import RateScreen from '../Containers/Client/Business/rate'
import FavoriteScreen from '../Containers/Client/Business/favorite'


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  LaunchScreen: { screen: LaunchScreen },
  ViewBusiness: { screen: viewBusiness},
  RateScreen: {screen: RateScreen},
  FavoriteScreen: {screen: FavoriteScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'FavoriteScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
