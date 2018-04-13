
import React, { Component } from 'react';
import {
  StyleSheet,
  View, 
  Linking, 
} from 'react-native';

import { Container, Content, Footer, Button, Left, Right, Body, Icon, Text, Input, Item, Fab, List, ListItem, Switch  } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import Slider from "react-native-slider";
import {Dropdown} from 'react-native-material-dropdown';
import store from 'react-native-simple-store';
import DialogBox from 'react-native-dialogbox';

import * as Constantes from '../constantes'
import * as fn from '../lib/FuncionesGenerales'

import HeaderTitle from "./HeaderTitle"
import DateH from './DateH'

const InfoItem =({label,info})=><View style={styles.InfoItemContainer}>
                                  <View style={styles.InfoItemLabelContainer}>
                                    <Text style={styles.InfoItemLabel}>{label}</Text>
                                  </View>
                                  <View style={styles.InfoItemTextContainer}>
                                    <Text style={styles.InfoItemText}>{info}</Text>
                                  </View>
                                </View>

const CamItem =({label,children,children2})=><View style={styles.InfoItemContainer}>
                                                <View style={styles.InfoItemLabelContainer}>
                                                  <Text style={styles.InfoItemLabel}>{label}</Text>
                                                </View>
                                                <View style={styles.InfoItemTextContainer}>
                                                  {children}
                                                  {children2}
                                                </View>                                
                                              </View>

export default class ScreenSettings extends Component {

  constructor(props) {
    super(props);

    this.state = {  
      info_uniqueID:'', 
      info_manufacturer:'',
      info_model:'',
      info_system:'',
      info_deviceName:'',
      info_apiLevel:'',
      cam_active:false,
      cam_linkImage:'' ,
      cam_frecuencia:15 ,
      cam_calidad:'Media',
      cam_horarioInicial:'',
      cam_horarioFinal:'',
    };
   
    this._onPress_SideMenu=this._onPress_SideMenu.bind(this);   
    this._onPressSaveBoton=this._onPressSaveBoton.bind(this);
    this._onChange_CamActive=this._onChange_CamActive.bind(this);
    this._onChange_CamFrecuencia=this._onChange_CamFrecuencia.bind(this);
    this._onChange_CamCalidad=this._onChange_CamCalidad.bind(this);
    this._onChange_CamHoraInicio=this._onChange_CamHoraInicio.bind(this);
    this._onChange_CamHoraFin=this._onChange_CamHoraFin.bind(this);   
  } 
   
  _onPress_SideMenu(pVisible){
    this.props.onPress_SideMenu(pVisible);   
  }  
  _onPressSaveBoton(){
    this._saveSettings();    
  }
  _onLayout(event){
    const {width,height}=event.nativeEvent.layout;
    const orientation =(width>height)?'APAISADO':'NORMAL';   
    //console.log('Orientacion: ' + orientation + ', width: ' + width + ', height: ' + height);
  }
  _onChange_CamActive(pValue){
    this.setState({cam_active:pValue});
  } 
  _onChange_CamFrecuencia(pValue){
    this.setState({cam_frecuencia:pValue});
  } 
  _onChange_CamCalidad(pValue){
    this.setState({cam_calidad:pValue});
  } 
  _onChange_CamHoraInicio(pValue){
    this.setState({cam_horarioInicial:pValue});
  } 
  _onChange_CamHoraFin(pValue){
    this.setState({cam_horarioFinal:pValue});
  } 
  _saveSettings(){
    try {

      var cam_linkImage = Constantes.GetFoto + '/' + this.state.info_uniqueID + '.jpg' 

      store.save('setting', { cam_active:this.state.cam_active,
                              cam_linkImage:cam_linkImage,
                              cam_frecuencia:this.state.cam_frecuencia,
                              cam_calidad:this.state.cam_calidad,
                              cam_horarioInicial: this.state.cam_horarioInicial,
                              cam_horarioFinal: this.state.cam_horarioFinal
                            }); 

      this.dialogbox.alert('Settings Grabados.');     
    } catch (error) {
      this.dialogbox.alert('ERROR: ' + error);  
    }
  }  
  async _getSettings(){
    try {

      res = await store.get('setting');

      if(res!= null){
        this.setState({ cam_active:res.cam_active,
                        cam_linkImage: res.cam_linkImage,
                        cam_frecuencia:res.cam_frecuencia,
                        cam_calidad:res.cam_calidad,
                        cam_horarioInicial: res.cam_horarioInicial,
                        cam_horarioFinal: res.cam_horarioFinal
        })
      }
    } catch (error) {
      this.dialogbox.alert('ERROR: ' + error);  
    }
  }
      
  render() {  
     
    SW = <Switch value={this.state.cam_active} onValueChange = {this._onChange_CamActive}/>
    SL = <View style={styles.SliderContainer}><Slider minimumValue={1} maximumValue={15} step={1} style={styles.Slider} value={this.state.cam_frecuencia} onValueChange={this._onChange_CamFrecuencia}/><Text style={styles.SliderCount}>{this.state.cam_frecuencia} {'min.'}</Text></View>
    DD = <Dropdown containerStyle={styles.DropDownContainer} label='Calidad' data={Constantes.CALIDAD} value={this.state.cam_calidad} fontSize={14} itemCount={6} onChangeText={this._onChange_CamCalidad} />    
    LINK =  <Button transparent small iconRight style={styles.LinkButton} onPress={() => Linking.openURL(this.state.cam_linkImage)}>    
              <Text style={styles.LinkFoto}>{fn.fnGetFileName(this.state.cam_linkImage)}</Text>
              <Icon name='arrow-forward' />
            </Button>
    HIni =  <DateH placeholder={'inicial'} fecha={this.state.cam_horarioInicial} onChangeHora={this._onChange_CamHoraInicio}/>
    HFin =  <DateH placeholder={'final'} fecha={this.state.cam_horarioFinal} onChangeHora={this._onChange_CamHoraFin}/>

    return (

        <Container  onLayout={this._onLayout}> 

          <HeaderTitle title='SETTINGS' onPress_SideMenu= {this._onPress_SideMenu} onPress_PowerOff={this.props.onPress_PowerOff}/>  

          <Content>                
            <List>
                <ListItem itemDivider style={styles.listItemDivider}>
                  <Text>Información Teléfono</Text>
                </ListItem>                    
                <View style={styles.ListItemContainer}>
                    <InfoItem label='ID:' info={this.state.info_uniqueID}/>
                </View>
                <View style={styles.ListItemContainer}>
                    <InfoItem label='Fabricante:' info={this.state.info_manufacturer}/>
                </View>
                <View style={styles.ListItemContainer}>
                    <InfoItem label='Modelo:' info={this.state.info_model}/>
                </View>
                <View style={styles.ListItemContainer}>
                    <InfoItem label='Sistema:' info={this.state.info_system}/>
                </View>
                <View style={styles.ListItemContainer}>
                    <InfoItem label='Nombre:' info={this.state.info_deviceName}/>
                </View>
                <View style={styles.ListItemContainer}>
                    <InfoItem label='Api Level:' info={this.state.info_apiLevel}/>
                </View>              

                <ListItem itemDivider style={styles.listItemDivider}>
                  <Text style={this.state.cam_active?{color:'green', fontWeight: 'bold'}:{}}>Cámara Web</Text>
                </ListItem>               
                <View style={styles.ListItemContainer}>
                    <CamItem label='Activa:' children={SW}/>
                </View>
                <View style={styles.ListItemContainer}>
                    <CamItem label='Foto:' children={LINK}/>
                </View> 
                <View style={styles.ListItemContainer}>
                    <CamItem label='Frecuencia:' children={SL}/>
                </View> 

                <View style={styles.ListItemContainer}> 
                  <CamItem label='Horario:' children={HIni} children2={HFin}/>                                  
                </View>              
                 
                <View style={[styles.ListItemContainer, {marginTop:10}]}>
                    <CamItem label='Imagen:' children={DD}/>
                </View>                                           
             </List>

          </Content>

           <Fab
              active={true}
              direction="up"
              containerStyle={{}}
              style={styles.fab}
              position="bottomRight"
              onPress={this._onPressSaveBoton}>
              <Icon style={{fontSize:35}} name="archive" />        
            </Fab>    

            <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/> 
        
        </Container>

    );
  }

  componentDidMount(){

    var info_uniqueID= DeviceInfo.getUniqueID();    
    var info_manufacturer = DeviceInfo.getManufacturer();
    var info_model= DeviceInfo.getBrand() + ', ' + DeviceInfo.getModel() + ', ' + DeviceInfo.getDeviceId();    
    var info_system =  DeviceInfo.getSystemName() + ', ' + DeviceInfo.getSystemVersion();   
    var info_deviceName = DeviceInfo.getDeviceName();
    var info_apiLevel = DeviceInfo.getAPILevel(); 

    this.setState({info_uniqueID, info_manufacturer, info_model, info_system, info_deviceName, info_apiLevel});  
    this._getSettings();  
  }


}

const styles = StyleSheet.create({
  fab:{
    backgroundColor: 'rgba(14,89,164,0.92)',
    height:70,
    width:70,
    borderRadius:35,
    bottom:10,
    right:5
  }, 
  listItemDivider:{
    marginBottom:10,
  },
  ListItemContainer:{
    padding:5,
  },
  InfoItemContainer:{
    flexDirection:'row',   
  },
  InfoItemLabelContainer:{
    width:'25%',
  },
  InfoItemTextContainer:{
   flexDirection:'row',
   
   alignItems:'flex-start',
   width:'75%',  
  },
  InfoItemLabel:{
    fontSize:15
  },
  InfoItemText:{
    fontSize:14,
    color:'gray',
  },
  SliderContainer:{
    width:'95%',
    marginLeft:3,
    position:'relative',
    flexDirection:'row',
    top:-8

  },
  DropDownContainer:{
    width:'95%',
    marginLeft:3,
    position:'relative',
    top:-27,
  },
  Slider:{
    width:'80%'
  },
  SliderCount:{
    width:'20%',
    textAlign:'center',
    position:'relative',
    top:9,
    height:30,
    fontSize:14
  },
  LinkButton:style={
    height:20,    
  },  
  LinkFoto:{
    color:'blue',
    fontSize:12,
    position:'relative',    
    left:-15,
    paddingRight:0    
  } 
});
