function CreateInit(width, height) {
    var world = new editor.WorldMap();
    for (var row = 0; row < width; col++) {
        for (var col = 0; col < height; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(m_layer1[row][col]);
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
}
function CreateMap() {
}
function onTileClick(tile) {
    console.log(tile);
}
var storage = data.Storage.getInstance();
var m_layer0;
var m_layer1;
var m_height;
var m_width;
var mapEditor;
var onLoadSuccess = function () {
    m_layer0 = storage.m_layer0;
    m_layer1 = storage.m_layer1;
    m_height = storage.m_height;
    m_width = storage.m_width;
    mapEditor = CreateInit(m_width, m_height);
    stage.addChild(mapEditor);
};
storage.GetJson(onLoadSuccess);
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var stage = new render.DisplayObjectContainer();
renderCore.start(stage);
//var panel = new editor.ControlPanel();
//panel.x = 300;
//stage.addChild(panel);
