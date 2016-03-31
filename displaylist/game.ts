module game {


}

var m_Character = new render.DisplayObjectContainer();
    m_Character.x = 0;
    m_Character.y = 0;
    var m_CharacterContainer = new render.DisplayObjectContainer();
var m_Head = new render.Bitmap();
    m_Head.x = 10;
    m_Head.y = 0;

var m_Trunk = new render.Bitmap();
    m_Trunk.x = 20;
    m_Trunk.y = 40;

var m_LeftArm = new render.Bitmap();
    m_LeftArm.x = 40;
    m_LeftArm.y = 45;
   
var m_RightArm = new render.Bitmap();
    m_RightArm.x = -1;
    m_RightArm.y = 43;

var m_LeftLeg = new render.Bitmap();
    m_LeftLeg.x = 18;
    m_LeftLeg.y = 71;
    
var m_RightLeg = new render.Bitmap();
    m_RightLeg.x = 1;
    m_RightLeg.y = 70;

    m_Head.source = "head.png";
    m_Trunk.source = "trunk.png";
    m_LeftArm.source = "left_arm.png";
    m_RightArm.source = "right_arm.png";
    m_LeftLeg.source = "left_leg.png";
    m_RightLeg.source = "right_leg.png";

    m_CharacterContainer.addChild(m_Character);
    m_Character.addChild(m_Head);
    m_Character.addChild(m_RightLeg);
    m_Character.addChild(m_LeftLeg);
    m_Character.addChild(m_Trunk); 
    m_Character.addChild(m_LeftArm);
    m_Character.addChild(m_RightArm);
    
    

var renderCore = new render.RenderCore();

renderCore.start(m_CharacterContainer, ["trunk.png", "left_arm.png","right_arm.png", "left_leg.png", "right_leg.png", "head.png"]);


class m_CharacterBody extends Body {


    onTicker(duringTime: number) {
         this.rotation += Math.PI*duringTime*10;
    }
}

var ticker = new Ticker();
var body = new m_CharacterBody(m_CharacterContainer);
body.x = 100;
body.y = 100;
body.vx = 0;
body.vy = 360; 
ticker.start([body]);