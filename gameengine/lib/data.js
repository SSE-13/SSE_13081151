var fs = require("fs");
var data;
(function (data) {
    data.NUM_LAYERS = 2;
    data.ASSETS_PATH = __dirname + "\\assets\\";
    data.MAP_EXTENSION = ".json";
    var Storage = (function () {
        function Storage(height, width, name) {
            this.TILE_WIDTH = 32;
            this.TILE_HEIGHT = 32;
            this.height = height;
            this.width = width;
            this.name = name;
            this.layers = new Array(data.NUM_LAYERS);
            for (var i = 0; i < data.NUM_LAYERS; i++) {
                this.layers[i] = new Array(width);
                for (var col = 0; col < width; col++) {
                    this.layers[i][col] = new Array(height);
                    for (var row = 0; row < height; row++) {
                        this.layers[i][col][row] = 0;
                    }
                }
            }
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage(this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT, "map");
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function () {
            var map_path = data.ASSETS_PATH + this.name + data.MAP_EXTENSION;
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.layers[0] = obj.layer0;
            this.layers[1] = obj.layer1;
            this.layers[2] = obj.layer2;
            this.height = obj.height;
            this.width = obj.width;
        };
        Storage.prototype.saveFile = function () {
            console.log(this.layers);
            var map_path = data.ASSETS_PATH + this.name + data.MAP_EXTENSION;
            var json = "{\"height\":" + JSON.stringify(this.height) + ","
                + "\"width\":" + JSON.stringify(this.width) + ","
                + "\"layer0\":" + JSON.stringify(this.layers[0]) + ","
                + "\"layer1\":" + JSON.stringify(this.layers[1]) + "}";
            console.log(map_path);
            console.log(json);
            fs.writeFileSync(map_path, json, "utf-8");
        };
        Storage.DEFAULT_WIDTH = 5;
        Storage.DEFAULT_HEIGHT = 5;
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
