import React, { Component } from 'react';
import {
  StyleSheet, 
  Image,  
  View
} from 'react-native';

import { Header, Title, Content,  Button, Left, Right, Body, Icon, Text, Input, Item } from 'native-base';

export default class HeaderTitle extends Component {

    constructor(props) {
      super(props);
  
      this.state = {       
      };  
    } 
      
    render() {
      
      return (
          <Header>
            <Left>              
              <Button transparent onPress={()=>this.props.onPress_SideMenu(true)}>
                <Icon name='ios-menu' style={styles.iconMenu}/>
              </Button>
            </Left>
            <Body style={styles.logoTitle}>
                <Title style={styles.textTitle}>NOTICIAS</Title>
            </Body>
            <Right>
                <Button transparent onPress={this.props.onPress_Search}>
                    <Icon name='search' style={styles.iconSearch} />
                </Button>
                <Button transparent onPress={this.props.onPress_Refresh}>
                    <Icon name='refresh' style={styles.iconRefresh} />
                </Button>
                <Button transparent onPress={this.props.onPress_PowerOff} >
                    <Icon name='power' style={styles.iconPowerOff} />
                </Button>
            </Right>
        </Header>
      );
    }    
  }
  
  const styles = StyleSheet.create({   
    logoTitle: {
      alignItems: 'flex-start'
    },
    iconMenu:{
      fontSize: 28,
      color:'white',
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
  