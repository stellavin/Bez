import React, { Component } from "react";
import { ScrollView, Text, View, Picker } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/AddBusinessScreenStyle";
import InputComponent from "../Components/InputComponent";
import Thumbnail from "../Components/Thumbnail";
import BottomButtonFull from "../Components/BottomButtonFull";
import AddButton from "../Components/AddButton";
import firebase from "react-native-firebase";
import HeaderTabs from "../Components/HeaderTabs";


class AddBusinessScreen extends React.Component {

  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = { 
      item:"yes-------",
      

     };
     this.toggle = this.toggle.bind(this);

  }

componentWillMount(){
  this.toggle();

}


toggle = () => {
  console.log('current user----', this.state.item)
}


  render() {

    
    return (
      <View style={styles.container}>
        <HeaderTabs
          title="Add Business"
          sub_title1="Business Info"
          sub_title2="Services"
          navigation = {this.props.navigation}
          tab1={<BusinessInfo navigation={this.props.navigation} />}
          tab2={<ServicesInfo navigation={this.props.navigation} />}
        />
      </View>
    );
  }
}

class BusinessInfo extends React.Component<Props, State> {
  constructor(props) {
    super(props); 
    this.state = {
      driversExist: false,
      picker_items: [
        {
          id: 'item',
          name: 'item'
        },
        {
          id: 'item 1',
          name: 'item 1'
        }
      ],
      picker_items2: [
        {
          id: 'item 3',
          name: 'item 3'
        },
        {
          id: 'item 6',
          name: 'item 6'
        }
      ],
      type:"",
      category: "",
      business_name: "",
      phone_number:""
    };
  }

  handleChange =(itemValue, itemIndex) => {
    this.setState({ type: itemValue });
  }

  handleChangeCateory  =(itemValue, itemIndex) => {
    this.setState({ category: itemValue });
    
  }

  handleChangeBizName  =(value) => {
    this.setState({ business_name: value });
    console.log('text----', value)
  }

  handleChangePhoneNo  =(value) => {
    this.setState({ phone_number: value });
    console.log('text----', value)
  }
  
  
  render() {
    const {picker_items, picker_items2} = this.state;
    console.log('picker_items----', picker_items)
    return (
      <View style={styles.container}>
        <ScrollView>
          <InputComponent
            style={{ marginTop: 23, marginRight: 22, marginLeft: 22 }}
            placeholder="Business Name"
            onChangeText ={this.handleChangeBizName}
          />
       
          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            is_picker={true}
            items={picker_items}
            itemValue={this.state.type}
            handleChange ={this.handleChange}
            placeholder="Select Type of Business"
          />

          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            is_picker={true}
            items={picker_items2}
            itemValue={this.state.category}
            handleChange ={this.handleChangeCateory}
            placeholder="Select Business Category"
          />

          <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Phone Number"
            onChangeText = {this.handleChangePhoneNo}
            inputType = {'numeric'}
          />

          <Text style={styles.radio_title}>Take Order/Calls</Text>

          <Text style={styles.business_location}>Business Location</Text>

          <Text style={styles.tip1}>
            It's Recommended to be at the location of the business!
          </Text>
          
          <Text style={{ fontWeight: "bold", marginLeft: 22, marginTop: 22 }}>
            TO INCLUDE MAP
          </Text>
          <Text style={styles.bus_thumb}>Business Thumbnail</Text>

          <Thumbnail style={{ marginLeft: 22, marginTop: 8 }} />

          <Text style={styles.bus_thumb}>Business cover photos (3 only)</Text>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 22,
              marginBottom: 60
            }}
          >
            <Thumbnail style={{ marginTop: 8 }} />
            <Thumbnail style={{ marginLeft: 14, marginTop: 8 }} />
            <Thumbnail style={{ marginLeft: 14, marginTop: 8 }} />
          </View>

          <BottomButtonFull
            navigation={this.props.navigation}
            goToPreview = {false}
            name="Continue"
           
          />
        </ScrollView>
      </View>
    );
  }
}

class ServicesInfo extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    // TODO: undo the lines

    this.state = {
      driversExist: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
       <ScrollView>
       <Text style = {styles.title2}>
       Type of Category: Hotel
       </Text>

       <Text style = {styles.que1}>What do you want to add</Text>

       <Text  style = {styles.que1}>Add (menu)</Text>
       <InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Item"
          />
          <AddButton style = {{marginLeft:240,marginTop:10}}/>


      <Text  style = {styles.que1}>Add (services)</Text>

<InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Item"
          />
          <AddButton style = {{marginLeft:240,marginTop:10}}/>

<Text  style = {styles.que1}>Add (products)</Text>
<InputComponent
            style={{ marginTop: 15, marginRight: 22, marginLeft: 22 }}
            placeholder="Item"
          />
          <AddButton style = {{marginLeft:240,marginTop:10}}/>

          <Text style={styles.bus_thumb}>Add Service Photos (Max 12)

</Text>

<View
  style={{
    flexDirection: "row",
    marginLeft: 22,
    marginBottom: 60
  }}
>
  <Thumbnail style={{ marginTop: 8 }} />
  <Thumbnail style={{ marginTop: 8 }} />
  
</View>
          <BottomButtonFull
            navigation={this.props.navigation}
            goToPreview = {true}
            name="Finish"
           
          />
          </ScrollView>

          
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBusinessScreen);
