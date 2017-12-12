
import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View
} from 'react-native';

//<Sensor caption='Titulo Sensor'
//        captionAlign ='center'
//        ledSize='18'
//        fontSize='16'
//        fontColor={'white'}
//        backGroundColor={'#1C1A1A'}
//        on={true}
//        value={true} />

const Led =({tamaño, colorfondo})=><View style={{borderColor:'rgba(52, 52, 52, 0.5)', borderWidth:1,  width:tamaño, height:tamaño, backgroundColor: colorfondo, borderRadius:tamaño/2}}/>

const colorLed_On ='#29F313';
const colorLed_Off ='#FC0A0A';
const colorLed_Value = '#1FFC07';

const nocaptionAlign='left';
const nofontColor='black';
const nobackGroundColor='transparent';
const minfontSize=18;
const minledSize=18;

export default class Sensor extends Component {

    constructor(props) {
        super(props);
   
    }  

    render() {  

        var captionAlign= this.props.captionAlign==null?nocaptionAlign:this.props.captionAlign;
        var fontColor= this.props.fontColor==null?nofontColor:this.props.fontColor;
        var backGroundColor = this.props.backGroundColor==null?nobackGroundColor:this.props.backGroundColor
        var fontSize = this.props.fontSize==null?minfontSize:parseInt(this.props.fontSize);
        var ledSize = this.props.ledSize==null?minledSize:parseInt(this.props.ledSize);        
        
        return (
            <View {...this.props.style} style={[styles.containerSensor,{backgroundColor:backGroundColor}]}>
                <View style={styles.containerCaption}>
                    <Text style={{fontSize:fontSize, color:fontColor, textAlign:captionAlign}}>{this.props.caption}</Text>
                </View>
                <View style={styles.containerLuz}>
                    <View style={styles.containerLed}>
                        {this.props.on?
                            <Led tamaño={ledSize} colorfondo={colorLed_On}/>:
                            <Led tamaño={ledSize} colorfondo={colorLed_Off}/>
                        }
                    </View>
                    <View style={styles.containerLed}>
                        {this.props.value && this.props.on && <Led tamaño={ledSize} colorfondo={colorLed_Value}/>}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  containerSensor: {    
    flexDirection:'row',
    padding:1,
  },
  containerCaption: {
    flex: 1.5,
    margin: 2,
  },
  containerLuz: {
    flex:1,
    flexDirection:'row',    
  },
  containerLed:{
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'center',
  }
});