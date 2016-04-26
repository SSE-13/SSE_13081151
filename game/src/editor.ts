
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

    public SetBackground(value:number){
        this.source="9.png";
    }
    
     public setWalkable(value:number) {
         this.source = value + ".png";
     }
    }
    
    
     export class BoyBody extends Body {

         m_point_x = new Array();
         m_point_y = new Array();
         m_speed = 2;  
         m_position = 0;
         m_vx=0;
         m_vy=0;
        public m_Endx=0;
        public m_Endy=0;
        public m_Startx=0;
        public m_Starty=0;
        
        public run(grid:astar.Grid) {
            grid.setStartNode(this.m_Startx,this.m_Startx);
            grid.setEndNode(this.m_Endx,this.m_Endy);
            
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.manhattan);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            for(var i: number = 0; i < path.length; i++){
            this.m_point_x[i] = path[i].x;
            this.m_point_y[i] = path[i].y;
            console.log( path[i].x,path[i].y);

        }

        }
        
        public SetEnd(x:number,y:number){
            this.m_Endx=x;
            this.m_Endy=y;         
        } 
         public SetStart(x:number,y:number){
            this.m_Endx=x;
            this.m_Endy=y;         
        }
        
        public onTicker(duringTime) {
           if(this.m_position < this.m_point_y.length){ 
               var m_dx=Math.abs(this.x - this.m_point_x[this.m_position+1] *GRID_PIXEL_WIDTH);
               var m_dy=Math.abs(this.y - this.m_point_y[this.m_position+1] *GRID_PIXEL_WIDTH);
                      
                if(m_dx<0.3 || m_dy<0.3){  
                    if(this.m_point_x[this.m_position+1]-this.m_point_x[this.m_position]>0){
                        this.m_vx=this.m_speed;
                    }else if(this.m_point_x[this.m_position+1]-this.m_point_x[this.m_position]<0){
                        this.m_vx=this.m_speed*-1;
                    }else if(this.m_point_x[this.m_position+1]-this.m_point_x[this.m_position]==0){
                        this.m_vx=0;
                    }
                    if(this.m_point_y[this.m_position+1]-this.m_point_y[this.m_position]>0){
                        this.m_vy=this.m_speed;
                    }else if(this.m_point_y[this.m_position+1]-this.m_point_y[this.m_position]<0){
                        this.m_vy=this.m_speed*-1;
                    }else if(this.m_point_y[this.m_position+1]-this.m_point_y[this.m_position]==0){
                        this.m_vy=0;
                    }
                    
                    this.x += this.m_vx * duringTime ;
                    this.y += this.m_vy * duringTime;
                 }else{
                    this.m_position++;
                    console.log("position"+ this.m_position);
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
