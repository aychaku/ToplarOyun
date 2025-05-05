class arena{
    constructor(ArenaWith,arenaHeight,game){
        this.x=ArenaWith;
        this.y=arenaHeight;
        this.game=game;

        //Event args
        this.SelectedStoneHoles=[];
        this.SelectedStones=[];
        this.TargetedStoneHole;
        this.MultiSelect=false;
        this.stoneHoleMap=this.createStoneHoleArenaMap();
    }


    createStoneHoleArenaMap(){
        let result=[];
        for (let yPos = 1; yPos <= this.y; yPos++) {

            for (let xPos = 1; xPos <= this.x; xPos++) {
            let newarenaStoneHole =new arenaStoneHole(xPos,yPos,this.game);
            result.push(newarenaStoneHole);
            }

        }
        return result;
    }
    getEmptyStoneholes(){
        let result=[];
        this.stoneHoleMap.forEach(element => {
            if(!element.isStoned()){
                result.push(element);
            }
            
        });
        return result;
    }
    // getEmptyHoleCount(){
    //     var emptysHoles=[];
    //     this.game.arena.stoneHoleMap.forEach(element => {
    //         if(!element.isStoned()){
    //             emptysHoles.push(element);
    //         }
            
    //     });
    //     return emptysHoles.length;
    // }
    getEmptyHoleCount(){
        var emptysHoles=this.getEmptyStoneholes();

        return emptysHoles.length;
    }
    getFirstStonehole(){
        let result=this.stoneHoleMap[0];
        return result;
    }
    getLastStonehole(){
        let result=this.stoneHoleMap[this.stoneHoleMap.length-1];
        return result;
    }
    getFullStoneholes(){
        let result=[];
        this.stoneHoleMap.forEach(element => {
            if(element.isStoned()==true){
                result.push(element);
            }
            
        });
        return result;
    }
    selectRandomEmptyHole(){
        const emptyhole=this.getEmptyStoneholes();
        const randomindex= Math.floor(Math.random()*(emptyhole.length));
        return emptyhole[randomindex];
    }
    //return table innerhtml

    SetArenaNew(){
        const x=this.x;
        const y=this.y;
            const ArenaTable=document.createElement("table");
            const rows=this.getRows();
            rows.forEach(element => {
                const row=document.createElement("tr");
                element.forEach(column=>{
                    const td=document.createElement("td");
                    td.setAttribute("id",column.getId());
                    td.setAttribute("onclick",column.getOnClickStr());
                    row.appendChild(td);
                    
                });
                ArenaTable.append(row);
            });
            
            return ArenaTable.innerHTML;
            
        }
    updateArena(){
        var stoneHoleMap=this.stoneHoleMap;
        stoneHoleMap.forEach(StoneHoleItem => {
            var renderelementParent=StoneHoleItem.getDocumentElement();
            renderelementParent.classList=StoneHoleItem.htmlClass;//for last randomly added stones
            renderelementParent.innerHTML="";
            if(StoneHoleItem.ballStoneHole!=null){
            var htmlElement=StoneHoleItem.ballStoneHole.createBallElement();
            renderelementParent.append(htmlElement);
            }
        });
                            //set randomPreview
                            this.game.setRandomPreview();
        this.game.scoreElement.innerHTML=this.game.score;
        if(this.getEmptyHoleCount()==0){
            this.game.gameOver();
        }

        } 
    getRows(){
        const row=[];
        for (let yHeight = 1; yHeight <= this.y; yHeight++) {
            var rowColumnList=this.getRow(yHeight);
            var rows=[];
            rowColumnList.forEach(element=>{
                rows.push(element);
            });
            row.push(rows);

        }

        return row;
    }
    getRow(rowYpos){
        const columns=[];
        const holes=this.stoneHoleMap;
        holes.forEach(element => {if(element.yPos==rowYpos)
            columns.push(element);
        });
        return columns.sort(function(a,b){ return a.xPos - b.xPos});
    }
    StoneHoleRun(elementId){
        cleartNewFilledArenaStoneHoleEffect();
        //stone selection if hole stoned
        var SelectedHole=document.getElementById(elementId);
        //release stone selection if hole stoned
        //target Selection if there selected stone
        var clickedHole=this.findHole(elementId);
        if(clickedHole.isStoned()){
            this.select(clickedHole);
            return;
        }
        //if there stone selected select empty hole

        if(!clickedHole.isStoned()&&this.SelectedStones.length>0&&this.SelectedStones.length<2){
            var transferStoneHole=this.SelectedStones[0].arenaStoneHole;
            console.log(transferStoneHole.getId()+"empty target selected");
        //move stone ball to stone ballhole

        var movementmgr=this.game.movementManager;
        //movementmgr.portalMove(transferStoneHole,clickedHole);
        movementmgr.activeMove(transferStoneHole,clickedHole);

        var pointcollected=this.game.pointCollector.collectPoints();
        this.updateArena();
        pushTurnBackMove();
        //if there empty StoneHoles continue 

        if(this.getEmptyHoleCount()<=this.turnAddNewStones){
            confirm(`GameOver due lack of StoneBallSpace`);
            this.updateArena();
            return;
        }else{
            console.log(this.getEmptyHoleCount()+`Game Continue due of present StoneBallSpace`);
            if(pointcollected==0){
                this.game.score+=-2;
            //this.game.turnAddNewStones();
        }else{
            setUnfilledOldArenaStoneHoleMap(this);}

        }
            this.updateArena();

        }
        //unselect stone balls
        this.unSelectAllStoneBall();


    }

    isSelected(ball){
        var result=false;
        var StonesInHole=this.SelectedStones;
        StonesInHole.forEach(element => {
            if(element==ball){
                result=true;
            }
            return result;
        });
        return result;
    }
   select(hole){
        var ball=hole.ballStoneHole;

        
        //if not selected select

        var isSelected =this.isSelected(ball);
        if(!this.MultiSelect){
            this.unSelectAllStoneBall();
        }

        if(isSelected){
            this.unSelectStoneBall(ball);
            console.log(this.SelectedStones);
        }else{
            this.selectStoneBall(ball);

        }


    }
    selectStoneBall(stoneball){
        var StonesInHole=this.SelectedStones;
        StonesInHole.push(stoneball);
        addClass(stoneball.getDocumentElement(),`Selected`);
    }
    unSelectStoneBall(stoneball){
        var StonesInHole=this.SelectedStones;
        this.SelectedStones=removeFromArray(StonesInHole,stoneball);
        removeClass(stoneball.getDocumentElement(),`Selected`);
    }
    unSelectAllStoneBall(){
        var StonesInHole=this.SelectedStones;
        StonesInHole.forEach(element => {
            this.unSelectStoneBall(element);
        });
    }
    
    findHole(id){
        var result;
        this.stoneHoleMap.forEach(element => {
            if (element.getId()==id) {
                result=element;
            }
        });
        return result;
    }
    cleanHole(id){
        var result;
        this.stoneHoleMap.forEach(element => {
            if (element.getId()==id) {
                result=element;
            }
        });
        result.cleanHole();
    }

}
