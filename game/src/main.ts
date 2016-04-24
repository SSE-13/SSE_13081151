

function CreateMap(layerData){
    var world = new editor.WorldMap();
    var rows= layerData.length;
    var cols= layerData[0].length;
    
    for(var col =0;col<cols;col++){
       for(var row=0;row<cols;row++){
           var tile = new editor.Tile();
           var data = layerData[row][col];
                 
           var walkable = data > 0 ? 1 : 0;
           tile.setWalkable(walkable);
           tile.x = col * editor.GRID_PIXEL_WIDTH;
           tile.y = row * editor.GRID_PIXEL_HEIGHT
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

function onTileClick(tile: editor.Tile) {
    console.log(tile);
}

var storage = data.Storage.getInstance();

var  mapEditor;

var onLoadSuccess=() =>{
    mapEditor = CreateMap(storage.m_layer0);
    var layer1 = CreateMap(storage.m_layer1);
    stage.addChild(mapEditor);
    stage.addChild(layer1);
    layer1.x = 100;
    layer1.y = 210;
}
storage.GetJson(onLoadSuccess);

var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();

var stage = new render.DisplayObjectContainer();
renderCore.start(stage);
    
//var panel = new editor.ControlPanel();
//panel.x = 300;
//stage.addChild(panel);


