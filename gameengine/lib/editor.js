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
        function WorldMap(id) {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.id = id;
            this.cache.width = 400;
            this.cache.height = 400;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(id, row, col, tileWidth, tileHeight, source, x, y, isMapTile, walkable) {
            _super.call(this);
            this.walkable = true;
            this.isSelected = false;
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
        Object.defineProperty(Tile.prototype, "sx", {
            set: function (value) {
                this._sx = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "sy", {
            set: function (value) {
                this._sy = value;
            },
            enumerable: true,
            configurable: true
        });
        Tile.prototype.setWalkable = function (value) {
            this.walkable = value;
        };
        Tile.prototype.getWalkable = function () {
            return this.walkable;
        };
        Tile.prototype.setSelected = function (value) {
            this.isSelected = value;
        };
        Tile.prototype.setTileAttributes = function (tile) {
            this.id = tile.id;
            this._sx = tile._sx;
            this._sy = tile._sy;
            this.source = tile.source;
            this.width = tile.width;
            this.height = tile.height;
        };
        Tile.prototype.render = function (context) {
            var image = render.getImage((this.id == -1 && !this.isCollisionTile) ? __dirname + "\\assets\\0.png" : this.source);
            if (image) {
                if (this.id == -1) {
                    context.drawImage(image, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
                }
                else {
                    context.globalAlpha = 1;
                    context.drawImage(image, this._sx * this.width, this._sy * this.height, this.width, this.height, 0, 0, this.width, this.height);
                    if (!this.isMapTile) {
                        context.strokeStyle = "#000000";
                        context.strokeRect(0, 0, this.width, this.height);
                        if (this.isSelected) {
                            context.globalAlpha = 0.5;
                            context.fillStyle = "#ff0000";
                            context.fillRect(0, 0, this.width, this.height);
                        }
                    }
                }
            }
        };
        return Tile;
    }(render.Bitmap));
    editor.Tile = Tile;
    var Tileset = (function (_super) {
        __extends(Tileset, _super);
        function Tileset(firstID, source, tileW, tileH, imageW, imageH) {
            _super.call(this);
            this.strokeColor = "#000000";
            this.source = source;
            this.firstID = firstID;
            this.imageHeight = imageH;
            this.imageWidth = imageW;
            this.tileHeight = tileH;
            this.tileWidth = tileW;
            this.numCols = Math.floor(imageW / tileW);
            this.numRows = Math.floor(imageH / tileH);
            this.lastID = this.numCols * this.numRows;
            ;
            this.tiles = new Array(this.numCols);
            var id = firstID;
            for (var row = 0; row < this.numRows; row++) {
                this.tiles[row] = new Array(this.numCols);
                for (var col = 0; col < this.numCols; col++) {
                    var x = col * this.tileWidth;
                    var y = row * this.tileHeight;
                    this.tiles[row][col] = new Tile(id++, row, col, this.tileWidth, this.tileHeight, this.source, x, y, false);
                }
            }
        }
        Tileset.prototype.render = function (context) {
            var image = render.getImage(this.source);
            if (image) {
                for (var row = 0; row < this.numRows; row++) {
                    for (var col = 0; col < this.numCols; col++) {
                        var tile = this.tiles[row][col];
                        var sy = Math.floor(tile.id / this.numCols);
                        var sx = tile.id - (this.numCols * sy);
                        tile.sy = sy;
                        tile.sx = sx;
                        tile.draw(context);
                        this.addChild(tile);
                    }
                }
            }
            else {
                context.font = "14px Arial";
                context.fillStyle = '#000000';
                context.fillText('Invalid image URL', 0, 20);
            }
        };
        return Tileset;
    }(render.DisplayObjectContainer));
    editor.Tileset = Tileset;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel() {
            _super.apply(this, arguments);
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
