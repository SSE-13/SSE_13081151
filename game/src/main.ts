

function CreateBackgound(layerData){
    var world = new editor.WorldMap();
    var rows= layerData.length;
    var cols= layerData[0].length;
    
    for(var col =0;col<cols;col++){
       for(var row=0;row<cols;row++){
           var tile = new editor.Tile();
          
           tile.SetBackground(storage.m_layer0[row][col]);
           tile.x = col * editor.GRID_PIXEL_WIDTH;
           tile.y = row * editor.GRID_PIXEL_HEIGHT
           tile.ownedCol = col;
           tile.ownedRow = row;
           tile.width = editor.GRID_PIXEL_WIDTH;
           tile.height = editor.GRID_PIXEL_HEIGHT;
           world.addChild(tile);
       }
    }
    return world;
}

function CreateLayer1(layerData){
    var world = new editor.WorldMap();
    var rows= layerData.length;
    var cols= layerData[0].length;
    
    for(var col =0;col<cols;col++){
       for(var row=0;row<cols;row++){
           var tile = new editor.Tile();
          
           tile.setWalkable(storage.m_layer1[row][col]);
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
   m_PlayerBehavior.SetStart(m_Player.x/32,m_Player.y/32);
   m_PlayerBehavior.SetEnd(tile.ownedCol,tile.ownedRow);
   m_PlayerBehavior.run(layer1.grid);
   console.log(tile);
}

var storage = data.Storage.getInstance();
var m_Player=new render.Bitmap();
var layer0 ;
var layer1 ;
m_Player.source="8.png";
var m_PlayerBehavior=new editor.BoyBody(m_Player);

var onLoadSuccess=() =>{
    layer0 = CreateBackgound(storage.m_layer0);
    layer1 = CreateLayer1(storage.m_layer1);
    stage.addChild(layer0);
    stage.addChild(layer1);
    stage.addChild(m_Player);
}
storage.GetJson(onLoadSuccess);

var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();

var stage = new render.DisplayObjectContainer();
renderCore.start(stage,["0.png", "9.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png"]);

var ticker = new Ticker();
ticker.start([m_PlayerBehavior]);