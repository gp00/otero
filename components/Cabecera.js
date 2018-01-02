import React, { Component } from 'react';
import {
  StyleSheet, 
  Image,  
  View
} from 'react-native';

import HeaderSearch from "./HeaderSearch"
import HeaderTitle from "./HeaderTitle"

export default class Cabecera extends Component {

    constructor(props) {
      super(props);
  
      this.state = {       
      };  
    } 
  
    render() {
      var header= this.props.search?<HeaderSearch {...this.props}/>:<HeaderTitle {...this.props}/>;  
      return (header);
    }    
  }
  
  const styles = StyleSheet.create({
    logoImage: {
      width: 40,
      height: 40
    },
    logoTitle: {
      alignItems: 'flex-start'
    },
    iconPowerOff: {
      fontSize: 26,
      color:'white',
    },
    iconRefresh:{
      fontSize: 28,
      color:'white',
    },
    iconSearch:{
      fontSize: 28,
      color:'white',
    },
    footerContainer:{
      height:35,
      alignItems:'center',
      justifyContent:'space-around'
    },
    textTitle:{ 
      fontSize:26,
      color:'rgba(255,255,255,0.8)',
    },
    textFooter:{
      fontSize:18,
      color:'white', 
    }
  
  });
  