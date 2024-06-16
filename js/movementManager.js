class movementManager{
    constructor(game){
    this.game=game;
    this.arena=game.arena;
    this.pathfinder=new pathFinder(this.game);
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

}
