"use strict";
var fs = require('fs');
var ASSETS_PATH = __dirname + "\\assets\\";
var SAVE_BTN_PATH = ASSETS_PATH + "Save.png";
var CANCEL_BTN_PATH = ASSETS_PATH + "Cancel.png";
var Redo_BTN_PATH = ASSETS_PATH + "Cancel.png"; //using the cancel pic temp
var EMPTY_TILE_PATH = ASSETS_PATH + "0.png";
var WATER_TILE_PATH = ASSETS_PATH + "1.png";
var CRATE_TILE_PATH = ASSETS_PATH + "2.png";
var FENCE_F_TILE_PATH = ASSETS_PATH + "3.png";
var FENCE_TL_TILE_PATH = ASSETS_PATH + "4.png";
var FENCE_TR_TILE_PATH = ASSETS_PATH + "5.png";
var FENCE_BL_TILE_PATH = ASSETS_PATH + "6.png";
var FENCE_BR_TILE_PATH = ASSETS_PATH + "7.png";
var BRIDGE_TILE_PATH = ASSETS_PATH + "8.png";
var GRASS_TILE_PATH = ASSETS_PATH + "9.png";
var m_Undolength = 0;
var m_Undo = new Array(4);
var m_CurrentTile = 9;
var m_CurrentLayer = 0;
//var m_RecordTile =  new editor.Tile;
for (var i = 0; i < 3; i++) {
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
var m_RedoBtn;
var m_EmptyBtn; //*
var m_WaterBtn;
var m_CrateBtn;
var m_Fence_F_Btn;
var m_Fence_TL_Btn;
var m_Fence_TR_Btn;
var m_Fence_BL_Btn;
var m_Fence_BR_Btn;
var m_BridgeBtn;
var m_GrassBtn;
//Editor Elements
var m_EventCore = events.EventCore.getInstance();
m_EventCore.init();
var m_Map = data.Storage.getInstance();
//m_MapEditor = createMapEditor();
onCreateMap();
Start();
//==============================================================================================================================================//
//================================================================= Functions ==================================================================//
//==============================================================================================================================================//
function Start() {
    m_Panel = new editor.ControlPanel();
    m_Panel.x = 300;
    InitUI();
    m_Stage = new render.DisplayObjectContainer();
    m_Stage.addChild(m_MapEditor);
    m_Stage.addChild(m_Panel);
    m_Stage.addChild(m_SaveBtn);
    m_Stage.addChild(m_UndoBtn);
    m_Stage.addChild(m_RedoBtn);
    m_Stage.addChild(m_EmptyBtn); //*
    m_Stage.addChild(m_WaterBtn);
    m_Stage.addChild(m_CrateBtn);
    m_Stage.addChild(m_Fence_F_Btn);
    m_Stage.addChild(m_Fence_TL_Btn);
    m_Stage.addChild(m_Fence_TR_Btn);
    m_Stage.addChild(m_Fence_BL_Btn);
    m_Stage.addChild(m_Fence_BR_Btn);
    m_Stage.addChild(m_BridgeBtn);
    m_Stage.addChild(m_GrassBtn);
    m_RenderCore = new render.RenderCore();
    m_RenderCore.start(m_Stage);
    m_RenderCore.start(m_Stage, [SAVE_BTN_PATH, EMPTY_TILE_PATH, CANCEL_BTN_PATH, BRIDGE_TILE_PATH, CRATE_TILE_PATH, FENCE_BL_TILE_PATH, FENCE_BR_TILE_PATH, FENCE_F_TILE_PATH, FENCE_TL_TILE_PATH, FENCE_TR_TILE_PATH, GRASS_TILE_PATH]);
}
function InitUI() {
    //Save button
    m_SaveBtn = new render.Bitmap();
    m_SaveBtn.width = 50;
    m_SaveBtn.height = 50;
    m_SaveBtn.source = SAVE_BTN_PATH;
    m_SaveBtn.x = 350;
    m_SaveBtn.y = 0;
    //Undo Button
    m_UndoBtn = new render.Bitmap();
    m_UndoBtn.width = 50;
    m_UndoBtn.height = 50;
    m_UndoBtn.source = CANCEL_BTN_PATH;
    m_UndoBtn.x = 350;
    m_UndoBtn.y = 55;
    //Redo Button
    m_RedoBtn = new render.Bitmap();
    m_RedoBtn.width = 50;
    m_RedoBtn.height = 50;
    m_RedoBtn.source = Redo_BTN_PATH;
    m_RedoBtn.x = 350;
    m_RedoBtn.y = 110;
    //Empty button                           //*
    m_EmptyBtn = new render.Bitmap();
    m_EmptyBtn.width = 32;
    m_EmptyBtn.height = 32;
    m_EmptyBtn.source = EMPTY_TILE_PATH; //*
    m_EmptyBtn.x = 500;
    m_EmptyBtn.y = 0;
    //Water button                           
    m_WaterBtn = new render.Bitmap();
    m_WaterBtn.width = 32;
    m_WaterBtn.height = 32;
    m_WaterBtn.source = WATER_TILE_PATH;
    m_WaterBtn.x = 548;
    m_WaterBtn.y = 0;
    //Crate button                           
    m_CrateBtn = new render.Bitmap();
    m_CrateBtn.width = 32;
    m_CrateBtn.height = 32;
    m_CrateBtn.source = CRATE_TILE_PATH;
    m_CrateBtn.x = 596;
    m_CrateBtn.y = 0;
    //Fence_F button                           
    m_Fence_F_Btn = new render.Bitmap();
    m_Fence_F_Btn.width = 32;
    m_Fence_F_Btn.height = 32;
    m_Fence_F_Btn.source = FENCE_F_TILE_PATH;
    m_Fence_F_Btn.x = 500;
    m_Fence_F_Btn.y = 48;
    //m_Fence_TL button                           
    m_Fence_TL_Btn = new render.Bitmap();
    m_Fence_TL_Btn.width = 32;
    m_Fence_TL_Btn.height = 32;
    m_Fence_TL_Btn.source = FENCE_TL_TILE_PATH;
    m_Fence_TL_Btn.x = 548;
    m_Fence_TL_Btn.y = 48;
    //m_Fence_TR button                           
    m_Fence_TR_Btn = new render.Bitmap();
    m_Fence_TR_Btn.width = 32;
    m_Fence_TR_Btn.height = 32;
    m_Fence_TR_Btn.source = FENCE_TR_TILE_PATH;
    m_Fence_TR_Btn.x = 596;
    m_Fence_TR_Btn.y = 48;
    //m_Fence_BL button                           
    m_Fence_BL_Btn = new render.Bitmap();
    m_Fence_BL_Btn.width = 32;
    m_Fence_BL_Btn.height = 32;
    m_Fence_BL_Btn.source = FENCE_BL_TILE_PATH;
    m_Fence_BL_Btn.x = 500;
    m_Fence_BL_Btn.y = 96;
    //m_Fence_BR button                           
    m_Fence_BR_Btn = new render.Bitmap();
    m_Fence_BR_Btn.width = 32;
    m_Fence_BR_Btn.height = 32;
    m_Fence_BR_Btn.source = FENCE_BR_TILE_PATH;
    m_Fence_BR_Btn.x = 548;
    m_Fence_BR_Btn.y = 96;
    //Bridge button                           
    m_BridgeBtn = new render.Bitmap();
    m_BridgeBtn.width = 32;
    m_BridgeBtn.height = 32;
    m_BridgeBtn.source = BRIDGE_TILE_PATH;
    m_BridgeBtn.x = 596;
    m_BridgeBtn.y = 96;
    //GRASS button                           
    m_GrassBtn = new render.Bitmap();
    m_GrassBtn.width = 32;
    m_GrassBtn.height = 32;
    m_GrassBtn.source = GRASS_TILE_PATH;
    m_GrassBtn.x = 500;
    m_GrassBtn.y = 144;
    m_EventCore.register(m_SaveBtn, HitTest, onSaveClick);
    m_EventCore.register(m_UndoBtn, HitTest, onCancelClick);
    m_EventCore.register(m_RedoBtn, HitTest, onRedoClick);
    m_EventCore.register(m_EmptyBtn, HitTest, onEmptyClick);
    m_EventCore.register(m_BridgeBtn, HitTest, onBridegClick);
    m_EventCore.register(m_CrateBtn, HitTest, onCrateClick);
    m_EventCore.register(m_Fence_BL_Btn, HitTest, onFence_BL_Click);
    m_EventCore.register(m_Fence_BR_Btn, HitTest, onFence_BR_Click);
    m_EventCore.register(m_Fence_F_Btn, HitTest, onFence_F_Click);
    m_EventCore.register(m_Fence_TL_Btn, HitTest, onFence_TL_Click);
    m_EventCore.register(m_Fence_TR_Btn, HitTest, onFence_TR_Click);
    m_EventCore.register(m_GrassBtn, HitTest, onGrassClick);
    m_EventCore.register(m_WaterBtn, HitTest, onWaterClick);
}
//================================================================= Read Map File ==================================================================//
function readFile() {
    var map_path = __dirname + "/map.json";
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
    if (m_Undolength <= 0) {
        alert("Ended");
        return;
    }
    else {
        var new_row = m_Undo[0][m_Undolength - 1];
        var new_col = m_Undo[1][m_Undolength - 1];
        //m[new_row][new_col]= m_Undo[2][m_Undolength-1];
        m_Undolength--;
    }
}
//================================================================= Undo Operation ==================================================================//
function RedoTile() {
    if (m_Undolength <= 0) {
        alert("Ended");
        return;
    }
    else {
        var new_row = m_Undo[0][m_Undolength + 1];
        var new_col = m_Undo[1][m_Undolength + 1];
        //m[new_row][new_col]= m_Undo[2][m_Undolength-1];
        m_Undolength++;
    }
}
//================================================================= Map pic Operation ==================================================================//
function EmptyTile() {
}
//================================================================= Create New Map ==================================================================//
function createNewMap(width, height, tileWidth, tileHeight, layerID) {
    var map = new editor.WorldMap();
    for (var col = 0; col < width; col++) {
        for (var row = 0; row < height; row++) {
            m_Map.layers[layerID][col][row] = 0;
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
function HitTest(localPoint, displayObject) {
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
//================================================================= Redo Button ==================================================================//
function onRedoClick() {
    //UndoTile();  
    readFile();
    console.log("Redo");
}
//================================================================= Map pic Button ==================================================================//
function onEmptyClick(tile) {
    tile.id = 0;
}
function onWaterClick(tile) {
    tile.id = 1;
}
function onCrateClick(tile) {
    tile.id = 2;
}
function onBridegClick(tile) {
    tile.id = 3;
}
function onFence_F_Click(tile) {
    tile.id = 4;
}
function onFence_TL_Click(tile) {
    tile.id = 5;
}
function onFence_TR_Click(tile) {
    tile.id = 6;
}
function onFence_BL_Click(tile) {
    tile.id = 7;
}
function onFence_BR_Click(tile) {
    tile.id = 8;
}
function onGrassClick(tile) {
    tile.id = 9;
}
//================================================================= Map Tile Button ==================================================================//
function onMapTileClick(tile) {
    //m_MapData[tile.ownedRow][tile.ownedCol] ++;
    //m_MapData[tile.ownedRow][tile.ownedCol] %= 2;
    m_Map.layers[m_CurrentLayer][tile.ownedRow][tile.ownedCol] = m_CurrentTile;
    tile.source = ASSETS_PATH + m_CurrentTile + ".png";
    console.log(m_Map.layers[0][tile.ownedRow][tile.ownedCol]);
}
function onTilesetClick(tile) {
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
function onCreateMap() {
    var mapW = parseInt(document.getElementById("map-width").value);
    var mapH = parseInt(document.getElementById("map-height").value);
    var mapName = document.getElementById("map-name").value;
    var tileW = parseInt(document.getElementById("tile-width").value);
    var tileH = parseInt(document.getElementById("tile-height").value);
    m_MapEditor = createNewMap(mapW, mapH, tileW, tileH, m_CurrentLayer);
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
