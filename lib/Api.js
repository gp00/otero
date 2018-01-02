
import axios from 'axios';

import * as Constantes from "../constantes";

export default class Api {
    constructor() {}
    
    static getNoticiaUri = Constantes.getNoticiasUri;
    static getNoticiasUri = Constantes.getNoticiasUri;
    static postNoticiasUri = Constantes.postNoticiasUri;
    static delNoticiasUri = Constantes.delNoticiasUri;
    
    static async getNoticia(self,idNoticia){  
        try {

            self.setState ({Net:true});

            data={params:{idNoticia: idNoticia}}

            var noticia= await axios.get(this.getNoticiaUri, data);
            return noticia.data;    

        } catch (error) {
            alert('error: ' + error);            
        }      
    }

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

            var noticia= await axios.get(this.delNoticiasUri, data);
            var noticias= await axios.get(this.getNoticiasUri);
            return noticias.data;       

        } catch (error) {
            alert('error: ' + error);            
        }      
    }

    static async postNoticia(self, Noticia){  
        try {
        
            var data = new FormData();

            data.append('Fecha', Noticia.fecha);
            data.append('Titulo', Noticia.titulo);
            data.append('Contenido', Noticia.noticia);
           
            var noticia= await axios.post(this.postNoticiasUri, data);
            if(noticia.data.indexOf("Error:")==0){
                return noticia.data;    
            }else{
                self.setState ({ Net:true, NumNoticias:0, Noticias:[]});    
                var noticias= await axios.get(this.getNoticiasUri);                
                return noticias.data;    
            }            

        } catch (error) {
            alert('error: ' + error);            
        }      
    }

}