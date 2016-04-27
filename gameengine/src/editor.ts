
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }

        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }

    export class Tile extends render.Bitmap
    {
        public id: number;
        public ownedRow: number;
        public ownedCol: number;
        private walkable: boolean = true;
        
        constructor()
        {
            super();
        }
        
        public setWalkable(value) {
            this.walkable = value;
        }
        
        public setImage(value)
        {
            this.source = value;
        }
        
        
        public getImage()
        {
            return this.source;
        }
        
        public getWalkable()
        {
            return this.walkable;    
        }
    }

/*
    export class Tile extends render.Rect {


        public ownedRow: number;
        public ownedCol: number;
        private walkable: boolean = true;

        constructor() {
            super();
        }

        public setWalkable(value) {
            this.walkable = value;
            this.color = value ? "#0000FF" : "#FF0000";
        }
        
        public setImage(value)
        {
            
        }
        
        public getWalkable()
        {
            return this.walkable;    
        }
    }
    */
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        

        
    }
}
