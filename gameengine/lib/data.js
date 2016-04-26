var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require("fs");
var data;
(function (data) {
    data.NUM_LAYERS = 3;
    data.ASSETS_PATH = __dirname + "\\assets\\";
    data.MAP_EXTENSION = ".json";
    var Map = (function () {
        function Map(height, width, name) {
            //private static _instance: Map;
            this.DEFAULT_WIDTH = 5;
            this.DEFAULT_HEIGHT = 5;
            this.height = height ? height : this.DEFAULT_HEIGHT;
            this.width = width ? width : this.DEFAULT_WIDTH;
            this.name = name ? name : "map";
            //this.layers = new Array(NUM_LAYERS); 
            for (var col = 0; col < width; col++) {
                mapData =
                ;
                for (var row = 0; row < height; row++) {
                }
            }
        }
        Map.prototype.readFile = function () {
            var map_path = data.ASSETS_PATH + this.name + data.MAP_EXTENSION;
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
            console.log(obj.height);
        };
        Map.prototype.saveFile = function () {
            console.log(this.mapData);
            var map_path = data.ASSETS_PATH + this.name + data.MAP_EXTENSION;
            var json = "{\"map\":" + JSON.stringify(this.mapData) + "}";
            fs.writeFileSync(map_path, json, "utf-8");
        };
        return Map;
    }());
    data.Map = Map;
    var Tileset = (function (_super) {
        __extends(Tileset, _super);
        function Tileset() {
            _super.call(this);
        }
        Tileset.prototype.setTileset = function (width, height, tileWidth, tileHeight, name, source) {
            this._height = height;
            this._width = width;
            this.tileHeight = tileHeight;
            this.tileWidth = tileWidth;
            this.source = source;
            this.name = name;
            this.numTilesInRow = Math.floor(width / tileWidth);
        };
        Tileset.prototype.getTile = function (col, row) {
            return;
        };
        return Tileset;
    }(render.Bitmap));
    data.Tileset = Tileset;
})(data || (data = {}));
