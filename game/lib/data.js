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
        Storage.prototype.GetJson = function (callback) {
            var m_jsonfile = new XMLHttpRequest();
            m_jsonfile.open("GET", "lib/map.json", true);
            m_jsonfile.onreadystatechange = function () {
                if (m_jsonfile.readyState == 4 && m_jsonfile.status == 200) {
                    var obj = JSON.parse(m_jsonfile.responseText);
                    Storage._instance.m_Height = obj.height;
                    Storage._instance.m_Width = obj.width;
                    Storage._instance.m_NumLayers = obj.numLayers;
                    Storage._instance.m_CollisionLayer = obj.numLayers - 1;
                    Storage._instance.m_Layers = new Array(Storage._instance.m_NumLayers);
                    for (var i = 0; i < obj.numLayers; i++) {
                        Storage._instance.m_Layers[i] = obj.layers[i];
                    }
                    callback();
                }
            };
            m_jsonfile.send();
        };
        Storage.prototype.saveFile = function () {
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
