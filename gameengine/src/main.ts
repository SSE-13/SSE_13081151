
import * as fs from 'fs';


const ASSETS_PATH = __dirname + "\\assets\\";
const SAVE_BTN_PATH = ASSETS_PATH + "Save.png";
const CANCEL_BTN_PATH = ASSETS_PATH + "Cancel.png";
const COLLISION_TILE_PATH = ASSETS_PATH + "x.png";
const REDO_BTN_PATH = ASSETS_PATH + "Redo.png";
const EMPTY_TILE_PATH = ASSETS_PATH + "0.png";
const WATER_TILE_PATH = ASSETS_PATH + "1.png";
const CRATE_TILE_PATH = ASSETS_PATH + "2.png";
const FENCE_F_TILE_PATH = ASSETS_PATH + "3.png";
const FENCE_TL_TILE_PATH = ASSETS_PATH + "4.png";
const FENCE_TR_TILE_PATH = ASSETS_PATH + "5.png";
const FENCE_BL_TILE_PATH = ASSETS_PATH + "6.png";
const FENCE_BR_TILE_PATH = ASSETS_PATH + "7.png";
const BRIDGE_TILE_PATH = ASSETS_PATH + "8.png";
const GRASS_TILE_PATH = ASSETS_PATH + "9.png";

var m_Undolength =0;
var m_Undo = new Array(4);
var m_CurrentTile = 0;
var m_CurrentLayer = 0;

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
var m_Container;

//Buttons
var m_SaveBtn;
var m_UndoBtn;
var m_RedoBtn;

//Editor Elements
var m_EventCore = events.EventCore.getInstance();
m_EventCore.init();

var m_Map = data.Storage.getInstance();

onCreateMap();
Start();

//==============================================================================================================================================//
//================================================================= Functions ==================================================================//
//==============================================================================================================================================//

//Initialization
function Start()
{    
    m_Panel = new editor.ControlPanel();
    m_Panel.x = 300; 
 
    InitUI();
    tileContainer();
    m_Stage = new render.DisplayObjectContainer();   
    for(var i = 0; i < m_Map.NumLayers; i++)
        m_Stage.addChild(m_MapEditor[i]);
    
    m_Stage.addChild(m_Panel);
    m_Stage.addChild(m_SaveBtn);
    m_Stage.addChild(m_UndoBtn);
    m_Stage.addChild(m_RedoBtn);
    m_Stage.addChild(m_Container);
    
    m_RenderCore = new render.RenderCore();
    m_RenderCore.start(m_Stage);
    m_RenderCore.start(m_Stage, [SAVE_BTN_PATH, EMPTY_TILE_PATH, WATER_TILE_PATH, REDO_BTN_PATH, CANCEL_BTN_PATH, BRIDGE_TILE_PATH, CRATE_TILE_PATH, FENCE_BL_TILE_PATH, FENCE_BR_TILE_PATH, FENCE_F_TILE_PATH, FENCE_TL_TILE_PATH, FENCE_TR_TILE_PATH, GRASS_TILE_PATH, COLLISION_TILE_PATH]);
}


//UI Elements initialization
function InitUI()
{
    //Save button
    m_SaveBtn = new render.Bitmap();
    m_SaveBtn.width = 50;
    m_SaveBtn.height = 50;
    m_SaveBtn.source = SAVE_BTN_PATH;
    m_SaveBtn.x = 525;
    m_SaveBtn.y=0;
    
    //Undo Button
    m_UndoBtn =new render.Bitmap();
    m_UndoBtn.width = 50;
    m_UndoBtn.height = 50;
    m_UndoBtn.source = CANCEL_BTN_PATH;
    m_UndoBtn.x = 525;
    m_UndoBtn.y = 55;
    
    //Redo Button
    m_RedoBtn = new render.Bitmap();
    m_RedoBtn.width = 50;
    m_RedoBtn.height = 50;
    m_RedoBtn.source = REDO_BTN_PATH;
    m_RedoBtn.x = 525;
    m_RedoBtn.y = 110;
    
    m_EventCore.register(m_SaveBtn, HitTest, onSaveClick);
    m_EventCore.register(m_UndoBtn, HitTest, onUndoClick);
    m_EventCore.register(m_RedoBtn, HitTest, onRedoClick);
}



function tileContainer()
{
    m_Container = new render.DisplayObjectContainer();
    m_Container.x = 600;
    var m_ID = 0;
    for(var row = 0; row < 4; row++)
    {
        for(var col = 0; col < 3; col++)
        {
            var tile = new editor.Tile();
            tile.setWalkable(true);
            if (m_ID > 9){
                tile.source = ASSETS_PATH + 0 + ".png";
                tile.id = 0;
            }else{
                tile.source = ASSETS_PATH + m_ID + ".png";
                tile.id = m_ID;
            }
            tile.x = col * m_Map.TILE_WIDTH;
            tile.y = row * m_Map.TILE_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = m_Map.TILE_WIDTH;
            tile.height = m_Map.TILE_HEIGHT;
            m_Container.addChild(tile);
            m_EventCore.register(tile, HitTest, onTilesetClick);     
            m_ID++;       
        }        
    }
    
    return m_Container;
}


//================================================================= Save Map File ==================================================================//
function LoadFile()
{
    //TODO:load functionality    
}

//================================================================= Undo Operation ==================================================================//
function UndoTile() {
    //TODO: Undo Operation
    if(m_Undolength<=0){ 
        alert("Ended");
        return;
    }
    else{
        var new_row=m_Undo[0][m_Undolength-1];
        var new_col=m_Undo[1][m_Undolength-1];
        //m[new_row][new_col]= m_Undo[2][m_Undolength-1];
        m_Undolength--;
        //m_RecordTile.setWalkable(m_MapData[new_row][new_col]);
   }
}

//================================================================= Redo Operation ==================================================================//
function RedoTile() {
    //TODO: Redo Operation

}


//================================================================= Create Map Operation ==================================================================//
function createNewMap(width, height)
{
    m_CurrentLayer = 0;
    m_Map.layers = new Array(m_Map.NumLayers);
    m_Map.MapHeight = height;
    m_Map.MapWidth = width;
    
    var mapEditor = new Array(3);
    for(var i = 0; i < m_Map.NumLayers; i++){        
        mapEditor[i] = new editor.WorldMap("layer" + i);
        if( i == m_Map.COLLISION_LAYER)
             mapEditor[i] = new editor.WorldMap("collisionLayer");
        mapEditor[i].x = 0;//i * (width * m_Map.TILE_WIDTH) ;
        mapEditor[i].y = 0;
        mapEditor[i].width = width * m_Map.TILE_WIDTH;
        mapEditor[i].height = height * m_Map.TILE_WIDTH;
        m_Map.layers[i] = new Array(height);
        for(var row = 0; row < height; row++)
        {
            m_Map.layers[i][row] = new Array(width);
            for(var col = 0; col < width; col++)
            {
                m_Map.layers[i][row][col] = 0;
                var tile = new editor.Tile();
                tile.setWalkable(true);
                tile.source = EMPTY_TILE_PATH;
                tile.x = col * m_Map.TILE_WIDTH;
                tile.y = row * m_Map.TILE_HEIGHT;
                tile.ownedCol = col;
                tile.ownedRow = row;
                tile.width = m_Map.TILE_WIDTH;
                tile.height = m_Map.TILE_HEIGHT;
                mapEditor[i].addChild(tile);
                                            
                m_EventCore.register(tile, HitTest, onMapTileClick);            
            }        
        }   
    }
    
    return mapEditor;
}

//Hit test function
function HitTest (localPoint:math.Point,displayObject:render.DisplayObject){
    return (localPoint.x >= 0 && localPoint.x <= displayObject.width && localPoint.y >= 0 && localPoint.y <= displayObject.height);
}

function onSaveClick() {  
    console.log("Save");   
    m_Map.saveFile();   
}

//===========================================================================================================================================================//
//================================================================= Button Click Listeners ==================================================================//
//===========================================================================================================================================================//

//================================================================= Undo Button ==================================================================//
function onUndoClick() {
    console.log("Undo");   
}

//================================================================= Redo Button ==================================================================//
function onRedoClick() {
    console.log("Redo");
}
//================================================================= Map Tile Button ==================================================================//
function onMapTileClick(tile)
{
    if(m_CurrentLayer != m_Map.COLLISION_LAYER){
        m_Map.layers[m_CurrentLayer][tile.ownedRow][tile.ownedCol] = m_CurrentTile;
        tile.source = ASSETS_PATH + m_CurrentTile + ".png";
    }else{
        tile.setWalkable(!tile.getWalkable());
        tile.source = tile.getWalkable() ?  EMPTY_TILE_PATH : COLLISION_TILE_PATH ;
        m_Map.layers[m_Map.COLLISION_LAYER][tile.ownedRow][tile.ownedCol] = tile.getWalkable() ? 0 : 1;
    }
}

function onTilesetClick(tile)
{
    m_CurrentTile = tile.id;
}

//================================================================= UI Functions ==================================================================//

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

function cleanUp()
{
    if(m_MapEditor != null){
        for(var layer = 0; layer < m_Map.NumLayers; layer++){
            for(var col = 0; col < m_Map.MapWidth; col++){
                for(var row = 0; row < m_Map.MapHeight; row++){
                    m_EventCore.unregister(m_MapEditor.getTile(layer, col, row));  
                }
            }
        }
    }
}
function onCreateMap()
{
    
    var mapW = parseInt((<HTMLInputElement>document.getElementById("map-width")).value);
    var mapH = parseInt((<HTMLInputElement>document.getElementById("map-height")).value);
    
    m_MapEditor = createNewMap(mapW, mapH);
    //onLayerChange();
    Start();
}

function onLayerChange()
{
    m_CurrentLayer = (<HTMLSelectElement>document.getElementById("layer")).selectedIndex;
    console.log(m_CurrentLayer);
    for(var i = 0; i < m_Map.NumLayers; i++)
    {
        if(i != m_CurrentLayer){
            m_MapEditor[i].setOpacity(0.5);
            m_MapEditor[i].setActive(false);
        }else{
            m_MapEditor[i].setOpacity(1);
            m_MapEditor[i].setActive(true);
        }
    }
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







