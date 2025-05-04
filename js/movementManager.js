class movementManager{
    constructor(game){
    this.game=game;
    this.arena=game.arena;
    this.pathfinder=new pathDirectionManager();
    this.activeMovetype=new walkMove();
   }

    portalMove(stoneBall,toStoneHole){
       //TransportationMovement
       toStoneHole.setStonedBall(stoneBall.getStonedBall());
       //this.game.score-=5;//priceFor PortalMovement

       stoneBall.makeEmpty();
    }
    copyMove(stoneBall,toStoneHole){
        var stoneballlBackupArenaHole=stoneBall.copy();
        this.portalMove(stoneBall,toStoneHole);
        stoneBall.setStonedBall(stoneballlBackupArenaHole.getStonedBall());
     }
   activeMove(stoneBall,toStoneHole){
      this.activeMovetype.move(stoneBall,toStoneHole);
      this.game.score-=this.activeMovetype.price;
   }

     
}
class movementType{
   constructor() {
      this.typeName="default";
   }
   move(){

   }
}
class walkMove extends movementType{
   constructor() {
      super();
      this.typeName="walkMove";
      this.price=2;
      //temporary
      //this.portalmove=new portalMove();
      this.pathFindingManager=new defaultPathFindingMethod();
   }
   move(stoneBall,toStoneHole){


      //this.portalmove.move(stoneBall,toStoneHole);
      //pathFinding will use stone ball as start and toStoneHole as target
      let pFM=this.pathFindingManager;

      let paths=pFM.search(stoneBall,toStoneHole);
      let getShortestPath=pFM.getShortestPath(paths);
      let milisecond=50;
      console.log(paths)
      this.walk(getShortestPath,5,milisecond);


   }
   walk(Path,durationSeconds,ms){
      if(!Path){return;}
      if(Path.length==0){
         return;
      }
      let squarePersecond=(durationSeconds*1000/Path.length);
      ms? squarePersecond=ms:squarePersecond;
      setWalkInterval(Path,squarePersecond);

   }
}

class portalMove extends movementType{
   constructor() {
      super();
      this.typeName="portalMove";
      this.price=150;
   }
   move(stoneBall,toStoneHole){
       //TransportationMovement
       toStoneHole.setStonedBall(stoneBall.getStonedBall());
       //this.game.score-=5;//priceFor PortalMovement
       stoneBall.makeEmpty();
   }
}
class copyMove extends movementType{
   constructor() {
      super();
      this.typeName="copyMove";
      this.price=150;
   }
    move(stoneBall,toStoneHole){
      var stoneballlBackupArenaHole=stoneBall.copy();
      toStoneHole.setStonedBall(stoneBall.getStonedBall());
      stoneBall.makeEmpty();
      stoneBall.setStonedBall(stoneballlBackupArenaHole.getStonedBall());
   }
}