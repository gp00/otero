
import React, { Component } from 'react';
import {
  StyleSheet, 
  Image, 
  View
} from 'react-native';

import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Api from './lib/Api';

import ListaNoticias from './components/ListaNoticias';
import Sensor from './components/Sensor';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Net:false,
      NumNoticias: 0,
      Noticias:[]
    };

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
            <Button transparent onPress={()=>alert('SEARCH...')} >
              <Icon name='search' style={styles.iconSearch} />
            </Button>
            <Button transparent onPress={()=>Api.getNoticias(this).then(data=>this.setState({Noticias:data,NumNoticias:data.length,Net:false}))} >
              <Icon name='refresh' style={styles.iconRefresh} />
            </Button>
            <Button transparent onPress={()=>alert('OFF...')}  >  
              <Icon name='power' style={styles.iconPowerOff} />
            </Button>
          </Right>
        </Header>

        <Content>         
          <ListaNoticias noticias={this.state.Noticias}/> 
        </Content>

        <Footer style={styles.footerContainer}>
          <Text style={styles.textFooter}>Nº de Noticias: {this.state.NumNoticias}</Text>
          <Sensor style={{width:75}} ledSize='12' fontSize='15' caption='Net'  fontColor={'white'} captionAlign ='center' on value={this.state.Net} />          
        </Footer>

      </Container>
    );
  }

  componentDidMount() {     
    Api.getNoticias(this).then(data=>this.setState({Noticias:data,NumNoticias:data.length,Net:false}));
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
