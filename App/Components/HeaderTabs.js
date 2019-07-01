import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderTabsStyle'
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  Tab,
  Tabs,
} from "native-base";

export default class HeaderTabs extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style = {styles.row}>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate("DrawerOpen");
        }}>
        <Icon name = 'bars' size = {17.5} color = '#000' />
        </TouchableOpacity>

        <Text style = {styles.title}>
          {this.props.title}
        </Text>
        
      </View>
      <Tabs
          initialPage={0}
          locked={true}
          tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
        >
          <Tab
            heading="Popular"
            tabStyle={{ backgroundColor: "#fff" }}
            textStyle={styles.inactive_tab_text}
            activeTextStyle={styles.active_tab_text}
            heading= {this.props.sub_title1}
            activeTabStyle={styles.activeTabStyle}
          >
           {this.props.tab1}
          </Tab>

          <Tab
            heading="Popular"
            tabStyle={{ backgroundColor: "#fff" }}
            textStyle={styles.inactive_tab_text}
            activeTextStyle={styles.active_tab_text}
            heading= {this.props.sub_title2}
            activeTabStyle={styles.activeTabStyle}
          >
            {this.props.tab2}
          </Tab>
        </Tabs>
      </View>
    )
  }
}
