var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 50;
    editor.GRID_PIXEL_HEIGHT = 50;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var imgTile = (function (_super) {
        __extends(imgTile, _super);
        function imgTile() {
            _super.call(this);
            this.walkable = true;
        }
        imgTile.prototype.setWalkable = function (value) {
            this.walkable = value;
        };
        imgTile.prototype.setImage = function (value) {
            this.source = value;
        };
        imgTile.prototype.getImage = function () {
            return this.source;
        };
        imgTile.prototype.getWalkable = function () {
            return this.walkable;
        };
        return imgTile;
    }(render.Bitmap));
    editor.imgTile = imgTile;
    /*
        export class Tile extends render.Rect {
    
    
            public ownedRow: number;
            public ownedCol: number;
            private walkable: boolean = true;
    
            constructor() {
                super();
            }
    
            public setWalkable(value) {
                this.walkable = value;
                this.color = value ? "#0000FF" : "#FF0000";
            }
            
            public setImage(value)
            {
                
            }
            
            public getWalkable()
            {
                return this.walkable;
            }
        }
        */
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel() {
            _super.apply(this, arguments);
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
