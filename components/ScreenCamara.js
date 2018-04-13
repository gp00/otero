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

import * as Constantes from '../constantes'
import Fileupload from '../lib/FileUpload'

export default class ScreenCamara extends Component {
  constructor(props){
    super(props)

    this.state={
      uriImage:'',     
      now: new Date().toISOString().slice(0, 10) + '   ' +  new Date().toTimeString().split(" ")[0].substring(0,5),     
      battery:0,
      cam_linkImage:'',
      cam_record:false,
      cam_active:false,
      cam_frecuencia:15 ,
      cam_calidad:'Media',
      cam_captura:15,
      cam_horarioInicial:'',
      cam_horarioFinal:'',
      cam_iconActivity: Constantes.CONTADORSEGUNDOS
    }   

    this._getSettings();
    this._getBatteryLevel();  

    this._onPress_SideMenu=this._onPress_SideMenu.bind(this);
    this._updateImageInfo=this._updateImageInfo.bind(this);
    this._takePicture=this._takePicture.bind(this);
    this._getBatteryLevel=this._getBatteryLevel.bind(this);
    this._beginRecord=this._beginRecord.bind(this);
    this._endRecord=this._endRecord.bind(this);
  }

  _onPress_SideMenu(pVisible){
    this.props.onPress_SideMenu(pVisible);   
  }  
  _onLayout(event){
    const {width,height}=event.nativeEvent.layout;
    const orientation =(width>height)?'APAISADO':'NORMAL';   
    //console.log('Orientacion: ' + orientation + ', width: ' + width + ', height: ' + height);
  }
  async _getSettings(){
    try {
      res = await store.get('setting');
      if(res!= null){
          this.setState({            
                          cam_linkImage:res.cam_linkImage,
                          cam_active:res.cam_active,
                          cam_frecuencia:res.cam_frecuencia,                         
                          cam_calidad:res.cam_calidad,
                          cam_horarioInicial: res.cam_horarioInicial,
                          cam_horarioFinal: res.cam_horarioFinal,
                          cam_captura:res.cam_frecuencia
                        })
      }
   
    } catch (error) {
      this.dialogbox.alert('ERROR: ' + error);    
    }
  }   
  _beginRecord(){

    this.setState({
                    cam_record:true,
                    cam_iconActivity: Constantes.CONTADORSEGUNDOS                   
                  });

  } 
  _endRecord(){

    this.setState({                   
                    cam_record:false,
                    cam_iconActivity: Constantes.CONTADORSEGUNDOS
                  });

  }  
  async _takePicture() {
    try {

      this.setState({cam_record:true,cam_iconActivity: Constantes.FILEUPLOAD});

      var options = {captureQuality:this.state.cam_calidad};
      data = await this.camera.capture({metadata:options});

      this.setState({ uriImage:data.path});              
      var data = await Fileupload.imageUpload(this.state.cam_linkImage, data.path);   

      this.setState({cam_record:false,cam_iconActivity: Constantes.CONTADORSEGUNDOS});   

    } catch (error) {
      this.dialogbox.alert('ERROR: ' + error);    
    }    
  }
  async _getBatteryLevel(){
    level =await DeviceBattery.getBatteryLevel()
    var battery = parseInt(level*100);
    this.setState({battery});    
  }
  async _updateImageInfo(){

    var now = new Date().toISOString().slice(0, 10) + '   ' +  new Date().toTimeString().split(" ")[0].substring(0,5);
    var cam_captura=this.state.cam_captura-1
    this.setState({cam_captura,now});

    if(cam_captura<=0){
      this._getBatteryLevel(); 
      this._takePicture();
      this.setState({cam_captura:this.state.cam_frecuencia});
    }
  }

  render() {

    var IconCamera;

    if(this.state.cam_active && !this.state.cam_record){ //WEBCAM
      IconCamera=<Icon style={[styles.iconCamera,styles.iconCameraRecord]} name="videocam" onPress={this._beginRecord}/>
    }else if(!this.state.cam_active && !this.state.cam_record){ //PICTURE
      IconCamera=<Icon style={styles.iconCamera} name="camera" onPress={this._takePicture}/>
    }else if(this.state.cam_record){ //PAUSE     
      IconCamera=<Icon style={[styles.iconCamera, styles.iconCameraEndRecord]} name="pause" onPress={this._endRecord}/>
    }

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
                            {IconCamera}
                        </View>
                        <ImageInfo bateria={this.state.battery} fecha={this.state.now} captura={this.state.cam_captura} iconActivity={this.state.cam_iconActivity} />              
                </Camera>
            </View>           

          </View>

          <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/> 

        </Container>
    );
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
  },
  iconCameraRecord:{   
    color:'rgba(58,221,17,0.8)'
  },
  iconCameraEndRecord:{   
    color:'rgba(118,134,114,0.8)'
  }
  
});