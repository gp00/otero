import React, { Component } from 'react';
import {   
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {List, ListItem, Left, Right, Body, Button, Icon} from 'native-base';
import {NOTICIAS,CAMARA,SETTINGS} from '../constantes';

var screen = Dimensions.get('window');

export default class MenuLateral extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return <ScrollView scrollsToTop={false} style={{ backgroundColor: 'rgba(14,89,164,0.1)'}}>
              <View style={styles.sideMenuContainer}>
                <List>
                  <ListItem style={styles.logoContainer}>
                    <Image style={styles.logoImage} source={require('../resources/OterodelasDueñas.png')} />
                  </ListItem>
                  <ListItem style={styles.opcionMenu} icon>
                    <Body>
                      <Button iconLeft transparent onPress={() => this.props.onMenuItemSelected(NOTICIAS)}>
                        <Icon name="apps" style={styles.iconMenu}/>
                        <Text style={styles.literalMenu}>Noticias</Text>                       
                      </Button>
                    </Body>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </ListItem>
                  <ListItem style={styles.opcionMenu} icon>
                    <Body>
                      <Button iconLeft transparent onPress={() => this.props.onMenuItemSelected(CAMARA)}>
                        <Icon name="camera" style={styles.iconMenu}/>
                        <Text style={styles.literalMenu}>Camara</Text>
                      </Button>                      
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                  </ListItem>
                  <ListItem style={styles.opcionMenu} icon>
                    <Body>
                      <Button iconLeft transparent onPress={() => this.props.onMenuItemSelected(SETTINGS)}>
                        <Icon name="options" style={styles.iconMenu}/>
                        <Text style={styles.literalMenu}>Settings</Text>
                      </Button>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                  </ListItem>
                  <ListItem style={styles.opcionMenu} icon>
                    <Body>
                      <Button iconLeft transparent onPress={this.props.onPress_PowerOff}>
                        <Icon name="power" style={styles.iconMenu} />
                        <Text style={styles.literalMenu}>Salir</Text>
                      </Button>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                  </ListItem>
                </List>
              </View>
            </ScrollView>
  }

}

const styles = StyleSheet.create({
    logoContainer: {
      backgroundColor:'transparent',
      alignItems:'center',
      justifyContent:'center',
    },
    logoImage: {
      width: 120,
      height: 120,      
    },
    sideMenuContainer:{ 
      backgroundColor: 'transparent',
      marginTop:60,     
      height: screen.height*0.8
    },
    opcionMenu:{
      backgroundColor:'transparent',
      position:'relative',
      left:-7
    },
    literalMenu:{
      fontSize:18,
      color:'black', 
      marginLeft:10
    },
    iconMenu:{
      width:30
    }
  });
  