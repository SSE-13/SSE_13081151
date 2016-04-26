function CreateBackgound(layerData) {
    var world = new editor.WorldMap();
    var rows = layerData.length;
    var cols = layerData[0].length;
    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.SetBackground(storage.m_layer0[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
        }
    }
    return world;
}
function CreateLayer1(layerData) {
    var world = new editor.WorldMap();
    var rows = layerData.length;
    var cols = layerData[0].length;
    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(storage.m_layer1[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
function onTileClick(tile) {
    console.log(tile);
}
var storage = data.Storage.getInstance();
var m_Player = new render.Bitmap();
var onLoadSuccess = function () {
    var layer0 = CreateBackgound(storage.m_layer0);
    var layer1 = CreateLayer1(storage.m_layer1);
    stage.addChild(layer0);
    stage.addChild(layer1);
    //   body.run(layer1.;
};
storage.GetJson(onLoadSuccess);
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
//var body = new game.BoyBody(m_Player);
var stage = new render.DisplayObjectContainer();
renderCore.start(stage, ["grass.png", "water.png", "box.png", "bridge.png", "barrier.png", "null.png"]);
