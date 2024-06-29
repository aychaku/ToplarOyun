class movementManager{
    constructor(game){
    this.game=game;
    this.arena=game.arena;
    this.pathfinder=new pathFinder(this.game);
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
   }
   move(stoneBall,toStoneHole){
       //TransportationMovement
       toStoneHole.setStonedBall(stoneBall.getStonedBall());
       //this.game.score-=5;//priceFor PortalMovement
       stoneBall.makeEmpty();
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