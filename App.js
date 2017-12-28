
import React, { Component } from 'react';
import {
  StyleSheet,
  View,  
  Dimensions
} from 'react-native';

import { Container,  Content, Footer, Button, Left, Right, Body, Icon, Text, Input, Item, Fab } from 'native-base';
import Modal from 'react-native-modalbox';
import DialogBox from 'react-native-dialogbox';

import Api from './lib/Api';

import ListaNoticias from './components/ListaNoticias';
import Cabecera from './components/Cabecera';
import Sensor from './components/Sensor';
import AltaNoticiaModal from './components/AltaNoticiaModal'

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
    this._onPressAddBoton= this._onPressAddBoton.bind(this);
    this._onPressDeleteNoticia= this._onPressDeleteNoticia.bind(this);
    this._onPressSaveNoticia= this._onPressSaveNoticia.bind(this);
    this._onCloseModal= this._onCloseModal.bind(this);
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
  _onPressAddBoton(){
    this.setState({modalAltaNoticiaOpen: true});
  }
  _onPressSaveNoticia(pNoticia){ 

    if(pNoticia.titulo==''){
      this.dialogbox.alert('Falta Titulo.');
    }else if (pNoticia.noticia==''){
      this.dialogbox.alert('Falta Noticia.');
    }else{
      Api.postNoticia(this, pNoticia).then(data=>{
        this.setState({Noticias:data,NumNoticias:data.length,Net:false,modalAltaNoticiaOpen: false});
        this.dialogbox.alert('Noticia Grabada.');
      });
    }
    
  }
  _onPressDeleteNoticia(pIdNoticia){    

    this.dialogbox.confirm({
			title: 'Borrar',
			content:'Borrar Noticia?',
			ok: {
				text: 'Si',
				callback: () => {
          Api.delNoticia(this, pIdNoticia).then(data=>{
            this.setState({Noticias:data,NumNoticias:data.length,Net:false,modalAltaNoticiaOpen: false});
            this.dialogbox.alert('Noticia Borrada.');
          });					
				},
			},
			cancel: {text: 'No'}
		});

  }
  _onCloseModal(){
    this.setState({modalAltaNoticiaOpen: false});
  }
 
  render() {  
    
    return (
      <Container  onLayout={this._onLayout}> 

        <Cabecera search={this.state.Search} 
                  onChangeText ={this._onChangeText}
                  onPress_Search={this._onPress_Search}
                  onPress_BackSearch={this._onPress_BackSearch}
                  onPress_Refresh={this._onPress_Refresh} 
                  onPress_Find={this._onPress_Find}
                  onPress_PowerOff={this._onPress_PowerOff}/>      

        <Content>   
          {this.state.modalAltaNoticiaOpen?
            <AltaNoticiaModal open={this.state.modalAltaNoticiaOpen} onClosed={this._onCloseModal} onPressSaveNoticia={this._onPressSaveNoticia}/>:
            <ListaNoticias noticias={this.state.Noticias} onPress_Titulo={this._onPress_Titulo} onPressDeleteNoticia={this._onPressDeleteNoticia}/>
          }
        </Content>              

        {!this.state.modalAltaNoticiaOpen &&
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={styles.fab}
            position="bottomRight"
            onPress={this._onPressAddBoton}>
            <Icon style={{ fontSize:35 }} name="add" />        
          </Fab>
        }        

        <Footer style={styles.footerContainer}>
          <Text style={styles.textFooter}>Nº de Noticias: {this.state.NumNoticias}</Text>
          <Sensor style={{width:75}} ledSize='12' fontSize='15' caption='Net' fontColor={'white'} captionAlign ='center' on value={this.state.Net} />          
        </Footer>

        <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/> 

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
    backgroundColor: 'rgba(14,89,164,0.92)',
    height:70,
    width:70,
    borderRadius:35,
    bottom:30,
    right:5
  }, 
});
