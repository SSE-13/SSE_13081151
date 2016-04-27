
module editor {


    export const GRID_PIXEL_WIDTH = 32;

    export const GRID_PIXEL_HEIGHT = 32;
   
    
    export class WorldMap extends render.DisplayObjectContainer {

        private cache: HTMLCanvasElement;
        
        public grid: astar.Grid;
        public isDirty = true;
        public NUM_ROWS= 12;
        public NUM_COLS = 12;
        constructor(cols:number, rows:number) {
            super();
            this.NUM_COLS = cols;
            this.NUM_ROWS = rows;
            var grid = new astar.Grid(this.NUM_COLS, this.NUM_ROWS);
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            this.grid = grid;
        }
        
    

        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    
    public SetNUM_COLS(value:number){
        this.NUM_COLS = value;
        
    }
     public SetNUM_ROWS(value:number){
        this.NUM_ROWS = value;
    }
    }


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
        }
        
        public setImage(value)
        {
            this.source = value;
        }
   }
  
 export class BoyBody extends Body {
        
        public FindPath :astar.AStar = new astar.AStar();
        movingTime = 0.35;
        timer = this.movingTime;
        public m_Dx = new Array();
        public m_Dy = new Array();
        public m_dx = new Array();
        public m_dy = new Array();
     
         public m_Endx=0;
         public m_Endy=0;
         public m_Startx=0;
         public m_Starty=0;
         
         public movestep = 1;
         
         public  NUM_COLS=12;
         public  NUM_ROWS=12;
         
          public SetEnd(x:number,y:number){
            this.m_Endx=x;
            this.m_Endy=y;         
        } 
         public SetStart(x:number,y:number){
            this.m_Startx=x;
            this.m_Starty=y;         
        }
        public SetNUM_COLS(value:number){
            this.NUM_COLS = value;
            
        }
        public SetNUM_ROWS(value:number){
            this.NUM_ROWS = value;
            
        }
        public run(grid) {
            grid.setStartNode(this.m_Startx,this.m_Starty);
            grid.setEndNode(this.m_Endx,this.m_Endy);
            
            this.FindPath = new astar.AStar();
            this.FindPath.setHeurisitic(this.FindPath.diagonal);
            var result = this.FindPath.findPath(grid);
            var path = this.FindPath._path;
            if(!path) return;
            this.movestep = 0;

            for(var i=0; i <this.FindPath._path.length; i++)
            {
                this.m_Dx[i] = this.FindPath._path[i].x;
                this.m_Dy[i] = this.FindPath._path[i].y;
            }
            
            for(var j=1; j <this.FindPath._path.length; j++){
                this.m_dx[j-1] = this.m_Dx[j] - this.m_Dx[j-1];
                this.m_dy[j-1] = this.m_Dy[j] - this.m_Dy[j-1];
            }
            
        }

        public onTicker(duringTime) 
        {
            if (!this.FindPath._path){
                return;
            }
            
           this.timer -= duringTime;
            if(this.timer <= 0){
                if(this.x >= 0 && this.x < this.NUM_COLS * GRID_PIXEL_WIDTH && this.y >= 0 && this.y < this.NUM_ROWS * GRID_PIXEL_HEIGHT){
                    if(this.FindPath != null && this.movestep < this.FindPath._path.length - 1){
                        this.x += this.m_dx[this.movestep]*GRID_PIXEL_WIDTH;
                        this.y += this.m_dy[this.movestep]*GRID_PIXEL_HEIGHT;
                        this.movestep++;
                    }      
                }
                this.timer = this.movingTime; 
            }
        }
        
    }
    export class ControlPanel extends render.DisplayObjectContainer {
        
        constructor(){
            super();
            var button = new ui.Button();
            button.text = "Hello";
            button.width = 100;
            button.height = 50;
            this.addChild(button);
            button.onClick = ()=> {
                alert(111);
            }
        }
        
    }
}
