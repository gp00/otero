
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight 
} from 'react-native';

import {Button,Icon} from 'native-base';

const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export default class Noticia extends Component {

  constructor(props) {
    super(props);    

  }

  render() {

    var diames = new Date(this.props.fecha).getDate() +'-' + monthNames[new Date(this.props.fecha).getMonth()];
    var año =  new Date(this.props.fecha).getFullYear();
    
    return (
      <View style={styles.containerNoticia}>      
        <View style={styles.containerFecha}>
          <Text style={styles.diames}>{diames}</Text>
          <Text style={styles.año}>{año}</Text>
        </View>
        <View style={styles.containerTitulo}>
          <Button transparent onPress={()=>this.props.onPress_Titulo(this.props.idNoticia)}><Text style={styles.titulo}>{this.props.titulo}</Text></Button>
        </View>        
      </View>    
    );
  }
}

const styles = StyleSheet.create({
  containerNoticia:{
    height:50,
    backgroundColor:'rgba(125,125,125,0.75)',
    flexDirection:'row',
    padding:2,
    justifyContent:'center',
    alignItems:'center',
    marginTop:1,
    marginLeft:2,
    marginRight:2 
  },
  containerFecha:{
    flex:1,
    flexDirection:'column'
  },
  containerTitulo:{
    flex:7,
    paddingLeft:5,
  }, 
  diames:{
    fontSize:12,
    textAlign:'center',
    color:'rgb(255,255,0)'
  },
  año:{
    fontSize:10,
    textAlign:'center',
    color:'rgba(255,255,0,0.95)'
  },
  titulo:{
    fontSize:13,
    color:'white'
  }
});
