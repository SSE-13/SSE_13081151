
module editor {


    export const GRID_PIXEL_WIDTH = 32;

    export const GRID_PIXEL_HEIGHT = 32;
    
    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;
        
        public grid: astar.Grid;
        public isDirty = true;
        
        constructor() {

            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            this.grid = grid;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
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
        
         m_point_x = new Array();
         m_point_y = new Array();
         m_speed = 1;  
         t = 1;
         m_dx=0;
         m_dy=0;
         m_position = 0;
         
         public m_Endx=0;
         public m_Endy=0;
         public m_Startx=0;
         public m_Starty=0;
        
          public SetEnd(x:number,y:number){
            this.m_Endx=x;
            this.m_Endy=y;         
        } 
         public SetStart(x:number,y:number){
            this.m_Startx=x;
            this.m_Starty=y;         
        }
        public run(grid) {
            grid.setStartNode(this.m_Startx,this.m_Startx);
            grid.setEndNode(this.m_Endx,this.m_Endy);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
           if(path == null) return;
            for(var i: number = 0; i < path.length; i++){
            this.m_point_x[i] = path[i].x;
            this.m_point_y[i] = path[i].y;
            console.log(this.m_point_x[i],this.m_point_y[i]);
        }    
     }

        public onTicker(duringTime) {
            
            if(this.x >= 0 && this.x <= NUM_ROWS*GRID_PIXEL_WIDTH && this.y >= 0 && this.y <= NUM_COLS*GRID_PIXEL_HEIGHT){
                if(this.m_position <= this.m_point_y.length){
                    this.m_dx = (this.m_point_x[this.m_position+1]-this.m_point_x[this.m_position]);
                    this.m_dy = (this.m_point_y[this.m_position+1]-this.m_point_y[this.m_position]);
                    var distance =  Math.sqrt(this.m_dx*this.m_dx + this.m_dy*this.m_dy) ;
                    this.t = distance/this.m_speed;
                    if(this.m_dx >0){
                        this.vx=this.t*this.m_speed;
                    }else{
                        this.vx=this.t*this.m_speed*-1;
                    }
                    if(this.m_dy >0){
                        this.vy=this.t*this.m_speed;
                    }else{
                        this.vy=this.t*this.m_speed*-1;
                    }
               
               console.log(distance);       
                    if(distance>1){
                        this.x += this.vx * duringTime ;
                        this.y += this.vy * duringTime;
                    }else{
                        this.m_position +=1;
                    }
                    
                }
                
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
