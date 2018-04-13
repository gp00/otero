

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'native-base';

import * as Constantes from '../constantes';

export default class ImageInfo extends Component {
  constructor(props){
    super(props)

    this.state={  
                  iconActivity: Constantes.CONTADORSEGUNDOS,
                  captura:''
                }
  }  

  componentWillReceiveProps(nextProps){    

    var iconActivity = nextProps.iconActivity;

    var captura='';
    if (nextProps.captura > 0 && iconActivity == Constantes.CONTADORSEGUNDOS ){
      captura = nextProps.captura + ' min.';      
    } else if (iconActivity == Constantes.FILEUPLOAD){
      captura='Uploading';     
    }
    this.setState({captura});
  }

  render() {

    var now = new Date().toISOString().slice(0, 10) + '   ' +  new Date().toTimeString().split(" ")[0].substring(0,5);  

    return (
      <View style={[styles.container,{height:this.props.height || 25}]}>
        <View style={styles.bateriaContainer}>
          <Text style={styles.texto}>Bateria:{this.props.bateria || 0}%</Text>
        </View>
        <View style={styles.progressContainer}>
          <Icon style={styles.eyeIcon} name={this.props.iconActivity} /><Text style={[styles.texto,{textAlign:'center'}]}>{this.state.captura}</Text>
        </View>
        <View style={styles.fechaContainer}>
          <Text style={styles.texto}>{this.props.fecha || now}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {    
    flexDirection:'row',
    backgroundColor: 'rgba(255, 44, 44, 0.9)',
    padding:5,
  },
  texto:{
    color:'white',
    fontWeight: 'bold',
  },
  bateriaContainer:{
    flex:1.2,
    justifyContent:'center',
    alignItems: 'flex-start',   
  },
  fechaContainer:{
    flex:2, 
    justifyContent:'center', 
    alignItems: 'flex-end',
  },
  progressContainer:{
    flex:1,
    justifyContent:'space-around', 
    alignItems:'center',
    flexDirection:'row'   
  },
  eyeIcon:{
    fontSize:18,
    color:'white',
    marginRight:10
  }  
});
