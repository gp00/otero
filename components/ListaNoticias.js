
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight 
} from 'react-native';

import {Button,Icon} from 'native-base';

import Noticia from './Noticia';

export default class ListaNoticias extends Component {

  constructor(props) {
    super(props);    
  }

  render() {
    
    var Noticias = this.props.noticias;

    var noticias = Noticias.map((noticia, i) => {
      return (<Noticia key={i} fecha={noticia.Fecha} idNoticia={noticia.idNoticia} titulo={noticia.Titulo} onPress_Titulo={this.props.onPress_Titulo} onPressDeleteNoticia={this.props.onPressDeleteNoticia}/>)
    })

    return (<View style={styles.containerNoticias}>{noticias}</View>);
  }
}

const styles = StyleSheet.create({
  containerNoticias:{
     backgroundColor:'white'
  },
});
