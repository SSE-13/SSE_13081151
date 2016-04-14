module game {


}

class BodyPart extends render.Bitmap
{    
    constructor(source:string, x:number, y:number, width:number, height:number){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.source = source;        
    }    
}


var m_Character = new render.DisplayObjectContainer();
    m_Character.x = 100;
    m_Character.y = 100;

var m_Head = new BodyPart("head.png", 10, 0, 50, 50);
var m_Trunk = new BodyPart("trunk.png", 20, 40, 32, 40);
var m_LeftArm = new BodyPart("left_arm.png", 40, 45, 32, 40);
var m_RightArm = new BodyPart("right_arm.png", -1, 43, 32, 40);
var m_LeftLeg = new BodyPart("left_leg.png", 18, 71, 50, 50);
var m_RightLeg = new BodyPart("right_leg.png", 1, 70, 50, 50);

   
m_Character.addChild(m_Head);
m_Character.addChild(m_RightLeg);
m_Character.addChild(m_LeftLeg);
m_Character.addChild(m_Trunk); 
m_Character.addChild(m_LeftArm);
m_Character.addChild(m_RightArm);
    
    

var renderCore = new render.RenderCore();
renderCore.start(m_Character, ["trunk.png", "left_arm.png","right_arm.png", "left_leg.png", "right_leg.png", "head.png"]);


class m_CharacterBody extends Body {
    
    isMoving:boolean = true;
    direction:number = 1;

    onTicker(duringTime: number) {
        if(this.isMoving)
            this.rotation += this.direction*Math.PI*duringTime*2.5;
    }
}

var ticker = new Ticker();
var body = new m_CharacterBody(m_Character);
body.x = 100;
body.y = 100;
body.rotation = 360; 
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var HitTest = (localPoint:math.Point, displayObject:render.DisplayObject) =>{
    return ((localPoint.x > 0 && localPoint.x <= m_Head.width) && (localPoint.y > 0 && localPoint.y <= m_Head.height));
}

var OnHeadClick = () =>
{
    if(body.isMoving)
    {
        body.direction *= -1;
    }
    else
    {
        body.isMoving = true;
    }
        
}

var OnLegClick = () =>
{
    body.rotation = 0;
    body.isMoving = false;
}

eventCore.register(m_Head, HitTest, OnHeadClick);
eventCore.register(m_RightLeg, HitTest, OnLegClick);
eventCore.register(m_LeftLeg, HitTest, OnLegClick);

