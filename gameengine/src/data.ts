var fs = require("fs");

module data {

    export const NUM_LAYERS = 3;
    export const ASSETS_PATH = __dirname + "\\assets\\";
    export const MAP_EXTENSION = ".json";

    export class Map {

        //private static _instance: Map;
        private DEFAULT_WIDTH: number =5;
        private DEFAULT_HEIGHT: number =5;
                
        private height: number;
        private width: number;
        private name: string;
        
        //public layers;
        
        public mapData;

        /*public static getInstance(): Map {
            if (Map._instance == null) {
                Map._instance = new Map();
            }
            return Map._instance;
        }*/
        
        constructor();
        constructor(height?, width?, name?)
        {
            
            this.height = height ? height : this.DEFAULT_HEIGHT;
            this.width = width ? width : this.DEFAULT_WIDTH;
            this.name = name ? name : "map";
            //this.layers = new Array(NUM_LAYERS); 
            
            
            for(var col = 0; col < width; col++){
                mapData = 
                for(var row = 0; row < height; row++){
                    
                }
            }
        }


        public readFile() {
            var map_path = ASSETS_PATH + this.name + MAP_EXTENSION;
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
            console.log(obj.height);
        }
        
        public saveFile(){
            console.log(this.mapData);
            var map_path = ASSETS_PATH + this.name + MAP_EXTENSION;
            var json="{\"map\":"+JSON.stringify(this.mapData)+"}";
            fs.writeFileSync(map_path,json,"utf-8");
        }
        
        

    }
    
    export class Tileset extends render.Bitmap
    {
        public tileWidth;
        public tileHeight;
        public name;
        public tileMapping;
        private numTilesInRow;
        
        constructor()
        {
            super();
        }
        public setTileset(width, height, tileWidth, tileHeight, name, source)
        {
            this._height = height;
            this._width = width;
            this.tileHeight = tileHeight;
            this.tileWidth = tileWidth;
            this.source = source;
            this.name = name;
            this.numTilesInRow = Math.floor(width / tileWidth);
        }
        
        public getTile(col, row):render.Bitmap
        {
            return ;
        }
    }

    /*export class Tool
    {
        const enum ToolType {Pencil, Select, Eraser}
    }*/

}