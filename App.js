
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { Container,  Content, Footer, Button, Left, Right, Body, Icon, Text, Input, Item } from 'native-base';

import Api from './lib/Api';

import ListaNoticias from './components/ListaNoticias';
import Cabecera from './components/Cabecera';
import Sensor from './components/Sensor';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Net:false,
      NumNoticias: 0,
      Noticias:[],
      Search:false
    };

    this._onPress_Search=this._onPress_Search.bind(this);
    this._onPress_BackSearch=this._onPress_BackSearch.bind(this);
    this._onPress_Refresh=this._onPress_Refresh.bind(this);
    this._onPress_Find=this._onPress_Find.bind(this);
    this._onPress_PowerOff=this._onPress_PowerOff.bind(this);
  }  

  _onPress_BackSearch(){
    this.setState({Search:false});
  }
  _onPress_Search(){
    this.setState({Search:true});
  }
  _onPress_Refresh(){
    Api.getNoticias(this).then(data=>this.setState({Noticias:data,NumNoticias:data.length,Net:false}));
  }
  _onPress_Find(pFilter){
    this.setState({Search:false});
    alert(pFilter);
  }
  _onPress_PowerOff(){
    alert('Exit...');
  }

  render() {    

    return (
      <Container>  

        <Cabecera search={this.state.Search} 
          onPress_Search={this._onPress_Search}
          onPress_BackSearch={this._onPress_BackSearch}
          onPress_Refresh={this._onPress_Refresh} 
          onPress_Find={this._onPress_Find}
          onPress_PowerOff={this._onPress_PowerOff}/>

        <Content>         
          <ListaNoticias noticias={this.state.Noticias}/> 
        </Content>

        <Footer style={styles.footerContainer}>
          <Text style={styles.textFooter}>Nº de Noticias: {this.state.NumNoticias}</Text>
          <Sensor style={{width:75}} ledSize='12' fontSize='15' caption='Net' fontColor={'white'} captionAlign ='center' on value={this.state.Net} />          
        </Footer>

      </Container>
    );
  }

  componentDidMount() {     
    Api.getNoticias(this).then(data=>this.setState({Noticias:data,NumNoticias:data.length,Net:false}));
  }

}

const styles = StyleSheet.create({
  footerContainer:{
    height:35,
    alignItems:'center',
    justifyContent:'space-around'
  }, 
  textFooter:{
    fontSize:18,
    color:'white', 
  }
});
