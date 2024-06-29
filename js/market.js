class marketManager{
    constructor(game) {
        this.game=game;
        this.arena=game.arena;
    }




}
class movementSelection{
    constructor(name,price,movementType) {
        this.name=name;
        this.price=price;
        this.movementType=movementType;
    }
}
class advantageSelection{
    constructor(name,price,movementType) {
        this.name=name;
        this.price=price;
        this.advantageType=movementType;
    }
}
var walkMovetype=new walkMove();
var portalMovetype=new portalMove();
var copyMovetype=new copyMove();
function setMovement(game,movement){
game.movementManager.activeMovetype=movement;
}

function removeAdvantageStone(game){
var selectedStoneHole=game.arena.SelectedStones[0].arenaStoneHole;
console.log(selectedStoneHole);
if(selectedStoneHole!=null){
    selectedStoneHole.makeEmpty();
    game.updateArena();
}
}