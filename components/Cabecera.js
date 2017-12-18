import React, { Component } from 'react';
import {
  StyleSheet, 
  Image, 
  View
} from 'react-native';

import { Header, Title, Content,  Button, Left, Right, Body, Icon, Text, Input, Item } from 'native-base';

export default class Cabecera extends Component {

    constructor(props) {
      super(props);
  
      this.state = {       
      };  
    } 
    
    headerSearch = <Header searchBar rounded><Item><Button transparent onPress={this.props.onPress_BackSearch}><Icon name="arrow-round-back"/></Button><Input onChangeText={(text)=>this.props.onChangeText(text)} placeholder="Buscar Noticias"/><Button transparent onPress={this.props.onPress_Find}><Icon name="search" /></Button></Item></Header>

    headerTitle = 
        <Header>
            <Left>
                <Image style={styles.logoImage} source={require('../resources/OterodelasDueñas.png')} />
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

  
    render() {
      var header= this.props.search?this.headerSearch:this.headerTitle;  
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
  