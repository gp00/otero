import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Dimensions,
} from 'react-native';

import {Button, Left, Right, Icon,  Input, Item, Form,Text, H2, Label,} from 'native-base';
import Modal from 'react-native-modalbox';

var screen = Dimensions.get('window');

export default class VerNoticiaModal extends Component {

  constructor(props) {
    super(props);
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
                      <H2 style={{color:'white'}}>Noticia</H2>
                    </View>
                    <Button transparent onPress={this.props.onClosed}><Icon style={styles.iconcloseModal} name='close'></Icon></Button>                     
                  </View>

                  <View style={styles.inputsContainer}>                   
              
                    <Form>   
                      <View style={styles.itemFormContainer}>
                        <Label style={styles.lbl}>Fecha:</Label>
                        <Item>
                          <Text>{this.props.fecha}</Text>
                        </Item>
                      </View>
                      <View style={styles.itemFormContainer}>
                        <Label style={styles.lbl}>Titulo:</Label>
                        <Item>
                          <Text>{this.props.titulo}</Text>
                        </Item>
                      </View>
                      <View style={styles.itemFormContainer}>
                        <Label style={styles.lbl}>Noticia: </Label>
                        <View style={[styles.webViewContainter]}>
                          <WebView startInLoadingState={true}
                                   scrollEnabled={true}
                                   style={{backgroundColor:'transparent'}}
                                   source={{html: this.props.noticia}}
                                   onLoadEnd={()=>{}}/>
                        </View>  
                      </View>  
                    </Form>
                   
                  </View>

                  <View style={styles.btnsContainer}>                  
                    <Button block primary style={styles.btnNoticia} onPress={this.props.onClosed}>
                      <Text>Salir</Text>
                    </Button>
                  </View>

              </Modal>   
            </View>
    );
  }

}

const styles = StyleSheet.create({ 
  modalContainer:{
    height: screen.height*0.805,
    margin:5,
  },
  modal: {    
    padding:20,
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
    marginRight: screen.width*0.25,
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
  itemFormContainer:{
    marginTop:10
  },
  lbl:{
    color:'white'
  },
  webViewContainter:{
    height:270,
    width: screen.width * 0.9,
  }
});
