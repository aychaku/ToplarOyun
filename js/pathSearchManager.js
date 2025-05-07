class pathDirectionManager {
    constructor() {}
    static pathComplationCondition(inSearchStationHole, targetHole) {
        if(!inSearchStationHole){return false;}
        let subCond1 = (inSearchStationHole.xPos - targetHole.xPos == 0);
        let subCond2 = (inSearchStationHole.yPos - targetHole.yPos == 0);
        let res = subCond1 && subCond2;
        return (res);
    }
    static getPrefferedSearchDirections(area1, area2) {
        let ret=directionManager.getPreferredDirectionsByHole(area1, area2).reverse();
        return ret;
    }
    static scanOrderFix(prefferedOrder,lastScanDirection){
        let newOrder=[];
        if(lastScanDirection!=null){
        newOrder.push(lastScanDirection);
            prefferedOrder.forEach(direction=>{
                if (direction.getType()!=lastScanDirection.getType()) {
                    newOrder.push(direction);         
                }
                
            });
        }else{newOrder=prefferedOrder}
        return newOrder;
    }

}

class pathFindingMethodBase {
    constructor() {
    }
    static pathComplationCondition(inSearchStationHole, targetHole) {
        if(!inSearchStationHole){return false;}
        let subCond1 = (inSearchStationHole.xPos - targetHole.xPos == 0);
        let subCond2 = (inSearchStationHole.yPos - targetHole.yPos == 0);
        let res = subCond1 && subCond2;
        return (res);
    }
    getPaths(){

    }


}
class defaultPathFindingMethod extends pathFindingMethodBase {
    constructor(game) {
        super(game);
        this.pSM=pathStationManagerForAllPossiblePaths;
    }
    getPaths(stoneBall,toStoneHole){
        return this.search(stoneBall,toStoneHole);
    }
    getShortestPath(paths){
         let sorted=paths.sort((a,b)=>{return a.length;})[0];
       return sorted;
   }
    search(ball, target) {
        return this.pSM.search(ball, target);
    }



}
class shortestPathFindingMethod extends pathFindingMethodBase {
    constructor(game) {
        super(game);
    }
    getPaths(stoneBall,toStoneHole){
        return this.search(stoneBall,toStoneHole);
    }
    getShortestPath(paths){
         let sorted=paths.sort()[0];
       return sorted;
   }
   search(stoneHole, targetHole) {
    let prefferedDirections=pathDirectionManager.getPrefferedSearchDirections(stoneHole, targetHole);
    let startStation=newpathStation(stoneHole,prefferedDirections,null,null)
    let completedPaths=[];
    let currentScan=[];
    let everFoundNoDirectionList=[];
    currentScan.push(startStation);
    let bringLastStation=()=>{return lastArrayItem(currentScan);}

    let turntimes=0;
    let scanCond=()=>{
        // if(completedPaths.length>0){
        //     return false;
        // }
        // if(turntimes>15000){
        //     return false;
        // }
        return currentScan.length>0;
    };
    while(scanCond()){
        turntimes++;
        let scanStation=bringLastStation();
        if(!scanStation){
            break;
        }
        let everFoundInNoDirectionList=scanStation.isInCurrentScan(everFoundNoDirectionList);
        if(everFoundInNoDirectionList){
            currentScan.pop();
            continue;
        }
        
        if(!scanStation.isThereDirectionToScan()){
            everFoundNoDirectionList.push(scanStation);
            currentScan.pop();
            continue;
        }
        let isScanStationOnTarget=pathDirectionManager.pathComplationCondition(scanStation.arenaStoneHole,targetHole);
        if(isScanStationOnTarget){
            completedPaths.push([...currentScan]);
            currentScan.pop();
            continue;

        }else{
            prefferedDirections=pathDirectionManager.getPrefferedSearchDirections(scanStation.arenaStoneHole, targetHole);
        let scanNextStation=scanStation.scanNextStation(prefferedDirections);
        let isStationAvailable=scanNextStation.isStationStoneHoleAvailable();
        let notInCurrentScan=!scanNextStation.isInCurrentScan(currentScan);
        if(isStationAvailable&&notInCurrentScan){currentScan.push(scanNextStation)}
    }
    // let listForPrintId=[...completedPaths];
    // for (let index = 0; index < listForPrintId.length; index++) {
    //     const element = listForPrintId[index];
    //     let petIds="";
    //     for (let index = 0; index < element.length; index++) {
    //         const elementx = element[index];
    //         petIds+=", [" +elementx.getId() +"]";
    //     }
    //     let path="path "+(index+1)+petIds ;
    //     console.log(path);
        
        
    // }

        // if(completedPaths.length>0){
        //     scanCond=false;
        // }
        // if(turntimes>15000){
        //     scanCond=false;
        // }
        //console.log(turntimes)
    }
    console.log([...completedPaths])


    return completedPaths;

}



}
function newpathStation(stoneHole, prefferedDirections,earlierStation,directionComeFrom) {

    // let fixedPreferredDirection=pathDirectionManager.scanOrderFix( [...prefferedDirections],directionComeFrom);
    // let newStation = new pathStation(stoneHole,fixedPreferredDirection,earlierStation,directionComeFrom);
    let newStation = new pathStation(stoneHole,prefferedDirections,earlierStation,directionComeFrom);
    return newStation;
}
function isStationNullOrStoned(station){
    let ret=false;
    // if(!station){
    //     ret=true;
    // }
    if(!station&&!station.isStationStoneHoleAvailable()){
        ret=true;
    }
    return ret;
}

class pathStationManagerForAllPossiblePaths {
    constructor() {}
    static search(stoneHole, targetHole) {
        let prefferedDirections=pathDirectionManager.getPrefferedSearchDirections(stoneHole, targetHole);
        let startStation=newpathStation(stoneHole,prefferedDirections,null,null)
        let completedPaths=[];
        let currentScan=[];
        currentScan.push(startStation);
        let bringLastStation=()=>{return lastArrayItem(currentScan);}

        let turntimes=0;
        let scanCond=()=>{
            if(completedPaths.length>0){
                return false;
            }
            if(turntimes>15000){
                return false;
            }
            return currentScan.length>0;
        };
        while(scanCond()){
            turntimes++;
            let scanStation=bringLastStation();
            if(!scanStation){
                break;
            }
            if(!scanStation.isThereDirectionToScan()){
                currentScan.pop();
                continue;
            }
            let isScanStationOnTarget=pathDirectionManager.pathComplationCondition(scanStation.arenaStoneHole,targetHole);
            if(isScanStationOnTarget){
                completedPaths.push([...currentScan]);
                currentScan.pop();
                continue;

            }else{
                prefferedDirections=pathDirectionManager.getPrefferedSearchDirections(scanStation.arenaStoneHole, targetHole);
            let scanNextStation=scanStation.scanNextStation(prefferedDirections);
            let isStationAvailable=scanNextStation.isStationStoneHoleAvailable();
            let notInCurrentScan=!scanNextStation.isInCurrentScan(currentScan);
            if(isStationAvailable&&notInCurrentScan){currentScan.push(scanNextStation)}
        }
        let listForPrintId=[...completedPaths];
        for (let index = 0; index < listForPrintId.length; index++) {
            const element = listForPrintId[index];
            let petIds="";
            for (let index = 0; index < element.length; index++) {
                const elementx = element[index];
                petIds+=", [" +elementx.getId() +"]";
            }
            let path="path "+(index+1)+petIds ;
            console.log(path);
            
            
        }

            // if(completedPaths.length>0){
            //     scanCond=false;
            // }
            // if(turntimes>15000){
            //     scanCond=false;
            // }
            console.log(turntimes)
        }
        console.log([...completedPaths])


        return completedPaths;

    }



}

class pathStation {
    constructor(arenaStoneHole, prefferedDirections,earlierStation,directionComeFrom=new basicDirection()) {
        this.arenaStoneHole = arenaStoneHole;
        this.directions = prefferedDirections;
        this.earlierStation=earlierStation;
        this.directionComeFrom=directionComeFrom;
    }
    getEarlierStation(){
        return this.earlierStation;
    }
    pathCompletingProcess(scan,targetHole,completedPaths){
        let ret=pathDirectionManager.pathComplationCondition(this.arenaStoneHole,targetHole);
        if (ret) {
            completedPaths.push([...scan]);
        }
        return ret;
    }
    isInCurrentScan(currentScan){
        let isInCurrentScan=false;
            for (let index = 0; index < currentScan.length; index++) {
                isInCurrentScan= currentScan[index].getId()==this.getId();
                if (isInCurrentScan) {
                    break;
                }            
            }
        return isInCurrentScan;
    }
    getPreferredDirectionsByHole(targetHole){
        return pathDirectionManager.getPrefferedSearchDirections(this.arenaStoneHole, targetHole);
    }
    scanNextArenaStoneHole() {
        let step=this.arenaStoneHole.getStoneholeAtDirection([this.getLastDirection()]); 
        return step;
    }
    scanNextStation(prefferedDirections){
        let nextHole=this.scanNextArenaStoneHole();
        let station=this;
        let comeFromDirection=station.popLastDirection();
        if(comeFromDirection){ comeFromDirection=comeFromDirection.getReverse();}
        if (nextHole) {
            station=newpathStation(nextHole,prefferedDirections,this,comeFromDirection);
        }
        return station;
    }
    getId() {
        return this.arenaStoneHole.xPos + "-" + this.arenaStoneHole.yPos;
    }
    getFirstDirection(){
        return this.directions[0];
    }
    getLastDirection(){
        let ret=lastArrayItem(this.directions)
        if(!ret){ret=[];}
        return ret;
    }
    isThereDirectionToScan() {
        return this.directions.length > 0;
    }
    isStationStoneHoleAvailable() {
        return !this.arenaStoneHole.isStoned();
    }

    popLastDirection() {
        return this.directions.pop();
    }

}