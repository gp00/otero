
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight 
} from 'react-native';

import {Button,Icon} from 'native-base';
import Swipeable from 'react-native-swipeable';

const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export default class Noticia extends Component {

  constructor(props) {
    super(props);    

  }

  rightButtons = [
    <View style={styles.rightButtonsDelete}>
      <Button danger style={styles.rightButtonsDeleteButtom} onPress={()=>{this.swipeable.recenter()}}>
        <Icon name='trash' style={styles.rightButtonsDeleteIcon} />
      </Button>
    </View>
  ];
 
  render() {

    var diames = new Date(this.props.fecha).getDate() +'-' + monthNames[new Date(this.props.fecha).getMonth()];
    var año =  new Date(this.props.fecha).getFullYear();
    
    return (
      <Swipeable rightButtons={this.rightButtons} rightButtonWidth={50} onRef={ref => this.swipeable = ref}>
        <View style={styles.containerNoticia}>      
          <View style={styles.containerFecha}>
            <Text style={styles.diames}>{diames}</Text>
            <Text style={styles.año}>{año}</Text>
          </View>
          <View style={styles.containerTitulo}>
            <Button transparent onPress={()=>this.props.onPress_Titulo(this.props.idNoticia)}><Text style={styles.titulo}>{this.props.titulo}</Text></Button>
          </View>        
        </View>  
      </Swipeable>  
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
    marginLeft:1,
    marginRight:1
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
  },
  rightButtonsDelete:{
     height:52,
     justifyContent:'center',
     alignItems:'center',
  },
  rightButtonsDeleteButtom:{
    height:50
  },
  rightButtonsDeleteIcon: {
    fontSize: 30,color:'white'
  }
});
