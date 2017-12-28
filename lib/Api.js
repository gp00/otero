
import axios from 'axios';

export default class Api {
    constructor() {}
    
    static getNoticiasUri ='http://www.xn--oterodelasdueas-brb.es/App_Ashx/Noticia/LoadNoticiasAndroid.ashx';
    static postNoticiasUri ='http://www.xn--oterodelasdueas-brb.es/App_Ashx/Noticia/AltaNoticia.ashx';
    static deltNoticiasUri ='http://www.xn--oterodelasdueas-brb.es/App_Ashx/Noticia/BorrarNoticia.ashx';
    
    static async getNoticias(self){  
        try {

            self.setState ({ Net:true, NumNoticias:0, Noticias:[]});

            var noticias= await axios.get(this.getNoticiasUri);
            return noticias.data;    

        } catch (error) {
            alert('error: ' + error);            
        }      
    }

    static async delNoticia(self,idNoticia){  
        try {

            self.setState ({ Net:true, NumNoticias:0, Noticias:[]});

            data={params:{idNoticia: idNoticia}}

            var noticia= await axios.get(this.deltNoticiasUri, data);
            var noticias= await axios.get(this.getNoticiasUri);
            return noticias.data;       

        } catch (error) {
            alert('error: ' + error);            
        }      
    }

    static async postNoticia(self, Noticia){  
        try {

            self.setState ({ Net:true, NumNoticias:0, Noticias:[]});      
        
            var data = new FormData();

            data.append('Fecha', Noticia.fecha);
            data.append('Titulo', Noticia.titulo);
            data.append('Contenido', Noticia.noticia);
           
            var noticia= await axios.post(this.postNoticiasUri, data);
            var noticias= await axios.get(this.getNoticiasUri);
            return noticias.data;    

        } catch (error) {
            alert('error: ' + error);            
        }      
    }

}