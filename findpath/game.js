var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GRID_PIXEL_WIDTH = 50;
    var GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 12;
    var NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(0, 3, false);
            grid.setWalkable(1, 0, false);
            grid.setWalkable(1, 1, false);
            grid.setWalkable(1, 3, false);
            grid.setWalkable(2, 3, false);
            grid.setWalkable(2, 5, false);
            grid.setWalkable(3, 5, false);
            grid.setWalkable(3, 6, false);
            grid.setWalkable(4, 5, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 5, false);
        }
        WorldMap.prototype.render = function (context) {
            context.strokeStyle = '#3d80c4';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if (!this.grid.getNode(i, j).walkable) {
                        context.fillRect((i + 1) * GRID_PIXEL_WIDTH, (j + 1) * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
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
        };
        return WorldMap;
    }(DisplayObject));
    game.WorldMap = WorldMap;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.apply(this, arguments);
        }
        BoyShape.prototype.render = function (context) {
            context.beginPath();
            context.fillStyle = '#6e0d0d';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        };
        return BoyShape;
    }(DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.Dx = new Array();
            this.Dy = new Array();
            this.dx = new Array();
            this.dy = new Array();
            this.movestep = 1;
        }
        BoyBody.prototype.run = function (grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(11, 11);
            this.FindPath = new astar.AStar();
            this.FindPath.setHeurisitic(this.FindPath.diagonal);
            var result = this.FindPath.findPath(grid);
            var path = this.FindPath._path;
            for (var i = 0; i < this.FindPath._path.length; i++) {
                this.Dx[i] = this.FindPath._path[i].x;
                this.Dy[i] = this.FindPath._path[i].y;
                console.log("(" + this.Dx[i] + "," + this.Dy[i] + ")");
            }
            for (var j = 1; j < this.FindPath._path.length; j++) {
                this.dx[j] = this.Dx[j] - this.Dx[j - 1];
                this.dy[j] = this.Dy[j] - this.Dy[j - 1];
                console.log(this.dx[j] + "  " + this.dy[j]);
            }
            console.log(path);
            console.log(grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            if (this.x < NUM_ROWS * GRID_PIXEL_WIDTH && this.y < NUM_COLS * GRID_PIXEL_HEIGHT) {
                if (this.movestep < this.FindPath._path.length - 1) {
                    this.x += this.dx[this.movestep] * GRID_PIXEL_WIDTH;
                    this.y += this.dy[this.movestep] * GRID_PIXEL_HEIGHT;
                    this.movestep++;
                    console.log("movestep:" + this.movestep);
                    console.log(this.dx[this.movestep] + "  " + this.dy[this.movestep]);
                }
            }
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
})(game || (game = {}));
var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
body.vx = 15;
body.vy = 15;
var renderCore = new RenderCore();
renderCore.start([world, boyShape]);
var ticker = new Ticker();
ticker.start([body]);
