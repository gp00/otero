

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ImageInfo extends Component {
  constructor(props){
    super(props)

    var now = new Date().toISOString().slice(0, 10) + '   ' +  new Date().toTimeString().split(" ")[0];

    this.state={
      height: this.props.height || 25,
      bateria: this.props.bateria || 0,
      fecha: this.props.fecha || now,
      captura: this.props.captura || 0
    }

  }

  render() {

    return (
      <View style={[styles.container,{height:this.state.height}]}>
        <View style={styles.bateriaContainer}>
          <Text style={styles.texto}>Bateria:{this.state.bateria}%</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={[styles.texto,{textAlign:'center'}]}>Captura:{this.state.captura} seg.</Text>
        </View>
        <View style={styles.fechaContainer}>
          <Text style={styles.texto}>{this.state.fecha}</Text>
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
    flex:1,
    justifyContent:'center',
    alignItems: 'flex-start',   
  },
  fechaContainer:{
    flex:1.7, 
    justifyContent:'center', 
    alignItems: 'flex-end',
  },
  progressContainer:{
    flex:1.3,
    justifyContent:'center',    
  }
});
