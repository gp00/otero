

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ImageInfo extends Component {
  constructor(props){
    super(props)

  }

  render() {

    var now = new Date().toISOString().slice(0, 10) + '   ' +  new Date().toTimeString().split(" ")[0];  

    return (
      <View style={[styles.container,{height:this.props.height || 25}]}>
        <View style={styles.bateriaContainer}>
          <Text style={styles.texto}>Bateria:{this.props.bateria || 0}%</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={[styles.texto,{textAlign:'center'}]}>Captura:{ this.props.captura || 0} seg.</Text>
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
