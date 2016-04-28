
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;
        

        public isDirty = true;
        constructor(id) {

            super();
            this.cache = document.createElement("canvas");
            this.cache.id = id;
            this.cache.width = 400;
            this.cache.height = 400;
            
        }

        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }   
    }

    export class Tile extends render.Bitmap
    {
        public id: number;
        public ownedRow: number;
        public ownedCol: number;
        private walkable: boolean = true;
        private isMapTile:boolean;
        public isCollisionTile:boolean;
        private isSelected:boolean = false;
        
        
        private _sx:number;
        private _sy:number;
        
        public set sx(value:number)
        {
            this._sx = value;
        }
         
        public set sy(value:number)
        {
            this._sy = value;
        }
        
        constructor(id:number, row:number, col:number, tileWidth:number, tileHeight:number, source, x:number, y:number, isMapTile:boolean, walkable?:boolean)
        {
            super();
            
            this.width = tileWidth;
            this.height = tileHeight;
            this.id = id;
            this.ownedCol = col;
            this.ownedRow = row;
            this.walkable = walkable || true;
            this.source = source;
            this.x = x;
            this.y = y;
            this.isMapTile = isMapTile;
        }
        
        public setWalkable(value:boolean) {
            this.walkable = value;
        }
        
        public getWalkable()
        {
            return this.walkable;    
        }
        
        public setSelected(value:boolean)
        {
            this.isSelected = value;
        }
        
        public setTileAttributes(tile:Tile)
        {
            this.id = tile.id;
            this._sx = tile._sx;
            this._sy = tile._sy;
            this.source = tile.source;
            this.width = tile.width;
            this.height = tile.height;
        }
        
        render(context:CanvasRenderingContext2D)
        {
            var image = render.getImage((this.id == -1 && !this.isCollisionTile)? __dirname + "\\assets\\0.png": this.source);
            
            if(image)
            {
                
                if(this.id == -1){
                    context.drawImage(image, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
                } else{
                    context.globalAlpha = 1;
                    context.drawImage(image, this._sx*this.width, this._sy*this.height, this.width, this.height, 0, 0, this.width, this.height);
                     
                     if(!this.isMapTile)
                    {                        
                        context.strokeStyle = "#000000";
                        context.strokeRect(0,0,this.width, this.height); 
                        if(this.isSelected){
                            context.globalAlpha = 0.5;
                            context.fillStyle = "#ff0000";
                            context.fillRect(0, 0, this.width, this.height);
                        }
                    }
                }
            }
        }
    }
    
    export class Tileset extends render.DisplayObjectContainer
    {
        public tiles: Array<Array<Tile>>;
        public source:string;
        public tileWidth:number;
        public tileHeight:number;
        public imageWidth:number;
        public imageHeight:number;
        public firstID:number;
        public lastID:number;
        public numCols:number;
        public numRows:number;
        
        strokeColor = "#000000"
        
        constructor(firstID, source, tileW, tileH, imageW, imageH)
        {
            super();
            this.source = source;
            this.firstID = firstID;
            this.imageHeight = imageH;
            this.imageWidth = imageW;
            this.tileHeight = tileH;
            this.tileWidth = tileW;    
            
            this.numCols = Math.floor(imageW/tileW);
            this.numRows = Math.floor(imageH/tileH);
            this.lastID = this.numCols * this.numRows;;
            
            this.tiles = new Array(this.numCols);
            var id = firstID;
            for(var row = 0; row < this.numRows; row++)
            {
                this.tiles[row] = new Array<Tile>(this.numCols);
                for(var col = 0; col < this.numCols; col++)
                {
                    var x = col * this.tileWidth;
                    var y = row * this.tileHeight;
                    this.tiles[row][col] = new Tile(id++, row, col, this.tileWidth, this.tileHeight, this.source, x, y, false);
                }
            } 
        }
        
        render(context:CanvasRenderingContext2D)
        {
            var image = render.getImage(this.source);
            if(image)
            {
                for(var row = 0; row < this.numRows; row++){
                    for(var col = 0; col < this.numCols; col++)
                    {
                        var tile = this.tiles[row][col]; 
                        var sy =   Math.floor(tile.id / this.numCols) ;
                        var sx =   tile.id - (this.numCols * sy);
                        
                        tile.sy = sy; 
                        tile.sx = sx;
                        
                        tile.draw(context);
                        this.addChild(tile);
                    }
                }                
            }else
            {
                context.font = "14px Arial";
                context.fillStyle = '#000000';
                context.fillText('Invalid image URL', 0, 20);
            }
            
        }
    }
    
    export class ControlPanel extends render.DisplayObjectContainer {
        

        
    }
}
