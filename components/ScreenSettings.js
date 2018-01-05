
import React, { Component } from 'react';
import {
  StyleSheet,
  View,  
} from 'react-native';

import { Container, Content, Footer, Button, Left, Right, Body, Icon, Text, Input, Item, Fab, List, ListItem, Switch  } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import Slider from "react-native-slider";

import HeaderTitle from "./HeaderTitle"

const InfoItem =({label,info})=><View style={styles.InfoItemContainer}>
                                  <View style={styles.InfoItemLabelContainer}>
                                    <Text style={styles.InfoItemLabel}>{label}</Text>
                                  </View>
                                  <View style={styles.InfoItemTextContainer}>
                                    <Text style={styles.InfoItemText}>{info}</Text>
                                  </View>
                                </View>

const CamItem =({label,children})=><View style={styles.InfoItemContainer}>
                                    <View style={styles.InfoItemLabelContainer}>
                                      <Text style={styles.InfoItemLabel}>{label}</Text>
                                    </View>
                                    <View style={styles.InfoItemTextContainer}>
                                      {children}
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
      info_numberTLF:'',
      cam_active:false,
      cam_frecuencia:5,
      cam_linkImage:'' ,
      cam_frecuencia:15 ,
    };
   
    this._onPress_SideMenu=this._onPress_SideMenu.bind(this);   
    this._onPressSaveBoton=this._onPressSaveBoton.bind(this);
    this._onChange_CamActive=this._onChange_CamActive.bind(this);
    this._onChange_CamFecuencia=this._onChange_CamFecuencia.bind(this);
  } 
   
  _onPress_SideMenu(pVisible){
    this.props.onPress_SideMenu(pVisible);   
  }  
  _onPressSaveBoton(){
    alert('Save...')
  }
  _onLayout(event){
    const {width,height}=event.nativeEvent.layout;
    const orientation =(width>height)?'APAISADO':'NORMAL';   
    //console.log('Orientacion: ' + orientation + ', width: ' + width + ', height: ' + height);
  }
  _onChange_CamActive(pValue){
    this.setState({cam_active:pValue});
  } 
  _onChange_CamFecuencia(pValue){
    this.setState({cam_frecuencia:pValue});
  }  
    
  render() {  

    SW = <Switch value={this.state.cam_active} onValueChange = {this._onChange_CamActive}/>
    SL = <View style={styles.SliderContainer}><Slider minimumValue={1} maximumValue={30} step={1} style={styles.Slider} value={this.state.cam_frecuencia} onValueChange={this._onChange_CamFecuencia}/><Text style={styles.SliderCount}>{this.state.cam_frecuencia} {'min.'}</Text></View>

    return (

        <Container  onLayout={this._onLayout}> 

          <HeaderTitle title='SETTINGS' onPress_SideMenu= {this._onPress_SideMenu} onPress_PowerOff={this.props.onPress_PowerOff}/>  

          <Content>                
            <List>
                <ListItem itemDivider>
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
                <View style={styles.ListItemContainer}>
                    <InfoItem label='Numero:' info={this.state.info_numberTLF}/>
                </View>

                <ListItem itemDivider>
                  <Text style={this.state.cam_active?{color:'green', fontWeight: 'bold'}:{}}>Cámara Web</Text>
                </ListItem>
                <View style={styles.ListItemContainer}>
                    <CamItem label='Activa:' children={SW}/>
                </View>
                <View style={styles.ListItemContainer}>
                    <CamItem label='Frecuencia:' children={SL}/>
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
              <Icon style={{ fontSize:35 }} name="archive" />        
            </Fab>    
        
        </Container>

    );
  }

  componentDidMount() {     
    var info_uniqueID= DeviceInfo.getUniqueID();    
    var info_manufacturer = DeviceInfo.getManufacturer();
    var info_model= DeviceInfo.getBrand() + ', ' + DeviceInfo.getModel() + ', ' + DeviceInfo.getDeviceId();    
    var info_system =  DeviceInfo.getSystemName() + ', ' + DeviceInfo.getSystemVersion();   
    var info_deviceName = DeviceInfo.getDeviceName();
    var info_apiLevel = DeviceInfo.getAPILevel();  
    var info_numberTLF = DeviceInfo.getPhoneNumber();
    
    this.setState({info_uniqueID, info_manufacturer, info_model, info_system, info_deviceName, info_apiLevel, info_numberTLF});
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
  ListItemContainer:{
    padding:5
  },
  InfoItemContainer:{
    flexDirection:'row',
  },
  InfoItemLabelContainer:{
    width:'25%',
  },
  InfoItemTextContainer:{
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
  }
});
