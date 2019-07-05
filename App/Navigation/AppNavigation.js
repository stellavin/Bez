import { StackNavigator ,DrawerNavigator } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
import MyAdvertsScreen from '../Containers/MyAdvertsScreen'
import AdvertScreen from '../Containers/AdvertScreen'
import AddBusinessScreen from '../Containers/AddBusinessScreen'
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
import SideMenu from '../Containers/SideMenu';
import LoginScreen from '../Containers/Login';
import AddServicesScreen from '../Containers/services';
import BusinessInfo  from '../Containers/BusinessInfo';



const Drawer = DrawerNavigator ({
  HomeScreen: {screen: HomeScreen},
  AddBusinessScreen: { screen: AddBusinessScreen },
  FavoriteScreen: {screen: FavoriteScreen},
  MyBusinessScreen: {screen: myBusiness},
  AdvertScreen: { screen: AdvertScreen },
  MyAdvertsScreen: { screen: MyAdvertsScreen },
  AddServicesScreen: {screen: AddServicesScreen}


},
{
  contentComponent: SideMenu,
  drawerWidth: 300
}
);

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  HomeScreen: {screen: Drawer},
  AddBusinessScreen: { screen: Drawer },
  AddServicesScreen: {screen: Drawer},
  AdvertScreen: { screen: Drawer },
  MyAdvertsScreen: { screen: Drawer },
  AddBusinessScreen: { screen: AddBusinessScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  LaunchScreen: { screen: LaunchScreen },
  ViewBusiness: { screen: viewBusiness},
  RateScreen: {screen: RateScreen},
  FavoriteScreen: {screen: Drawer},
  MyBusinessScreen: {screen: Drawer},
  ViewCustomerBusinessScreen:  {screen: ViewBusiness},
  EditPhotoScreen: {screen: EditPhoto},
  UpdateBusinessScreen: {screen: BusinessUpdates},
  PreviewScreen: {screen: preview},
  LoginScreen: {screen: LoginScreen},
  BusinessInfo: {screen: BusinessInfo}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'AddServicesScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})



export default PrimaryNav
