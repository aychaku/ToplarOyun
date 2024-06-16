class pointCollector{
    constructor(game){
        this.game=game;
        this.arena=game.arena;
        this.SelectPatterns=[];
        //this.SelectPatterns.push(new allSelectPattern());
        this.SelectPatterns.push(new directionSelectPattern(game.arena,[directionManager.dBottom]));
        this.SelectPatterns.push(new directionSelectPattern(game.arena,[directionManager.dLeft]));
        this.SelectPatterns.push(new directionSelectPattern(game.arena,[directionManager.dLeft,directionManager.dBottom]));
        this.SelectPatterns.push(new directionSelectPattern(game.arena,[directionManager.dRight,directionManager.dBottom]));


    }
    
    collectPoints(){
        var pointCollected=0;
        this.SelectPatterns.forEach(pattern => {
            pointCollected+=pattern.collectPoint(this.game.arena);
        });
        return pointCollected;
    }


}
class selectPattern{
    constructor(arena){
        this.arena=arena;
        this.selectedHoles=[];
    }
    Select(){
    }
    pointCalc(){
    }
    collectPoint(){
    }

}
class allSelectPattern extends selectPattern{
    constructor(){
        super();
    }
    Select(arena){
        var stoneHoles=arena.getFullStoneholes();
        this.selectedStoneHoles=stoneHoles;
        
        return stoneHoles;
    }
    pointCalc(arena){
        var result=0;
        var filledStoneHoles=this.Select(arena);
        result=10*filledStoneHoles.length;

        return result;
    }
    collectPoint(arena){
        var point=this.pointCalc(arena);
        var game=arena.game;
        game.score+=point;
        this.selectedStoneHoles.forEach(element => {
            element.makeEmpty();
        });
    }
}
class directionSelectPattern extends selectPattern{
    constructor(arena,direction){
        super(arena,direction);
        this.direction=direction;
    }
    Select(){
        console.log("Select");

        // Direction of selection
        //is hole out of arena, if not is it stoned, if it is it same type of ballstone
        //then add collection and continue this process todo end then check colection and if its 
        //higher or equal than collectPointCount then return select if lower than return empty
        var result=[];
        var arena=this.arena;
        var firstStoneHole=arena.getFirstStonehole();
        var StoneHoleCheckingNow=firstStoneHole;
        var direction=this.direction;
        do{
            var pointCollectionList=[];
            if(!StoneHoleCheckingNow.isStoned()||StoneHoleCheckingNow.willBeCollectedp==true){
                StoneHoleCheckingNow=StoneHoleCheckingNow.getNextStonehole();
                continue;}
            var stoneHoleAtDirectionChecking=StoneHoleCheckingNow.getStoneholeAtDirection(direction);
            pointCollectionList.push(StoneHoleCheckingNow);

            do {
                if(stoneHoleAtDirectionChecking==null || !stoneHoleAtDirectionChecking.isStoned()){break;}

                var type1=stoneHoleAtDirectionChecking.getBallStoneType();
                var type2=StoneHoleCheckingNow.getBallStoneType();

                if(type1==type2){

                    pointCollectionList.push(stoneHoleAtDirectionChecking);
                    stoneHoleAtDirectionChecking.willBeCollectedp=true;
                    StoneHoleCheckingNow.willBeCollectedp=true;
                    stoneHoleAtDirectionChecking=stoneHoleAtDirectionChecking.getStoneholeAtDirection(direction);//will update for next direction
                }else{
                    break;
                }

                
            } while (stoneHoleAtDirectionChecking!=null && stoneHoleAtDirectionChecking.isStoned());

            if(pointCollectionList.length>=this.arena.game.stoneCollectCountVal){

                result=result.concat(pointCollectionList);
            }
            
            StoneHoleCheckingNow=StoneHoleCheckingNow.getNextStonehole();
        }while (StoneHoleCheckingNow!=null);
        this.selectedStoneHoles=result;

        this.arena.stoneHoleMap.forEach(element => {
            element.willBeCollectedp=false;

        });
        return result;
    }
    pointCalc(){
        var result=0;
        var filledStoneHoles=this.Select();
        result=10*this.selectedStoneHoles.length;
        return result;
    }
    collectPoint(arena){
        var point=this.pointCalc();

        var game=arena.game;
        game.score+=point;
        this.selectedStoneHoles.forEach(element => {
            element.makeEmpty();
        });
        this.selectedStoneHoles=[];
        return point;
    }

}
