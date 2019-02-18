import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Form,
  Item,
  Input,
  Label
} from "native-base";

import MapView  from 'react-native-maps';

import { Location, Permissions } from 'expo';

export default class App extends React.Component {

  state = {
    location: null,
    errorMessage: null,
    loading: true,
  };


  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }


  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    let report;
    if(this.state.location==null){
      report = (<Text>กดปุ่มเพื่อขอ Location</Text>);
    }else{
      let location = this.state.location;
      
      report = (
      
       <View style={{height:500}}>
        <Text>{location.coords.latitude}</Text>
        <Text>{location.coords.longitude}</Text>
        <MapView style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.05,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: location.coords.latitude,
            longitude: location.coords.longitude}}
            title={"title"}
            description={"description"}
         />
        </MapView>
        </View>
        );
    }
    return (

      <Container>
        <Header>
          <Body>
            <Title>Nextflow GPS</Title>
          </Body>
        </Header>

        <Content style={styles.content}>

          <Button block onPress={() => { this.getPosition() }}>
            <Text>
              Get GPS
            </Text>
          </Button>
          {report}
        </Content>
        
      </Container>
     

    );
  }

  async getPosition() {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if(status.status==='granted'){
      let location = await Location.getCurrentPositionAsync();
      console.log(location);
      this.setState({
        location:location
      })
    }
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    height: 150
  },
  map:{
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    flex: 1,
  }
})