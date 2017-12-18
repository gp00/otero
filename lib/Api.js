
import axios from 'axios';

export default class Api {
    constructor() {}
    
    static getNoticiasUri ='http://www.xn--oterodelasdueas-brb.es/App_Ashx/Noticia/LoadNoticiasAndroid.ashx';
    
    static async getNoticias(self){  
        try {

            self.setState ({ Net:true, NumNoticias:0, Noticias:[]});

            var noticias= await axios.get(this.getNoticiasUri);
            return noticias.data;    

        } catch (error) {
            alert('error: ' + error);            
        }      
    }

}