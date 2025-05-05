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

        return directionManager.getPreferredDirectionsByHole(area1, area2).reverse();
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
        this.pSM=pathStationManager;
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


class pathStationManager {
    constructor() {}
    static newpathStation(stoneHole, prefferedDirections,earlierStation,directionComeFrom) {

        let fixedPreferredDirection=pathDirectionManager.scanOrderFix( [...prefferedDirections],directionComeFrom);

        let newStation = new pathStation(stoneHole,fixedPreferredDirection,earlierStation,directionComeFrom);
        return newStation;
    }
    static isStationNullOrStoned(station){
        let ret=false;
        // if(!station){
        //     ret=true;
        // }
        if(!station&&!station.isStationStoneHoleAvailable()){
            ret=true;
        }
        return ret;
    }
    static search(stoneHole, targetHole) {
        let prefferedDirections=pathDirectionManager.getPrefferedSearchDirections(stoneHole, targetHole);
        let startStation=pathStationManager.newpathStation(stoneHole,prefferedDirections,null,null)
        let completedPaths=[];
        let currentScan=[];
        currentScan.push(startStation);
        let bringLastStation=()=>{return lastArrayItem(currentScan);}

        let turntimes=0;
        let scanCond=true;
        while(scanCond){
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
                completedPaths.push(currentScan);

            }else{
            let scanNextStation=scanStation.scanNextStation(prefferedDirections);
            let isStationAvailable=scanNextStation.isStationStoneHoleAvailable();
            let notInCurrentScan=!scanNextStation.isInCurrentScan(currentScan);
            if(isStationAvailable&&notInCurrentScan){currentScan.push(scanNextStation)}
        }

            scanCond=currentScan.length>0;
            if(completedPaths.length>0){
                scanCond=false;
            }
            if(turntimes>15000){
                scanCond=false;
            }
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
        let comeFromDirection=this.popLastDirection();
        if(comeFromDirection){ comeFromDirection=comeFromDirection.getReverse();}
        if (nextHole) {
            station=pathStationManager.newpathStation(nextHole,prefferedDirections,this,comeFromDirection);
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