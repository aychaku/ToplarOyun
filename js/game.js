let SelectedStoneTile;



class game{
    constructor(gameVarName){
        gameVarName="Maingame";
        this.gameReload(gameVarName);
       }
        gameReload(gameVarName){
            this.gameVarName=gameVarName;
            this.gameArena=document.getElementById(gameVarName+"Table");
            this.score=0;
            this.scoreElement=document.getElementById(gameVarName+"scoreLabel");
            this.gameareaXInput=document.getElementById(gameVarName+"xInput");
            this.gameareaYInput=document.getElementById(gameVarName+"yInput");
            this.arena;
            this.stoneAddCount=document.getElementById(gameVarName+"StoneAddCount");
            this.stoneAddCountVal=this.stoneAddCount.value;

            this.stoneCollectCount=document.getElementById(gameVarName+"stoneCollectCount");
            this.stoneCollectCountVal= this.stoneCollectCount.value;
            this.randomStonesPreview=document.getElementById(gameVarName+"randomStonesPreview");
            this.nextRandomStones=[];
            this.gameStonePointPerBall=10;
            this.setGameArena();
            this.pointCollector= new pointCollector(this);
            this.movementManager= new movementManager(this);
            this.marketManager=new marketManager(this);
            updateSaveMenuList();
            turnBackMovements=[];
            this.updateArena();
         }
         updateArena(){
            this.arena.updateArena();
        }
         gameOver(){
            var newgame=confirm("Oyun "+this.score+ " puanda sona erdi. Yeni Oyuna başlamak istemisin?");
            if(newgame){
                this.gameReload(this.gameVarName);
                window.top.location = window.top.location;//temporary Solution for reload game
            }
            console.log(newgame);
         }
        isGameOver(){
            var Result=false;
            var emptyHoleCount=this.arena.getEmptyHoleCount();
            if(emptyHoleCount==0){
                Result=true;
            }
            return Result;
        }
        setGameArena(){
        const arenamap=this.gameArena;

        var x=parseFloat(this.gameareaXInput.value);
        var y=parseFloat(this.gameareaYInput.value);

        this.cleanGameArenaHtml();
        

        //setArena
            this.arena=new arena(x,y,this);


            arenamap.innerHTML=this.arena.SetArenaNew();

            //bring 3 random random ball stones to arena
            this.setNewRandomBalls();

            this.turnAddNewStones();
    
    }
    setRandomPreview(){
        var preview=this.randomStonesPreview;
        preview.innerHTML="";
        this.nextRandomStones.forEach(element => {
            var td=document.createElement("td");
            td.append(element.createBallElement());
            preview.append(td);

        });

    }
    cleanGameArenaHtml(){
        this.gameArena.innerHTML="";
        
    }
    turnAddNewStones(){
        setUnfilledOldArenaStoneHoleMap(this.arena);
            for(var element of this.nextRandomStones ){
                if(!this.isGameOver()){
                        this.addBall(element);
                    }
                        else{this.gameOver();
                            
                            break;}
            }
            this.setNewRandomBalls();
            this.arena.updateArena();
    }
    setNewRandomBalls(){
        this.nextRandomStones=[];
        for (let index = 1; index <= this.stoneAddCount.value; index++) {
            this.nextRandomStones.push(createRandomBall(new arenaStoneHole(0,0,this),this));
        }
        this.setRandomPreview();
    }
    addBall(ballStone){
        var randomStonehole=this.arena.selectRandomEmptyHole();
        setNewFilledArenaStoneHole(randomStonehole);
        ballStone.arenaStoneHole=randomStonehole;
        randomStonehole.ballStoneHole=ballStone;
    }
     addRandomBall(){

        var randomStonehole=this.arena.selectRandomEmptyHole();
        var randomball=createRandomBall(randomStonehole,this);


        randomStonehole.ballStoneHole=randomball;
        this.arena.updateArena();
}
    addRandomBallAtPos(x,y){
        let holeID="Maingame;x:"+x+",y:"+y;
        var Stonehole=this.arena.findHole(holeID);
        var randomball=createRandomBall(Stonehole,this);


        Stonehole.ballStoneHole=randomball;
        this.arena.updateArena();
    }
    addBallAtPosWithColorShapeForLoad(x,y,colorI,shapeI){
        let holeID="Maingame;x:"+x+",y:"+y;
        var Stonehole=this.arena.findHole(holeID);
        var randomball=createBallWithColorShapeIndex(Stonehole,this,colorI,shapeI);


        Stonehole.ballStoneHole=randomball;
        this.arena.updateArena();
    }
    setStoneAddCountVal(stoneAddCount){
        this.stoneAddCountVal=stoneAddCount;
        document.getElementById(this.gameVarName+"StoneAddCount").value=stoneAddCount;
    }

    setStoneCollectCountVal(CollectCount){
        this.stoneCollectCountVal=CollectCount;
        document.getElementById(this.gameVarName+"stoneCollectCount").value=CollectCount;
    }
    getStoneAddCountVal(){
        return this.stoneAddCountVal;
    }
    getStoneCollectCountVal(){
        return this.stoneCollectCountVal;
    }
}



