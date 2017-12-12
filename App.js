
import React, { Component } from 'react';
import {
  StyleSheet, 
  Image, 
  View
} from 'react-native';

import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text } from 'native-base';
import axios from 'axios';

import ListaNoticias from './components/ListaNoticias';
import Sensor from './components/Sensor';

const noticiasAPI ='http://www.xn--oterodelasdueas-brb.es/App_Ashx/Noticia/LoadNoticiasAndroid.ashx'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Net:false,
      NumNoticias: 0,
      Noticias:[]
    };

    this.getNoticias = this.getNoticias.bind(this);
  }

  async getNoticias(){

    this.setState({
      Noticias:[],
      NumNoticias:0,
      Net:true
    });

    var noticias= await axios.get(noticiasAPI);
    return noticias.data;
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
            <Button transparent onPress={()=>this.getNoticias().then(data=>this.setState({Noticias:data,NumNoticias:data.length,Net:false}))} >
              <Icon name='search' style={styles.iconSearch} />
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
    //this.getNoticias().then(data=> this.setState({Noticias:data,NumNoticias:data.length,Net:false}));
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
    justifyContent:'space-around'
  },
  textTitle:{
    fontSize:28,
    color:'rgba(255,255,255,1)',
  },
  textFooter:{
    fontSize:18,
    color:'white', 
  }

});
