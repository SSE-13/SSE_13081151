
module data {

    export class Storage {

        private static _instance: Storage;
        public m_Height:number;
        public m_Width:number;
        public m_Num_Layers:number;
        public m_Layers;
        public m_CollisionLayer:number; 
        
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
                    
                      var obj = JSON.parse(m_jsonfile.responseText);
                      
                      Storage._instance.m_Height = obj.height;
                      Storage._instance.m_Width = obj.width;
                      Storage._instance.m_Num_Layers = obj.layers.length;
                      Storage._instance.m_CollisionLayer = obj.layers.length-1;
                      
                      Storage._instance.m_Layers = new Array(Storage._instance.m_Num_Layers);
                      
                      for(var i = 0; i< obj.layers.length; i++){
                         Storage._instance.m_Layers[i] = obj.layers[i];
                      }
                      callback();
               
                }
            }  
            m_jsonfile.send();
        }

        public saveFile(){
            
        }

    }



}