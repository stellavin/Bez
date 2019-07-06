import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./Styles/AdvertCardStyle";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class AdvertCard extends Component {
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

  render() {
    return (
      <View
        style={[{
          flexDirection: "column",
          borderRadius: 3,
          backgroundColor: "#ffffff",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "#e4e4e4"
        },this.props.style]}
      >
        <View
          style={{
            height: 44,
            backgroundColor: "#f5f5f5",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#e4e4e4",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row"
          }}
        >
          <Icon />
          <Text
            style={{
              fontFamily: "Helvetica",
              fontSize: 14,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#707070",
              marginLeft:15
            }}
          >
            Ad: FJG 6
          </Text>
        </View>

        <Image
          style={{
            width: 288,
            height: 96,
            borderRadius: 3,
            marginTop: 14,
            alignSelf: "center"
          }}
          source={this.props.source}
        />
        <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Helvetica",
              fontSize: 14,
              fontWeight: "300",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#2f2e41"
            }}
          >
            Running Time
          </Text>
          <Text
            style={{
              marginLeft: 87,
              ontFamily: "Helvetica",
              fontSize: 14,
              fontWeight: "300",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: this.props.history?"#707070": "#83d475"
            }}
          >
            KES 150
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Helvetica",
              fontSize: 14,
              fontWeight: "300",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#2f2e41"
            }}
          >
            Running Time
          </Text>
          <Text
            style={{
              marginLeft: 87,
              ontFamily: "Helvetica",
              fontSize: 14,
              fontWeight: "300",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: this.props.history?"#707070": "#83d475"
            }}
          >
           {this.props.preferred_time}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Helvetica",
              fontSize: 14,
              fontWeight: "300",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#2f2e41"
            }}
          >
            Days
          </Text>
          <Text
            style={{
              marginLeft: 140,
              ontFamily: "Helvetica",
              fontSize: 14,
              fontWeight: "300",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: this.props.history?"#707070": "#83d475"
            }}
          >
            {this.props.days_active} days
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 10,marginBottom:13 }}>
          <TouchableOpacity
            style={{
              width: 120,
              height: 28,
              borderRadius: 3,
              backgroundColor: "#2f2e41",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#fff" }}>Performance</Text>
          </TouchableOpacity>
         {this.props.history?
          <TouchableOpacity
            style={{
              width: 94,
              height: 30,
              borderRadius: 3,
              backgroundColor: "#83D475",
              marginLeft: 70,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#fff" }}>Republish</Text>
          </TouchableOpacity>:
          <TouchableOpacity
            style={{
              width: 94,
              height: 30,
              borderRadius: 3,
              backgroundColor: "#b5b5b5",
              marginLeft: 70,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#fff" }}>Pause</Text>
          </TouchableOpacity>
         }
          
        </View>
      </View>
    );
  }
}
