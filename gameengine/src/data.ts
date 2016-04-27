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
            var json="{\"height\":" + JSON.stringify(this.height) + ","
                      +"\"width\":" + JSON.stringify(this.width) + ","
                      +"\"layers\"" + JSON.stringify(this.layers) + "}";
                      
            /*for(var i = 0; i < NUM_LAYERS-1; i++)
            {
                json += "\"layer" + i + "\":" + JSON.stringify(this.layers[i]) + ","
            }
            
            json += "\"collisionLayer\":" + JSON.stringify(this.layers[this.COLLISION_LAYER]) + "}"
            */
            
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