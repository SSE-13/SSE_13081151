var fs = require("fs");

module data {

    export class Storage {

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }


        public readFile() {
            var map_path = __dirname + "/map.json"
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        }
        
        public saveFile(){
            console.log(this.mapData);
            var map_path = __dirname + "/map.json"
            var json="{\"map\":"+JSON.stringify(this.mapData)+"}";
            fs.writeFileSync(map_path,json,"utf-8");
        }
        
        public mapData;

    }
    
    /*export class Tool
    {
        const enum ToolType {Pencil, Select, Eraser}
    }*/

}