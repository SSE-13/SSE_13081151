

function CreateMap(layerData, collisionData){
    var world = new Array(storage.m_Num_Layers);
    var rows= layerData.length;
    var cols= layerData[0].length;
    
    for(var i = 0; i< storage.m_Num_Layers; i++){
        world[i] = new editor.WorldMap();
        for(var row =0;row<cols;row++){
            for(var col =0;col<cols;col++){
                
                if(i == storage.m_CollisionLayer){
                    world[i].grid.setWalkable(col,row,collisionData[row][col]);
                }else{
                    var tile = new editor.Tile();
                    tile.setImage(storage.m_Layers[i][row][col]+".png");
                    
                    
                    tile.x = col * editor.GRID_PIXEL_WIDTH;
                    tile.y = row * editor.GRID_PIXEL_HEIGHT
                    tile.ownedCol = col;
                    tile.ownedRow = row;
                    tile.width = editor.GRID_PIXEL_WIDTH;
                    tile.height = editor.GRID_PIXEL_HEIGHT;
                    
                    world[i].addChild(tile);
                    
                    eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
                }
            }
        }
    }
    return world;
}
     
 
function onTileClick(tile: editor.Tile) {
   m_PlayerBehavior.SetStart(m_Player.x/32,m_Player.y/32);
   m_PlayerBehavior.SetEnd(tile.ownedCol,tile.ownedRow);
   m_PlayerBehavior.run(layers[storage.m_CollisionLayer].grid);
   console.log(tile);
}

var storage = data.Storage.getInstance();
var m_Player=new render.Bitmap();
var layers = new Array(storage.m_Num_Layers);

m_Player.source="8.png";
var m_PlayerBehavior=new editor.BoyBody(m_Player);

var onLoadSuccess=() =>{
    layers = CreateMap(storage.m_Layers[1], storage.m_Layers[storage.m_CollisionLayer]);
    
    layers.forEach(layer => {
        stage.addChild(layer);
    });
    
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
