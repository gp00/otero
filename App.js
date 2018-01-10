
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  BackHandler,  
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import DialogBox from 'react-native-dialogbox';

import {NOTICIAS,CAMARA,SETTINGS} from './constantes';

import ScreenNoticias from './components/ScreenNoticias';
import ScreenSettings from './components/ScreenSettings';
import ScreenCamara from './components/ScreenCamara';
import MenuLateral from './components/MenuLateral';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      SideMenuOpen: false,
      NavigateTo: NOTICIAS,
    };

    this._onPress_SideMenu=this._onPress_SideMenu.bind(this);   
    this._onMenuItemSelected=this._onMenuItemSelected.bind(this);   
    this._onPress_PowerOff=this._onPress_PowerOff.bind(this);
  }  

  _onPress_SideMenu(pVisible){
    this.setState({SideMenuOpen:pVisible});    
  }
  _onMenuItemSelected(pItemSelected){
    this.setState({SideMenuOpen:false, NavigateTo: pItemSelected});    
  }
  _onPress_PowerOff(){
    this.setState({SideMenuOpen:false});   
    this.dialogbox.confirm({
			title: 'Noticias',
			content:'Salir de la Aplicación?',
			ok: {
				text: 'Si',
				callback: () => {BackHandler.exitApp();},
			},
			cancel: {text: 'No'}
		});
  }
 
  render() {      

    const menu = this.state.SideMenuOpen && <MenuLateral onPress_PowerOff={this._onPress_PowerOff} onMenuItemSelected={this._onMenuItemSelected} navigator={navigator}/>;
    
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.SideMenuOpen}
        onChange={(isOpen) => this._onPress_SideMenu(isOpen)}>  

        {this.state.NavigateTo == NOTICIAS && <ScreenNoticias onPress_SideMenu={this._onPress_SideMenu} onPress_PowerOff={this._onPress_PowerOff}/>}
        {this.state.NavigateTo == CAMARA && <ScreenCamara onPress_SideMenu={this._onPress_SideMenu} onPress_PowerOff={this._onPress_PowerOff}/>}
        {this.state.NavigateTo == SETTINGS && <ScreenSettings onPress_SideMenu={this._onPress_SideMenu} onPress_PowerOff={this._onPress_PowerOff}/>}

        <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/> 

      </SideMenu>     
    );
  }

  componentDidMount() {  

  }
}

const styles = StyleSheet.create({
 
});
