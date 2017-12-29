
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import {Button, Left, Right, Icon, Text, Input, Item, Form, H2, Label} from 'native-base';
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modalbox';

import DateP from './DateP'

var screen = Dimensions.get('window');

export default class AltaNoticiaModal extends Component {

  constructor(props) {
    super(props);

    var date=new Date();   
    var now= date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate(); 

    this.state = {
      fecha: now,
      titulo:'',
      noticia:''
    };

    this._onChangeFecha= this._onChangeFecha.bind(this);
  }  

  _onChangeFecha(fecha){
    this.setState({fecha});
    this.titulo._root.focus();
  }

  render() {      
    return (          
            <View style={styles.modalContainer}>            
              <Modal  isOpen={this.props.open}
                      onOpened={this.props.onOpened}
                      onClosed={this.props.onClosed}
                      style={[styles.modal]}>

                  <View style={styles.headerContainer}>
                    <View style={styles.titulo}>
                      <H2 style={{color:'white'}}>Alta Noticia</H2>
                    </View>
                    <Button transparent onPress={this.props.onClosed}><Icon style={styles.iconcloseModal} name='close'></Icon></Button>
                  </View>

                  <View style={styles.inputsContainer}>
 
                    <Form>                      
                      <Item style={{borderBottomWidth:0}}>
                        <DateP fecha={this.state.fecha} onChangeFecha={this._onChangeFecha}/>                
                      </Item>

                      <Item floatingLabel>
                        <Label>Titulo</Label>
                        <Input onChangeText={(titulo) => this.setState({ titulo })}
                               onEndEditing={()=>{ this.noticia._root.focus();}}                            
                               value={this.state.titulo}
                               maxLength={50}
                               getRef={(input)=>{this.titulo = input}} />
                      </Item>

                      <Item floatingLabel>
                        <Label>Noticia</Label>
                        <Input onChangeText={(noticia) => this.setState({ noticia })}
                               onEndEditing={()=>{}} 
                               multiline={true} 
                               value={this.state.noticia}
                               maxLength={250}
                               getRef={(input)=>{this.noticia=input}} />
                      </Item>
                    </Form>
                   
                  </View>

                  <View style={styles.btnsContainer}>
                    <Button block primary style={styles.btnNoticia} onPress={()=>this.props.onPressSaveNoticia(this.state)}>
                      <Text>Grabar Noticia</Text>
                    </Button>
                    <Button block primary style={styles.btnNoticia} onPress={this.props.onClosed}>
                      <Text>Salir</Text>
                    </Button>
                  </View>

              </Modal>   
            </View>
    );
  }

  componentDidMount() {
   
  }

}

const styles = StyleSheet.create({ 
  modalContainer:{
    height: screen.height*0.805,
    margin:5,
  },
  modal: {    
    padding:20,
    //justifyContent:'center',
    backgroundColor: 'rgba(103,182,243,0.92)',    
  },  
  iconcloseModal:{
    fontSize:35,    
    color:'white'
  },
  headerContainer:{
    flexDirection:'row',
    position: "absolute",
    top: 10,
    right: 10,
  },
  titulo:{
    justifyContent:'center',
    marginRight: screen.width*0.15,
  }, 
  inputsContainer:{
    marginTop:50
  },
  btnsContainer:{
    position: "absolute",
    bottom: 10,
    right:0,
    left:0,
  },
  btnNoticia: {
    marginLeft:5,
    marginRight:5,
    marginTop:3
  },
});
