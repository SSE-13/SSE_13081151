export class Invoker {
    
    private static _instance:Invoker;
    private static _undoList:Array<any>;
    //private static _redoList:Array<any>;
    //private static _undoLimit:number = 20; 
    
    
    public static getInstance():Invoker
    {
        if(this._instance == null)
        {
            Invoker._instance = new Invoker();
        }
        
        return Invoker._instance;
    }
    
    constructor()
    {
        Invoker._undoList = [];
        //Invoker._redoList = [];
    }
    
    /*public set undoLimit(value:number)
    {
        Invoker._undoLimit = value;
    }*/
    
    public static canUndo(){
        return Invoker._undoList.length > 0;
    }
    
    /*public static canRedo()
    {
        return Invoker._redoList.length > 0;
    }*/
    
    
    public static undo(){
        var command = Invoker._undoList.pop();
        //Invoker._redoList.push(command);
        command.undo();
    }
    
    public static setUndoCommand(command){
        command.onExecute();
        this._undoList.push(command);
    }
    
    /*public static redo()
    {
        
    }*/
    
}



export class Command {
    
    onExecute()
    {
        
    }
    
    onUndo()
    {
        
    }
    
    onRedo()
    {
        
    }
    
}