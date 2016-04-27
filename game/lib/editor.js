var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 32;
    editor.GRID_PIXEL_HEIGHT = 32;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap(cols, rows) {
            _super.call(this);
            this.isDirty = true;
            this.NUM_ROWS = 12;
            this.NUM_COLS = 12;
            this.NUM_COLS = cols;
            this.NUM_ROWS = rows;
            var grid = new astar.Grid(this.NUM_COLS, this.NUM_ROWS);
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            this.grid = grid;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        WorldMap.prototype.SetNUM_COLS = function (value) {
            this.NUM_COLS = value;
        };
        WorldMap.prototype.SetNUM_ROWS = function (value) {
            this.NUM_ROWS = value;
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this);
        }
        Tile.prototype.setImage = function (value) {
            this.source = value;
        };
        return Tile;
    }(render.Bitmap));
    editor.Tile = Tile;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.FindPath = new astar.AStar();
            this.movingTime = 0.35;
            this.timer = this.movingTime;
            this.m_Dx = new Array();
            this.m_Dy = new Array();
            this.m_dx = new Array();
            this.m_dy = new Array();
            this.m_Endx = 0;
            this.m_Endy = 0;
            this.m_Startx = 0;
            this.m_Starty = 0;
            this.movestep = 1;
            this.NUM_COLS = 12;
            this.NUM_ROWS = 12;
        }
        BoyBody.prototype.SetEnd = function (x, y) {
            this.m_Endx = x;
            this.m_Endy = y;
        };
        BoyBody.prototype.SetStart = function (x, y) {
            this.m_Startx = x;
            this.m_Starty = y;
        };
        BoyBody.prototype.SetNUM_COLS = function (value) {
            this.NUM_COLS = value;
        };
        BoyBody.prototype.SetNUM_ROWS = function (value) {
            this.NUM_ROWS = value;
        };
        BoyBody.prototype.run = function (grid) {
            grid.setStartNode(this.m_Startx, this.m_Starty);
            grid.setEndNode(this.m_Endx, this.m_Endy);
            this.FindPath = new astar.AStar();
            this.FindPath.setHeurisitic(this.FindPath.diagonal);
            var result = this.FindPath.findPath(grid);
            var path = this.FindPath._path;
            if (!path)
                return;
            this.movestep = 0;
            for (var i = 0; i < this.FindPath._path.length; i++) {
                this.m_Dx[i] = this.FindPath._path[i].x;
                this.m_Dy[i] = this.FindPath._path[i].y;
            }
            for (var j = 1; j < this.FindPath._path.length; j++) {
                this.m_dx[j - 1] = this.m_Dx[j] - this.m_Dx[j - 1];
                this.m_dy[j - 1] = this.m_Dy[j] - this.m_Dy[j - 1];
            }
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            if (!this.FindPath._path) {
                return;
            }
            this.timer -= duringTime;
            if (this.timer <= 0) {
                if (this.x >= 0 && this.x < this.NUM_COLS * editor.GRID_PIXEL_WIDTH && this.y >= 0 && this.y < this.NUM_ROWS * editor.GRID_PIXEL_HEIGHT) {
                    if (this.FindPath != null && this.movestep < this.FindPath._path.length - 1) {
                        this.x += this.m_dx[this.movestep] * editor.GRID_PIXEL_WIDTH;
                        this.y += this.m_dy[this.movestep] * editor.GRID_PIXEL_HEIGHT;
                        this.movestep++;
                    }
                }
                this.timer = this.movingTime;
            }
        };
        return BoyBody;
    }(Body));
    editor.BoyBody = BoyBody;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel() {
            _super.call(this);
            var button = new ui.Button();
            button.text = "Hello";
            button.width = 100;
            button.height = 50;
            this.addChild(button);
            button.onClick = function () {
                alert(111);
            };
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
