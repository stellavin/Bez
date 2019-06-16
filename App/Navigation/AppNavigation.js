import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import OnboardingScreen from '../Containers/OnboardingScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import viewBusiness from '../Containers/Client/Business/view-business'
import RateScreen from '../Containers/Client/Business/rate'
import FavoriteScreen from '../Containers/Client/Business/favorite'
import myBusiness from '../Containers/Customer/Business/myBusiness';
import ViewBusiness from '../Containers/Customer/Business/ViewBusiness';
import EditPhoto from '../Containers/Customer/Business/Edit-Photo';
import BusinessUpdates from '../Containers/Customer/Business/Business-Updates';
import preview from '../Containers/Customer/Business/preview';


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  LaunchScreen: { screen: LaunchScreen },
  ViewBusiness: { screen: viewBusiness},
  RateScreen: {screen: RateScreen},
  FavoriteScreen: {screen: FavoriteScreen},
  MyBusinessScreen: {screen: myBusiness},
  ViewCustomerBusinessScreen:  {screen: ViewBusiness},
  EditPhotoScreen: {screen: EditPhoto},
  UpdateBusinessScreen: {screen: BusinessUpdates},
  PreviewScreen: {screen: preview}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PreviewScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
