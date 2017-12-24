
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import { Container,  Content, Footer, Button, Left, Right, Body, Icon, Text, Input, Item, Fab } from 'native-base';
import Modal from 'react-native-modalbox';

import Api from './lib/Api';

import ListaNoticias from './components/ListaNoticias';
import Cabecera from './components/Cabecera';
import Sensor from './components/Sensor';

var screen = Dimensions.get('window');

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Net: false,
      NumNoticias: 0,
      Noticias: [],
      Search: false,
      TextSearch: '',
      modalAltaNoticiaOpen: false
    };

    this._onPress_Search=this._onPress_Search.bind(this);
    this._onPress_BackSearch=this._onPress_BackSearch.bind(this);
    this._onPress_Refresh=this._onPress_Refresh.bind(this);
    this._onPress_Find=this._onPress_Find.bind(this);
    this._onPress_PowerOff=this._onPress_PowerOff.bind(this);
    this._onChangeText=this._onChangeText.bind(this);
    this._onPress_Titulo=this._onPress_Titulo.bind(this);
    this._onPressAddNoticia= this._onPressAddNoticia.bind(this);
  }  

  _onPress_BackSearch(){
    this.setState({Search:false});
  }
  _onChangeText(pText){
    this.setState({TextSearch:pText});
  }
  _onPress_Search(){
    this.setState({TextSearch:'',Search:true});
  }
  _onPress_Refresh(){
    Api.getNoticias(this).then(data=>this.setState({Noticias:data,NumNoticias:data.length,Net:false,modalAltaNoticiaOpen: false}));
  }
  _onPress_Find(){    
    this.setState({Search:false});
    var search = this.state.TextSearch;
    if(search!=''){
      var noticias = this.state.Noticias.filter(noticia=> noticia.Titulo.indexOf(search)!=-1);   
      this.setState({Noticias:noticias,NumNoticias:noticias.length});
    }    
  }
  _onPress_Titulo(pIdNoticia){
    alert(pIdNoticia);
  }
  _onPress_PowerOff(){
    alert('Exit...');
  }
  _onPressAddNoticia(){
    this.setState({modalAltaNoticiaOpen: true})
  }

  render() {  
    
    return (
      <Container> 

        <Cabecera search={this.state.Search} 
                  onChangeText ={this._onChangeText}
                  onPress_Search={this._onPress_Search}
                  onPress_BackSearch={this._onPress_BackSearch}
                  onPress_Refresh={this._onPress_Refresh} 
                  onPress_Find={this._onPress_Find}
                  onPress_PowerOff={this._onPress_PowerOff} />      

        <Content>   
          { this.state.modalAltaNoticiaOpen?           
            <View style={styles.modalContainer}>            
              <Modal  isOpen={this.state.modalAltaNoticiaOpen}
                      onOpened={()=>{}}
                      onClosed={()=>{this.setState({modalAltaNoticiaOpen: false})}}
                      style={[styles.modal]}>

                  <Button style={styles.btnCloseModal} transparent onPress={() => this.setState({modalAltaNoticiaOpen: false})}><Icon style={styles.iconcloseModal} name='close'></Icon></Button>
                  <Text >Ventana Modal</Text>
                  <Button block primary style={styles.btnSaveNoticia}>
                    <Text>Grabar Noticia</Text>
                  </Button>

              </Modal>   
            </View>:
            <ListaNoticias noticias={this.state.Noticias} onPress_Titulo={this._onPress_Titulo}/>
          }
        </Content>              

        {!this.state.modalAltaNoticiaOpen &&
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={styles.fab}
            position="bottomRight"
            onPress={this._onPressAddNoticia}>
            <Icon style={{ fontSize:35 }} name="add" />        
          </Fab>
        }        

        <Footer style={styles.footerContainer}>
          <Text style={styles.textFooter}>Nº de Noticias: {this.state.NumNoticias}</Text>
          <Sensor style={{width:75}} ledSize='12' fontSize='15' caption='Net' fontColor={'white'} captionAlign ='center' on value={this.state.Net} />          
        </Footer>

      </Container>
    );
  }

  componentDidMount() {     
    Api.getNoticias(this).then(data=>this.setState({Noticias:data,NumNoticias:data.length,Net:false}));
  }

}

const styles = StyleSheet.create({
  footerContainer:{
    height:35,
    alignItems:'center',
    justifyContent:'space-around'
  }, 
  textFooter:{
    fontSize:18,
    color:'white', 
  },
  fab:{
    backgroundColor: 'rgb(14,89,164)',
    height:70,
    width:70,
    borderRadius:35,
    bottom:30,
    right:5
  },
  modalContainer:{
    height:screen.height*0.805,
    margin:5,
  },
  modal: {    
    padding:20,
    justifyContent:'center',
    backgroundColor: 'rgba(103,182,243,0.92)',    
  },
  btnCloseModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  iconcloseModal:{
    fontSize:35,
    color:'black'
  },
  btnSaveNoticia: {
    position: "absolute",
    bottom: 10,
    right:0,
    left:0,
    margin:5,
    },
});
