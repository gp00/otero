
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {Button, Left, Right, Icon, Text, Input, Item, Form, H2, Label} from 'native-base';

import DatePicker from 'react-native-datepicker'

export default class DateH extends Component {

  constructor(props) {
    super(props);
  }  

  render() {  

    return (     

      <DatePicker
        style={{ width: 120, marginRight:15}}
        date={this.props.fecha}
        mode="time"
        placeholder={this.props.placeholder}
        format="HH:mm"     
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
        onDateChange={(hora) => {this.props.onChangeHora(hora)}}
      />
    );
  }
}

const styles = StyleSheet.create({ 
 
});
