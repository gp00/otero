
import React, { Component } from 'react';
import {
  StyleSheet, 
  Image, 
} from 'react-native';

import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text } from 'native-base';

import Noticia from './components/Noticia';

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
            <Button transparent onPress={()=>alert('SEARCH...')}  >
              <Icon name='search' style={styles.iconSearch} />
            </Button>
            <Button transparent onPress={()=>alert('OFF...')}  >  
              <Icon name='power' style={styles.iconPowerOff} />
            </Button>
          </Right>
        </Header>

        <Content>
          <Noticia fecha='2017/11/10' idNoticia='1' titulo='Actualizadas Precipitaciones 2017-Noviembre'/>
          <Noticia fecha='2016/07/22' idNoticia='2' titulo='Precipitaciones 2017-Octubre'/>
          <Noticia fecha='2015/09/23' idNoticia='3' titulo='Actualizadas Precipitaciones 2017-Septiembre'/>
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
  iconSearch:{
    fontSize: 28,
    color:'white',
  },
  footerContainer:{
    height:35,
    alignItems:'center',
  },
  textTitle:{
    fontSize:28,
    color:'rgba(255,255,255,1)',
  },
  textFooter:{
    fontSize:18,
    color:'white'
  }

});
