
import FileTransfer from 'react-native-file-transfer-android';

import * as Constantes from "../constantes";
import * as fn from "./FuncionesGenerales"

export default class fileUpload {
    constructor() {}
    
    static fileUploadPOST = Constantes.fileUploadPOST; 

    static async imageUpload(self,imagen){  
        try {       
            var uri= imagen;
            var uploadUrl = Constantes.fileUploadPOST;
            var fileName = fn.fnGetFileName(imagen);
            var mimeType= 'image/jpg';

           FileTransfer.upload({
                uri, uploadUrl, fileName, mimeType: 'image/jpg',
                headers: {'Accept': 'application/json'},
                data: {}
              }, (err, res) => {
                if(err) {
                  alert(err);     
                } else {
                  //console.log(res);
                  self.setState({cam_iconActivity: Constantes.CONTADORSEGUNDOS});
                }
              });
            
            return true

        } catch (error) {
            alert('error: ' + error);
            return false        
        }      
    }

}