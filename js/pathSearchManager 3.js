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
        if(!station){
            ret=true;
        }
        if(!station.isStationStoneHoleAvailable()){
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
        let lastStation=lastArrayItem(currentScan);
        let turntimes=0;
        let scanCond=true;
        while(scanCond){
            turntimes++;
            lastStation=lastArrayItem(currentScan);

            let nextStation = lastStation.scanNextStation(prefferedDirections);
            while(!nextStation){
                lastStation=lastArrayItem(currentScan);
                nextStation = lastStation.scanNextStation(prefferedDirections);
                if(nextStation!=null&&!nextStation.isThereDirectionToScan()){
                    currentScan.pop();
                }
            }



            let isInCurrentScan=nextStation.turnIfInCurrentScan(currentScan);
            if(isInCurrentScan[0]&&currentScan.length>1){
                nextStation=isInCurrentScan[1];
                let indexOfexist=currentScan.indexOf(nextStation);
                currentScan=currentScan.slice(0,indexOfexist);
                // continue;
            }


            if(!nextStation.isThereDirectionToScan()){
                nextStation=nextStation.getEarlierStation();
            }
            let stationNullOrStoned=pathStationManager.isStationNullOrStoned(nextStation);
            if(stationNullOrStoned){
                continue;
            }
            currentScan.push(nextStation);

            //pathComplation check
            nextStation.pathCompletingProcess(currentScan,targetHole,completedPaths);


            lastStation=lastArrayItem(currentScan);
            scanCond=((currentScan[0].isThereDirectionToScan()
            ||lastStation.isThereDirectionToScan())
            &&completedPaths.length<1
            &&turntimes<10000);
            if(currentScan.length<1){
                scanCond=false;
            }
        }


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
    turnIfInCurrentScan(currentScan){
        let isInCurrentScan=false;
            for (let index = 0; index < currentScan.length; index++) {
                isInCurrentScan= currentScan[index].getId()==this.getId();
                if (isInCurrentScan) {
                    currentScan=currentScan[index];
                    break;
                }            
            }
        return [isInCurrentScan,currentScan];
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