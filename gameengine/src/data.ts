var fs = require("fs");

module data {

    export const NUM_LAYERS = 3;
    export const ASSETS_PATH = __dirname + "\\assets\\";
    export const MAP_EXTENSION = ".json";

    export class Storage {

        private static _instance: Storage;
        private static DEFAULT_WIDTH: number =5;
        private static DEFAULT_HEIGHT: number =5;
        
        public TILE_WIDTH = 32;
        public TILE_HEIGHT = 32;
        public COLLISION_LAYER = NUM_LAYERS-1;
        
        private height: number;
        private width: number;
        private name: string;
        private _tileset: editor.Tileset;
        
        public layers;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage(this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT, "map");
            }
            return Storage._instance;
        }
        
        public get MapHeight()
        {
            return this.height;
        }
        
        public get MapWidth()
        {
            return this.width;
        }
        
        public set MapHeight(value:number)
        {
            this.height = value;
        }
        
        public set MapWidth(value:number)
        {
            this.width = value;
        }
        
        public get NumLayers()
        {
            return NUM_LAYERS;
        }
        
        public set tileset(value)
        {
            this._tileset = value;
        }
        
        constructor(height, width, name)
        {
            
            this.height = height;
            this.width = width;
            this.name = name;
            this.layers = new Array(NUM_LAYERS);
            
            for(var i = 0; i < NUM_LAYERS; i++){
                this.layers[i] = new Array(width); 
                for(var col = 0; col < width; col++){
                    this.layers[i][col] = new Array(height); 
                    for(var row = 0; row < height; row++){
                        this.layers[i][col][row] = 0;
                    }
                }
            }
        }


        public readFile() {
            var map_path = ASSETS_PATH + this.name + MAP_EXTENSION;
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.layers[0] = obj.layer0;
            this.layers[1] = obj.layer1;
            this.layers[2] = obj.layer2;
            this.height = obj.height;
            this.width = obj.width;
        }
        
        public saveFile(){
            console.log(this.layers);
            
            var map_path = ASSETS_PATH + this.name + MAP_EXTENSION;
            var json="{\n\t\"height\":" + JSON.stringify(this.height) + ",\n"
                      +"\t\"width\":" + JSON.stringify(this.width) + ",\n"
                      +"\t\"numLayers\":" + JSON.stringify(this.NumLayers) + ",\n"
                      +"\t\"tileset\":{\n\t\t\"filename\":" + JSON.stringify(this._tileset.filename) + ",\n"                      
                      +"\t\t\"firstID\":" + JSON.stringify(this._tileset.firstID) + ",\n"
                      +"\t\t\"tileWidth\":" + JSON.stringify(this._tileset.tileWidth) + ",\n"
                      +"\t\t\"tileHeight\":" + JSON.stringify(this._tileset.tileHeight) + ",\n"
                      +"\t\t\"imageWidth\":" + JSON.stringify(this._tileset.imageWidth) + ",\n"
                      +"\t\t\"imageHeight\":" + JSON.stringify(this._tileset.imageHeight) + "},\n";
                      
                   json += "\t\"layers\":[";  
            for(var i = 0; i < NUM_LAYERS; i++)
            {
                json += "\n\t\t" + JSON.stringify(this.layers[i]);
                if(i < NUM_LAYERS - 1)
                    json += ","
            }
            
            json　+= "\n\t]\n}"
     
            console.log(map_path);
            console.log(json);
            fs.writeFileSync(map_path,json,"utf-8");
        }
        
        

    }

    /*export class Tool
    {
        const enum ToolType {Pencil, Select, Eraser}
    }*/

}