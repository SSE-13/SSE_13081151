"use strict";
var Invoker = (function () {
    function Invoker() {
        Invoker._undoList = [];
        //Invoker._redoList = [];
    }
    //private static _redoList:Array<any>;
    //private static _undoLimit:number = 20; 
    Invoker.getInstance = function () {
        if (this._instance == null) {
            Invoker._instance = new Invoker();
        }
        return Invoker._instance;
    };
    /*public set undoLimit(value:number)
    {
        Invoker._undoLimit = value;
    }*/
    Invoker.canUndo = function () {
        return Invoker._undoList.length > 0;
    };
    /*public static canRedo()
    {
        return Invoker._redoList.length > 0;
    }*/
    Invoker.undo = function () {
        var command = Invoker._undoList.pop();
        //Invoker._redoList.push(command);
        command.undo();
    };
    Invoker.setUndoCommand = function (command) {
        command.onExecute();
        this._undoList.push(command);
    };
    return Invoker;
}());
exports.Invoker = Invoker;
var Command = (function () {
    function Command() {
    }
    Command.prototype.onExecute = function () {
    };
    Command.prototype.onUndo = function () {
    };
    Command.prototype.onRedo = function () {
    };
    return Command;
}());
exports.Command = Command;
