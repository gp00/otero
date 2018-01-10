import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Container,  Content,  Button, Icon} from 'native-base';

import Camera from 'react-native-camera';
import DeviceBattery from 'react-native-device-battery';
import store from 'react-native-simple-store';
import DialogBox from 'react-native-dialogbox';

import ImageInfo from './ImageInfo'
import HeaderTitle from "./HeaderTitle"

import {CALIDAD} from '../constantes'

export default class ScreenCamara extends Component {
  constructor(props){
    super(props)

    this.state={
      uriImage:'',     
      now: new Date().toISOString().slice(0, 10) + '   ' +  new Date().toTimeString().split(" ")[0],     
      battery:0,
      cam_active:false,
      cam_linkImage:'' ,
      cam_frecuencia:15 ,
      cam_calidad:'Media',
      cam_captura:15,
      cam_contadorsegundos: true
    }

    this._onPress_SideMenu=this._onPress_SideMenu.bind(this);  
    this._onBatteryStateChanged=this._onBatteryStateChanged.bind(this); 
    this._updateImageInfo=this._updateImageInfo.bind(this);
    this._takePicture=this._takePicture.bind(this);
    this._getBatteryLevel=this._getBatteryLevel.bind(this);
  }

  _onPress_SideMenu(pVisible){
    this.props.onPress_SideMenu(pVisible);   
  }  
  _onLayout(event){
    const {width,height}=event.nativeEvent.layout;
    const orientation =(width>height)?'APAISADO':'NORMAL';   
    //console.log('Orientacion: ' + orientation + ', width: ' + width + ', height: ' + height);
  }
  _getSettings(){
    try {
      store.get('setting').then((res) =>{

        if(res!= null){
          this.setState({ cam_active:res.cam_active,
                          cam_linkImage:res.cam_linkImage,
                          cam_frecuencia:res.cam_frecuencia,
                          cam_captura:res.cam_frecuencia*60,
                          cam_calidad:res.cam_calidad
                        })
        }

      }).catch(error => {
        this.dialogbox.alert('ERROR: ' + error);    
      });      
    } catch (error) {
      this.dialogbox.alert('ERROR: ' + error);    
    }
  }     
  _takePicture() {
    const options = {captureQuality:this.state.cam_calidad};
    this.camera.capture({metadata: options})
      .then(data =>this.setState({uriImage:data.path, cam_captura:this.state.cam_captura}))
      .catch(error => {
        this.dialogbox.alert('ERROR: ' + error);     
      });
  }
  _updateImageInfo(){
    var now = new Date().toISOString().slice(0, 10) + '   ' +  new Date().toTimeString().split(" ")[0];
    var cam_captura=this.state.cam_captura-1
    this.setState({cam_captura,now});
    if(cam_captura<=0){
      this._takePicture();
      this.setState({cam_captura:this.state.cam_frecuencia*60})
    }
  }
  _getBatteryLevel(){
    DeviceBattery.getBatteryLevel().then(level => {
      var battery = parseInt(level*100);
      this.setState({battery});
    });
  }
  _onBatteryStateChanged= (state)=> {
    var now = new Date().toISOString().slice(0, 10) + '   ' +  new Date().toTimeString().split(" ")[0];
    var battery = parseInt(state.level*100);
    this.setState({battery, now});
  };

  render() {

    return (

        <Container  onLayout={this._onLayout}> 

          <HeaderTitle title='CAMARA' onPress_SideMenu= {this._onPress_SideMenu} onPress_PowerOff={this.props.onPress_PowerOff}/>  

          <View style={styles.container}>

            <View style={styles.cameraContainer}>
                <Camera
                    ref={cam =>this.camera = cam}
                    style={styles.preview}
                    permissionDialogTitle="Acceso Camara"
                    permissionDialogMessage="Me das Permiso?"
                    aspect={Camera.constants.Aspect.fill}>
                        <View style={styles.iconCameraContainer}>                          
                          <Icon style={styles.iconCamera} name="camera" onPress={this._takePicture}/>                             
                        </View>
                        <ImageInfo bateria={this.state.battery} fecha={this.state.now} captura={this.state.cam_captura} contadorsegundos={this.state.cam_contadorsegundos} />              
                </Camera>
            </View>
           

          </View>

          <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/> 

        </Container>
    );
  }

  componentDidMount(){
    //setInterval(this._updateImageInfo, 1000);
    this._getSettings();
    this._getBatteryLevel();    
    //DeviceBattery.addListener(this._onBatteryStateChanged);
  } 

  componentWillUnmount(){ 
    //DeviceBattery.removeListener(this._onBatteryStateChanged); 
  }
 
}

const styles = StyleSheet.create({ 
  container:{
    flex:1,
    backgroundColor:'black'
  }, 
  cameraContainer:{
    flex:5,
  }, 
  footerContainer:{
    flex:1,
    backgroundColor:'green',
    minHeight:25,
  },
  preview: {
    margin:1,
    flex:1,
    justifyContent: 'flex-end',    
    alignItems: 'center'
  },
  iconCameraContainer:{
    marginBottom:20,
    borderColor:'white',
    borderRadius:40,
    borderWidth:1,
    height:80,
    width:80,
    justifyContent:'center',
    alignItems:'center'
  },
  iconCamera:{
    fontSize:50,
    color:'white'
  }
  
});