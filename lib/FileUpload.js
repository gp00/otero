
var FileUpload = require('NativeModules').FileUpload;

import * as Constantes from "../constantes";
import * as fn from "./FuncionesGenerales"

export default class fileUpload {
    constructor() {}
    
    static fileUploadPOST = Constantes.fileUploadPOST; 

    static async imageUpload(cam_linkImage,imagen){  
        try {       
            var uri = imagen;           
            var uploadUrl = Constantes.fileUploadPOST;
            var fileName = fn.fnGetFileName(cam_linkImage);
            var mimeType= 'image/jpg';

            var data = fn.fnGetDate();

            var obj = {
                uploadUrl,
                method: 'POST', // default 'POST',support 'POST' and 'PUT'
                headers: {
                  'Accept': 'application/json',
                },
                fields: data,
                files: [
                  {
                    name: fileName, // optional, if none then `filename` is used instead
                    filename: fileName, // require, file name
                    filepath: uri, // require, file absoluete path
                    filetype: mimeType, // options, if none, will get mimetype from `filepath` extension
                  },
                ]
            };

            FileUpload.upload(obj, function(err, result) {
              console.log('upload:', err, result);
            })
            
            return true

        } catch (error) {
            alert('error: ' + error);
            return false        
        }      
    }

  

}