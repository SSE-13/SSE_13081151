module game {


    const GRID_PIXEL_WIDTH = 32;

    const GRID_PIXEL_HEIGHT = 32;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;
    

    export class WorldMap extends render.DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
       
            
        }

        render(context: CanvasRenderingContext2D) {
            context.strokeStyle = '#3d80c4';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                   
                    if(!this.grid.getNode(i,j).walkable){
                        context.fillRect((i+1) * GRID_PIXEL_WIDTH, (j+1) * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        //context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fillStyle = '#000000';
                    }
                    else {
                        context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fillStyle = '#f9d268';
                    }
                    context.fill();
                    context.stroke();
                 } 
            }
            context.closePath();

        }

    }   
      export class BoyShape extends render.DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#6e0d0d';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

 export class BoyBody extends Body {

        public FindPath : astar.AStar; 
        public Dx = new Array();
        public Dy = new Array();
        public dx = new Array();
        public dy = new Array();
        public movestep = 1;
        public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(11, 11);
            this.FindPath = new astar.AStar();
            this.FindPath.setHeurisitic(this.FindPath.diagonal);
            var result = this.FindPath.findPath(grid);
            var path = this.FindPath._path;
            for(var i=0; i <this.FindPath._path.length; i++)
            {
                this.Dx[i] = this.FindPath._path[i].x;
                this.Dy[i] = this.FindPath._path[i].y;
                console.log("("+this.Dx[i]+","+this.Dy[i]+")");
            }
            for(var j=1; j <this.FindPath._path.length; j++){
                this.dx[j] = this.Dx[j] - this.Dx[j-1];
                this.dy[j] = this.Dy[j] - this.Dy[j-1];
                console.log(this.dx[j]+"  "+this.dy[j]);
            }
            console.log(path);
            console.log(grid.toString());

        }

        public onTicker(duringTime) {
            if(this.x < NUM_ROWS * GRID_PIXEL_WIDTH && this.y < NUM_COLS * GRID_PIXEL_HEIGHT){
                if(this.movestep < this.FindPath._path.length-1){
                   this.x += this.dx[this.movestep]*GRID_PIXEL_WIDTH;
                   this.y += this.dy[this.movestep]*GRID_PIXEL_HEIGHT;
                   this.movestep++;
                   console.log("movestep:"+this.movestep);
                   console.log(this.dx[this.movestep]+"  "+this.dy[this.movestep]);
                }       
            }       
        }
        
    }
}


/*var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
body.vx = 15;
body.vy = 15;


var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);
*/