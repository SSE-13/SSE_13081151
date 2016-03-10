/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {

    render(context: CanvasRenderingContext2D) {
        context.font = "20px Arial";
        context.fillStyle = '#000000';
        context.fillText('HelloWorld', 0, 20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
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
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}

var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 550;

var background = new Bitmap();
background.source = 'Resources/BG.png';

var rocks = [new Bitmap(), new Bitmap(), new Bitmap()];
rocks.forEach(element => {
    element.source = 'Resources/Stone.png';
});

var platforms = [new Bitmap(), new Bitmap(), new Bitmap(), new Bitmap()];
platforms.forEach(element => {
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
var renderQueue = [background,  platforms[0], platforms[1], platforms[2], tree, bush];
//资源加载列表
var imageList = ['Resources/BG.png', 'Resources/Tree.png', 'Resources/Platform.png', 'Resources/Stone.png', 'Resources/Bush.png','Resources/Goomba.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


