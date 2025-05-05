
class arenaStoneHole{
    constructor(xPos,yPos,game){
        this.ballStoneHole=null;// Stoned with stoneball
        this.yPos=yPos;
        this.xPos=xPos;
        this.game=game; 
        this.htmlClass="";
        this.willBeCollectedp=false;

    }
    getNextStonehole(){
        var arena=this.game.arena;
        var indexOfStoneHole=arena.stoneHoleMap.indexOf(this);
        var result=arena.stoneHoleMap[indexOfStoneHole+1];
        return result;
    }
    getStoneholeAtDirection(DirectionList){
        if(DirectionList==null||DirectionList.length==0){
            return null;
        }
        var direction=directionManager.getSumDirections(DirectionList);
        var targetPositionX=this.xPos+direction.x;
        var targetPositionY=this.yPos+direction.y;

        var targetStoneHole=this.findStoneHoleByPos(targetPositionX,targetPositionY);

        return targetStoneHole;
    }
    getStoneholeAtDirectionIfEmpty(DirectionList){
        let stoneHole=getStoneholeAtDirection(DirectionList);
        if(stoneHole.isStoned()){
            stoneHole=null;
        }
        return targetStoneHole;
    }
    findStoneHoleByPos(xPos,yPos){
        var arena=this.game.arena;
        var result;
        for (var element of arena.stoneHoleMap) {
            if(element.yPos==yPos&&element.xPos==xPos){
                result=element;
                break;
            }
        }
            return result;
    }
    getBallStoneType(){
        return this.ballStoneHole.getType();
    }
    isStoned(){
        let result=this.ballStoneHole!=null;

        return result
    }
    getId(){
        return this.game.gameVarName+";x:"+this.xPos+",y:"+this.yPos;
    }
    getOnClickStr(){
        return this.game.gameVarName+".arena.StoneHoleRun(`"+this.getId()+"`)";
    }
    setStonedBall(stoneHole){
        this.ballStoneHole=stoneHole;
        this.ballStoneHole.arenaStoneHole=this;

    }
    copy(){
        var copy=new arenaStoneHole(this.yPos,this.xPos,this.game);
        copy.ballStoneHole=this.ballStoneHole.copy();
        console.log("arenastonehole copied");
        console.log(copy);
        return copy;
    }
    getStonedBall(){
        return this.ballStoneHole;
    }
    getDocumentElement(){
        return document.getElementById(this.getId());
    }
    makeEmpty(){
        this.ballStoneHole=null;
        this.game.arena.SelectedStones=[];
    }
}
function setNewFilledArenaStoneHole(arenaStoneHole){
    arenaStoneHole.htmlClass="newFilledrenaHole newFilledrenaAppearBallStone";
}
function cleartNewFilledArenaStoneHoleEffect(){
    Maingame.arena.stoneHoleMap.forEach(element => {
        element.htmlClass="";
        // element.getDocumentElement().setAttribute("class","");
        
    });
    arenaStoneHole.htmlClass="";
}
function setUnfilledOldArenaStoneHoleMap(arena){
    var stoneholemap=arena.stoneHoleMap;
    stoneholemap.forEach(element => {
        element.htmlClass="";
    });

}