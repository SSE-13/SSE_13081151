var fs = require("fs");
var data;
(function (data) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function () {
            var map_path = __dirname + "/map.json";
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        };
        Storage.prototype.saveFile = function () {
            console.log(this.mapData);
            var map_path = __dirname + "/map.json";
            var json = "{\"map\":" + JSON.stringify(this.mapData) + "}";
            fs.writeFileSync(map_path, json, "utf-8");
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
