/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, 
  Image, 
  View
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {NumNoticias: 0};
  }

  render() {
    
    return (
      <Container>      
 
       <Header>
          <Left>
            <Image style={styles.logoImage} source={require('./resources/OterodelasDueñas.png')} />
          </Left>
          <Body style={styles.logoTitle}>
            <Title style={styles.textTitle}>NOTICIAS</Title>
          </Body>
          <Right>
            <Button transparent onPress={()=>alert('OFF...')} >
              <Icon name='power' style={styles.iconPowerOff} />
            </Button>
          </Right>
        </Header>

        <Content>

        </Content>

        <Footer style={styles.footerContainer}>
          <Text style={styles.textFooter}>Nº de Noticias: {this.state.NumNoticias}</Text>
        </Footer>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logoImage: {
    width: 40,
    height: 40
  },
  logoTitle: {
    alignItems: 'flex-end'
  },
  iconPowerOff: {
    fontSize: 26,
    color:'white',
  },
  footerContainer:{
    height:35,
    alignItems:'center',
  },
  textTitle:{
    fontSize:26,
    color:'rgba(255,255,255,1)',
  },
  textFooter:{
    fontSize:18,
    color:'white'
  }

});
