class BallStone {

    constructor(arenaStoneHole,color,shape,game){
       this.color=color;
       this.Shape=shape;
       this.arenaStoneHole=arenaStoneHole;

       this.game=game;


   }
   copy(){
    var copy=new BallStone(this.arenaStoneHole,this.color,this.Shape,this.game);

    return copy;
   }
   createBallElement(){

       let ballelement=document.createElement("ballstone");

       ballelement.setAttribute("Id",this.getId());
       ballelement.setAttribute("class",this.color.getColor()+" "+this.Shape.getShape());
       //ballelement.setAttribute("onclick",this.gameVarName+".arena.StoneHoleRun(`"+this.getHoleId()+"`)");

       return ballelement;
   }
   getId(){
    return this.game.gameVarName+";ball:x:"+this.arenaStoneHole.xPos+",y:"+this.arenaStoneHole.yPos;
    }

    getHoleId(){
        return this.arenaStoneHole.getId();
        }
    getDocumentElement(){
        return document.getElementById(this.getId());
    }
    getType(){
        return `type,c:`+this.color.color+`,s:`+this.Shape.Shape;
    }
}
function createRandomBall(randomStonehole,game){
    var color=getRandomColor();
    var shape=getRandomShape();
    var rball=new BallStone(randomStonehole,color,shape,game);
    return rball;
   }

