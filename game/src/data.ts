//var fs = require("fs");

module data {

    export class Storage {

        private static _instance: Storage;
        public m_layer0;
        public m_layer1;
        
        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }

        public GetJson(callback){
            var m_jsonfile = new XMLHttpRequest();
            m_jsonfile.open("GET","lib/map.json", true);
            
            m_jsonfile.onreadystatechange = function() {
                if (m_jsonfile.readyState == 4 && m_jsonfile.status == 200) {  
                    
                      var _Layer = JSON.parse(m_jsonfile.responseText);
                      Storage._instance.m_layer0 = _Layer.layer0;
                      Storage._instance.m_layer1 = _Layer.layer1;
    
                      callback();
               
                }
            }  
            m_jsonfile.send();
        }

        public saveFile(){
            
        }

    }



}