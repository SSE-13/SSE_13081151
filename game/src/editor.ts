
module editor {


    export const GRID_PIXEL_WIDTH = 32;

    export const GRID_PIXEL_HEIGHT = 32;

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


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;
        walkable:boolean;


        constructor() {
            super();
        }

    public SetBackground(value:number){
        this.source="grass.png";
    }
    
     public setWalkable(value) {
        if(value == 0){
             this.source ="null.png";  
        }else if(value==1){
             this.source ="box.png";
        }else if(value==2){
             this.source ="water.png"; 
        }else if(value==3){
             this.source ="barrier.png"; 
        }

        }
    }
    
    export class ControlPanel extends render.DisplayObjectContainer {
        
        constructor(){
            super();
            var button = new ui.Button();
            button.text = "Hello";
            button.width = 100;
            button.height = 50;
            this.addChild(button);
            button.onClick = ()=> {
                alert(111);
            }
        }
        
    }
}
