
import * as fs from 'fs';


const ASSETS_PATH = __dirname + "\\assets\\";
const SAVE_BTN_PATH = ASSETS_PATH + "Save.png";
const CANCEL_BTN_PATH = ASSETS_PATH + "Cancel.png";
const EMPTY_TILE_PATH = ASSETS_PATH + "emptyTile.png";

var m_Undolength =0;
var m_Undo = new Array(4);
var m_CurrentTile = 0;
//var m_RecordTile =  new editor.Tile;

for(var i=0;i<3;i++)
{
    m_Undo[i] = new Array();
}

//================================================================= Initialization =================================================================//
//Render Elements
var m_Stage;
var m_Panel;
var m_RenderCore;
var m_MapEditor;

//Buttons
var m_SaveBtn;
var m_UndoBtn;

//Editor Elements
var m_EventCore = events.EventCore.getInstance();
m_EventCore.init();

var m_Map = new data.Map(10, 8,"map");
var m_MapData;

 //m_MapEditor = createMapEditor();
onCreateMap();
Start();

//==============================================================================================================================================//
//================================================================= Functions ==================================================================//
//==============================================================================================================================================//



function Start()
{    
    m_Panel = new editor.ControlPanel();
    m_Panel.x = 300; 
 
    InitUI();
    
    m_Stage = new render.DisplayObjectContainer();   
    m_Stage.addChild(m_MapEditor);
    m_Stage.addChild(m_Panel);
    m_Stage.addChild(m_SaveBtn);
    m_Stage.addChild(m_UndoBtn);
    
    m_RenderCore = new render.RenderCore();
    m_RenderCore.start(m_Stage);
    m_RenderCore.start(m_Stage, [SAVE_BTN_PATH, EMPTY_TILE_PATH, CANCEL_BTN_PATH]);
}



function InitUI()
{
    //Save button
    m_SaveBtn = new render.Bitmap();
    m_SaveBtn.width = 50;
    m_SaveBtn.height = 50;
    m_SaveBtn.source = SAVE_BTN_PATH;
    m_SaveBtn.x = 350;
    m_SaveBtn.y=0;
    
    //Undo Button
    m_UndoBtn =new render.Bitmap();
    m_UndoBtn.width = 50;
    m_UndoBtn.height = 50;
    m_UndoBtn.source = CANCEL_BTN_PATH;
    m_UndoBtn.x = 350;
    m_UndoBtn.y = 55;
    
    m_EventCore.register(m_SaveBtn, HitTest, onSaveClick);
    m_EventCore.register(m_UndoBtn, HitTest, onCancelClick);
}

//================================================================= Read Map File ==================================================================//
function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var m_MapData = obj.map;
    console.log(obj.height);
    console.log(obj.width);
    return m_MapData;
}

//================================================================= Save Map File ==================================================================//

//================================================================= Undo Operation ==================================================================//
function UndoTile() {
    if(m_Undolength<=0){ 
        alert("Ended");
        return;
    }
    else{
        var new_row=m_Undo[0][m_Undolength-1];
        var new_col=m_Undo[1][m_Undolength-1];
        m_MapData[new_row][new_col]= m_Undo[2][m_Undolength-1];
        m_Undolength--;
        //m_RecordTile.setWalkable(m_MapData[new_row][new_col]);
   }
}

//================================================================= Create New Map ==================================================================//
function createNewMap(width, height, tileWidth, tileHeight)
{
    var map = new editor.WorldMap();
    
    for(var col = 0; col < width; col++)
    {
        for(var row = 0; row < height; row++)
        {
            var tile = new editor.Tile();
            tile.setWalkable(true);
            tile.source = EMPTY_TILE_PATH;
            tile.x = col * tileWidth;
            tile.y = row * tileHeight;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = tileWidth;
            tile.height = tileHeight;
            map.addChild(tile);
                        
            m_EventCore.register(tile, HitTest, onMapTileClick);            
        }        
    }
    
    return map;
}

//Hit test function
function HitTest (localPoint:math.Point,displayObject:render.DisplayObject){
    return (localPoint.x >= 0 && localPoint.x <= displayObject.width && localPoint.y >= 0 && localPoint.y <= displayObject.height);
}

function onSaveClick() {  
    console.log("Save");   
}

//===========================================================================================================================================================//
//================================================================= Button Click Listeners ==================================================================//
//===========================================================================================================================================================//

//================================================================= Undo Button ==================================================================//
function onCancelClick() {
    //UndoTile();  
    readFile();
    console.log("Cancel");   
}

//================================================================= Map Tile Button ==================================================================//
function onMapTileClick(tile)
{
    //m_MapData[tile.ownedRow][tile.ownedCol] ++;
    //m_MapData[tile.ownedRow][tile.ownedCol] %= 2;
    console.log(m_MapData[tile.ownedRow][tile.ownedCol]);
    
 
}

function onTilesetClick(tile)
{
    m_CurrentTile = tile.id;    
}
/*
function onTileClick(tile) {
     console.log(tile.ownedRow+" "+tile.ownedCol+" "+m_MapData[tile.ownedRow][tile.ownedCol]); 
     m_Undo[0][m_Undolength] = tile.ownedRow;
     m_Undo[1][m_Undolength] = tile.ownedCol;
     m_Undo[2][m_Undolength] = m_MapData[tile.ownedRow][tile.ownedCol];
     m_Undolength++;
   if( m_MapData[tile.ownedRow][tile.ownedCol]==0)
       m_MapData[tile.ownedRow][tile.ownedCol]=1;
   else
      m_MapData[tile.ownedRow][tile.ownedCol]=0;
    tile.setWalkable(m_MapData[tile.ownedRow][tile.ownedCol]);
    //m_Stage.addChild(StatusBUr(tile));
    //m_RecordTile = tile;
    console.log(tile);
}
*/
function onCreateMap()
{
    
    var mapW = parseInt((<HTMLInputElement>document.getElementById("map-width")).value);
    var mapH = parseInt((<HTMLInputElement>document.getElementById("map-height")).value);
    var mapName = (<HTMLInputElement>document.getElementById("map-name")).value;
    
    var tileW = parseInt((<HTMLInputElement>document.getElementById("tile-width")).value);
    var tileH = parseInt((<HTMLInputElement>document.getElementById("tile-height")).value);
    
    m_MapEditor = createNewMap(mapW, mapH, tileW, tileH);
    
    Start();
}


/*
function StatusBUr(tile) {
    var Container = new render.DisplayObjectContainer();
    var m_CanPassOrNot = new ui.Button();
    Container.x = 250;
    Container.y = 50;
   
    //var m_bitmap=new render.Bitmap();
    //m_bitmap.source = "Save.png";
    var X = tile.ownedRow + 1;
    var Y = tile.ownedCol + 1;
    var m_postion = new ui.Button();
    m_CanPassOrNot.width = 100;
    m_CanPassOrNot.height = 30;
    m_postion.x = 10;
    m_postion.y = 10;
    m_postion.text = X + ' 行 ' + Y + ' 列 ';
    //m_postion.source = m_bitmap;
    Container.addChild(m_postion);
    m_CanPassOrNot.width = 100;
    m_CanPassOrNot.height = 30;
    m_CanPassOrNot.x = 10;
    m_CanPassOrNot.y = 50;
   // m_CanPassOrNot.source = m_bitmap;
    var m_Background = new render.Rect();
    m_Background.width = 50;
    m_Background.height = 50;
    m_Background.x = 10;
    m_Background.y = 130;
    if (m_MapData[tile.ownedRow][tile.ownedCol] == 0) {
            m_CanPassOrNot.text = "可走";
            m_Background.color = "#FF0000" ;
     }
     else {
            m_CanPassOrNot.text = "不可走";
            m_Background.color = "#0000FF" ;
     }
      m_CanPassOrNot.onClick = ()=> {
        onTileClick(tile);
    }
    Container.addChild(m_CanPassOrNot);
    Container.addChild(m_Background);
    return Container;
}
*/







