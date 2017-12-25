import React, { Component } from 'react';
import {
  StyleSheet, 
  View
} from 'react-native';

import {Header, Button, Left, Right, Icon, Text, Input, Item } from 'native-base';

export default class HeaderSearch extends Component {

    constructor(props) {
      super(props);
  
      this.state = {       
      };  
    } 
    
    render() {

      inputBuscarNoticias=null;

      return (
        <Header searchBar rounded>
          <Item>
            <Button transparent onPress={this.props.onPress_BackSearch}>
              <Icon name="arrow-round-back"/>
            </Button>
            <Input onChangeText={(text)=>this.props.onChangeText(text)} placeholder="Buscar Noticias" ref='BuscarNoticias'/>
            <Button transparent onPress={this.props.onPress_Find}>
              <Icon name="search" />
            </Button>
           
          </Item>
        </Header>
      );
    } 
    
    componentDidMount() {
      this.refs.BuscarNoticias._root.focus()
    }

  }  
  
  const styles = StyleSheet.create({
  });
  