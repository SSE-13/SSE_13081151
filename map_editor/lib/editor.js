var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 50;
    editor.GRID_PIXEL_HEIGHT = 50;
    class WorldMap extends render.DisplayObjectContainer {
        constructor() {
            super();
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        render(context) {
            super.render(context);
        }
    }
    editor.WorldMap = WorldMap;
    class Tile extends render.Rect {
        constructor() {
            super();
            this.walkable = true;
        }
        setWalkable(value) {
            this.walkable = value;
            this.color = value ? "#0000FF" : "#FF0000";
        }
        getWalkable() {
            return this.walkable;
        }
    }
    editor.Tile = Tile;
})(editor || (editor = {}));
