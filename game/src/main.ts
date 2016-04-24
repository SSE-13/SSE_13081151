

function CreateMap(){
    var world = new editor.WorldMap();
    var rows= m_layer1.length;
    var cols= m_layer1[0].length;
    
    for(var row =0;row<rows;row++){
       for(var col=0;col<cols;col++){
           var tile = new editor.Tile();
           tile.setWalkable(m_layer1[row][col]);
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
}

function onTileClick(tile: editor.Tile) {
    console.log(tile);
}

var storage = data.Storage.getInstance();
var  m_layer0;
var  m_layer1;

var  mapEditor;

var onLoadSuccess=() =>{
    m_layer0=storage.m_layer0;
    m_layer1=storage.m_layer1;
    mapEditor = CreateMap();
    stage.addChild(mapEditor);
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


