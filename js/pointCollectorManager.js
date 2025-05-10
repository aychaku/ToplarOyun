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
        //this.SelectPatterns.push(new allSelectPattern(game.arena));


    }
    
    collectPoints(){
        var pointCollected=0;
        this.SelectPatterns.forEach(pattern => {
            pointCollected+=pattern.collectPoint(this.game.arena);
        });
        return pointCollected;
    }
    collectPoints2(){
        let game=this.game;
        let pointCollected=0;
        let colectedStones=[];
        this.SelectPatterns.forEach(pattern => {
            let data=pattern.collectStoneGroups(this.game.arena);
            console.log(data)
            data.forEach(element=>{colectedStones.push(element);
                console.log(element);
            });
            
        });
        console.log([...colectedStones])

        while(colectedStones.length>0){
            let firstPointGroup=colectedStones[0];
            firstPointGroup.forEach(element => {
                element.makeEmpty();
                pointCollected+=game.gameStonePointPerBall;
            });

            colectedStones.shift();
        }
        game.score+=pointCollected;
        return pointCollected;
    }

}
class selectPattern{
    constructor(arena){
        this.arena=arena;
        this.selectedHoles=[];
    }
    Select2(){
        let arena=this.arena;
        let pointStoneGroups=[];
        let pointStonesCountForCollecting=arena.game.stoneCollectCountVal;
        let stonedHoles=arena.getStonedholes();
        let isInStonedHoles=(stoneHole)=>{
            let ret;
            for (let index = 0; index < stonedHoles.length; index++) {
                const element = stonedHoles[index];
                if(element.getId()==stoneHole.getId()){
                    ret=element;
                    break;
                }
            }
            return ret;
        }
        let lastElement=()=>{
            return stonedHoles[stonedHoles.length-1];
        }
            while (lastElement()!=null) {
                let firstPointStone=lastElement();
                let pointStonesSearch=[];
                pointStonesSearch.push(firstPointStone);
                let lastPointStone=()=>{return pointStonesSearch[pointStonesSearch.length-1];}
                let nextPointStone=()=>{return lastPointStone().getStoneholeAtDirection(this.direction);}
                let condition=()=>{
                    let ret=false;
                    let lastStone=lastPointStone();
                    let nextStone=nextPointStone();
                    if(nextStone==null){
                        return ret;
                    }
                    if(lastStone.getBallStoneType()==nextStone.getBallStoneType()){
                        ret= true;
                    }

                    return ret;
                }
                let contCount=0;
                    while (condition()) {
                        pointStonesSearch.push(nextPointStone());
                    }
                if(pointStonesSearch.length>=pointStonesCountForCollecting){
                    pointStoneGroups.push(pointStonesSearch);}
            stonedHoles.pop();
        }
    return pointStoneGroups;
    }
    collectStoneGroups(){
        let pointStoneGroups= this.Select2();;
        return pointStoneGroups;
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
    // pointCalc(){
    // }
    pointCalc(arena){
        var result=0;
        var filledStoneHoles=this.Select(arena);
        result=10*filledStoneHoles.length;

        return result;
    }
    // collectPoint(){
    // }
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
class allSelectPattern extends selectPattern{
    constructor(arena){
        super(arena);
    }
    Select(){
        var stoneHoles=this.arena.getFullStoneholes();
        this.selectedStoneHoles=stoneHoles;
        
        return stoneHoles;
    }

}
class directionSelectPattern extends selectPattern{
    constructor(arena,direction){
        super(arena,direction);
        this.direction=direction;
    }
    // Select(){
    //     console.log("Select");

    //     // Direction of selection
    //     //is hole out of arena, if not is it stoned, if it is it same type of ballstone
    //     //then add collection and continue this process todo end then check colection and if its 
    //     //higher or equal than collectPointCount then return select if lower than return empty
    //     var result=[];
    //     var arena=this.arena;
    //     var firstStoneHole=arena.getFirstStonehole();
    //     var StoneHoleCheckingNow=firstStoneHole;
    //     var direction=this.direction;
    //     do{
    //         var pointCollectionList=[];
    //         if(!StoneHoleCheckingNow.isStoned()||StoneHoleCheckingNow.willBeCollectedp==true){
    //             StoneHoleCheckingNow=StoneHoleCheckingNow.getNextStonehole();
    //             continue;}
    //         var stoneHoleAtDirectionChecking=StoneHoleCheckingNow.getStoneholeAtDirection(direction);
    //         pointCollectionList.push(StoneHoleCheckingNow);

    //         do {
    //             if(stoneHoleAtDirectionChecking==null || !stoneHoleAtDirectionChecking.isStoned()){break;}

    //             var type1=stoneHoleAtDirectionChecking.getBallStoneType();
    //             var type2=StoneHoleCheckingNow.getBallStoneType();

    //             if(type1==type2){

    //                 pointCollectionList.push(stoneHoleAtDirectionChecking);
    //                 stoneHoleAtDirectionChecking.willBeCollectedp=true;
    //                 StoneHoleCheckingNow.willBeCollectedp=true;
    //                 stoneHoleAtDirectionChecking=stoneHoleAtDirectionChecking.getStoneholeAtDirection(direction);//will update for next direction
    //             }else{
    //                 break;
    //             }

                
    //         } while (stoneHoleAtDirectionChecking!=null && stoneHoleAtDirectionChecking.isStoned());

    //         if(pointCollectionList.length>=this.arena.game.stoneCollectCountVal){

    //             result=result.concat(pointCollectionList);
    //         }
            
    //         StoneHoleCheckingNow=StoneHoleCheckingNow.getNextStonehole();
    //     }while (StoneHoleCheckingNow!=null);
    //     this.selectedStoneHoles=result;

    //     this.arena.stoneHoleMap.forEach(element => {
    //         element.willBeCollectedp=false;

    //     });
    //     return result;
    // }
    // pointCalc(){
    //     var result=0;
    //     var filledStoneHoles=this.Select();
    //     result=10*this.selectedStoneHoles.length;
    //     return result;
    // }
    // collectPoint(arena){
    //     var point=this.pointCalc();

    //     var game=arena.game;
    //     game.score+=point;
    //     this.selectedStoneHoles.forEach(element => {
    //         element.makeEmpty();
    //     });
    //     this.selectedStoneHoles=[];
    //     return point;
    // }

}
