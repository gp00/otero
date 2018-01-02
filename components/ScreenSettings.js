
import React, { Component } from 'react';
import {
  StyleSheet,
  View,  
} from 'react-native';

import { Container,  Content, Footer, Button, Left, Right, Body, Icon, Text, Input, Item, Fab } from 'native-base';

import HeaderTitle from "./HeaderTitle"


export default class ScreenSettings extends Component {

  constructor(props) {
    super(props);

    this.state = {
     
    };
   
    this._onPress_SideMenu=this._onPress_SideMenu.bind(this);
   
  } 

   
  _onPress_SideMenu(pVisible){
    this.props.onPress_SideMenu(pVisible);   
  }  
  _onLayout(event){
    const {width,height}=event.nativeEvent.layout;
    const orientation =(width>height)?'APAISADO':'NORMAL';   
    //console.log('Orientacion: ' + orientation + ', width: ' + width + ', height: ' + height);
  }
 
  render() {  
    return (

        <Container  onLayout={this._onLayout}> 

          <HeaderTitle title='SETTINGS' onPress_SideMenu= {this._onPress_SideMenu} onPress_PowerOff={this.props.onPress_PowerOff}/>  

          <Content>   

          </Content>     

        </Container>

    );
  }

  componentDidMount() {     
  }

}

const styles = StyleSheet.create({
});
