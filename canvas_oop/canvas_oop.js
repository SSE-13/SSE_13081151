var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
    }
    TextField.prototype.render = function (context) {
        context.font = "20px Arial";
        context.fillStyle = '#000000';
        context.fillText('HelloWorld', 0, 20);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 550;
var background = new Bitmap();
background.source = 'Resources/BG.png';
var rocks = [new Bitmap(), new Bitmap(), new Bitmap()];
rocks.forEach(function (element) {
    element.source = 'Resources/Stone.png';
});
var platforms = [new Bitmap(), new Bitmap(), new Bitmap(), new Bitmap()];
platforms.forEach(function (element) {
    element.source = 'Resources/Platform.png';
});
platforms[0].x = 0;
platforms[0].y = 450;
platforms[1].x = 384;
platforms[1].y = 450;
platforms[2].x = 600;
platforms[2].y = 300;
var tree = new Bitmap();
tree.source = 'Resources/Tree.png';
tree.x = 150;
tree.y = 150;
var bush = new Bitmap();
bush.source = 'Resources/Bush.png';
bush.x = 728;
bush.y = 235;
/*
var bird_img = new Image();
bird_img.src = 'Resources/Bird.png';

var goomba_img = new Image();
goomba_img.src = 'Resources/Goomba.png';
*/
//渲染队列
var renderQueue = [background, platforms[0], platforms[1], platforms[2], tree, bush];
//资源加载列表
var imageList = ['Resources/BG.png', 'Resources/Tree.png', 'Resources/Platform.png', 'Resources/Stone.png', 'Resources/Bush.png', 'Resources/Goomba.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
