
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {Button, Left, Right, Icon, Text, Input, Item, Form, H2, Label} from 'native-base';
import Modal from 'react-native-modalbox';
import DatePicker from 'react-native-datepicker'

export default class DateP extends Component {

  constructor(props) {
    super(props);
  }  

  render() {  
    
    return (     

      <DatePicker
        style={{ width: 150 }}
        date={this.props.fecha}
        mode="date"
        placeholder="fecha publicación"
        format="YYYY-MM-DD"
        minDate="2017-12-01"
        confirmBtnText="Aceptar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.props.onChangeFecha(date)}}
      />
    );
  }
}

const styles = StyleSheet.create({ 
 
});
