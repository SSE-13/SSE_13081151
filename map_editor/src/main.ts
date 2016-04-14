
import * as fs from 'fs';



function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}

function writeFile(mapData:editor.WorldMap)
{
    var path = __dirname + "/map.json";
    var json = "{\"map\":" + JSON.stringify(mapData) + "}";
    
    fs.writeFileSync(path, json, "utf-8");
}

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
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

function reloadMap(world:editor.WorldMap)
{
    var rows = world.width / editor.GRID_PIXEL_WIDTH;
    var cols = world.height / editor.GRID_PIXEL_HEIGHT;
    
    for(var col = 0; col < cols; col++){
        for(var row = 0; row < rows; row++){
            world.children[row][col].setWalkable()
        }
    }
}



function onTileClick(tile: editor.Tile) {
    tile.setWalkable(!tile.getWalkable());
    mapData[tile.ownedRow][tile.ownedCol] = tile.getWalkable() ? 1 : 0;
}

function HitTest(localPoint: math.Point, displayObject: render.DisplayObject):boolean{
     if(localPoint.x > 0 && localPoint.x < displayObject.width && localPoint.y>0 && localPoint.y< displayObject.height ){
        return true;
     } else {
        return false;
    }
}
function OnSave(displayObject: render.DisplayObject) :void{
    if(HitTest){
        writeFile(mapData);
        console.log("Map saved");
    }
}


function OnLoad(displayObject: render.DisplayObject) :void{
    if(HitTest){
        mapData = readFile();
        var newMap = editor.children;
        
        var rows = mapData.length;
        var cols = mapData[0].length;
        
        for(var col = 0; col < cols;col++){
            for(var row = 0; row < rows; row++)
            {
                editor.children[cols * col + row].setWalkable(mapData[row][col]);
            }
        }
        
        console.log("Map loaded");
    }
}

var mapData = readFile();


var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();


var editor = createMapEditor();

var m_Canvas =  new render.DisplayObjectContainer();

var m_SaveBtnBG =new render.Rect();
m_SaveBtnBG.x=25;
m_SaveBtnBG.y=210;
m_SaveBtnBG.width = 75;
m_SaveBtnBG.height=25;

var m_SaveButton = new render.TextField("Save", 50, 20);
m_SaveButton.x = 40;
m_SaveButton.y = 210;

var m_LoadBtnBG = new render.Rect();
m_LoadBtnBG.x = 105;
m_LoadBtnBG.y = 210;
m_LoadBtnBG.width = 75;
m_LoadBtnBG.height = 25;

var m_LoadButton = new render.TextField("Load", 50, 20);
m_LoadButton.x = 115;
m_LoadButton.y = 210;

m_Canvas.addChild(m_LoadBtnBG);
m_Canvas.addChild(m_LoadButton);

m_Canvas.addChild(m_SaveBtnBG);
m_Canvas.addChild(m_SaveButton);
m_Canvas.addChild(editor);

renderCore.start(m_Canvas);

eventCore.register(m_SaveBtnBG, HitTest, OnSave);
eventCore.register(m_LoadBtnBG, HitTest, OnLoad);