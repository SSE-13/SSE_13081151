var ui;
(function (ui) {
    class Button extends render.DisplayObjectContainer {
        constructor() {
            super();
            this.background = new render.Bitmap();
            this.label = new render.TextField();
        }
    }
    ui.Button = Button;
})(ui || (ui = {}));
