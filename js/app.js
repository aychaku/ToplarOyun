let ShapeLists=[];
ShapeLists.push(new ballShape());

//ShapeLists.push(new circleShape());
// ShapeLists.push(new squareShape());
// ShapeLists.push(new caroShape());
let ColorList=[];
//ColorList.push(new basicColor());
ColorList.push(new redColor());
ColorList.push(new greenColor());
ColorList.push(new blueColor());
ColorList.push(new yellowColor());
ColorList.push(new purpleColor());

function delay(time) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + time);
     }
  
let Maingame=new game("Maingame");

//
function lastArrayItem(array){
    let lastElement = array.pop();
    array.push(lastElement);
    return lastElement;
}
function getMap1(){
    let list='[[3,1],[4,1],[8,1],[2,2],[5,2],[7,2],[8,2],[3,3],[4,3],[8,3],[4,4],[5,4],[8,4],[2,5],[5,5],[7,6],[2,7],[3,7],[4,7],[3,8]]';
listObj=JSON.parse(list);
Maingame.arena.stoneHoleMap=Maingame.arena.createStoneHoleArenaMap();
listObj.forEach(element => {
    Maingame.addRandomBallAtPos(element[0],element[1])

});


}

let pulicWalkMovements=[];
//movementspeed square per second
function setWalkInterval(path,milisecondPerStation){
    pulicWalkMovements.push(path);
    let game=path[0].arenaStoneHole.game;
    let intervalminisec=milisecondPerStation;
    var timer=setInterval(() => {
        if(pulicWalkMovements.length>0){
            let movement=pulicWalkMovements[0];
                if(movement.length==1){
                    pulicWalkMovements.shift();
                }else{
                let element1=movement[0].arenaStoneHole;
                let element2=movement[1].arenaStoneHole;
                movement.shift()
                Maingame.movementManager.portalMove(element1,element2);
                Maingame.updateArena();
                }

        }else{
            game.pointCollector.collectPoints();
            window.clearInterval(timer);
            Maingame.updateArena();

        }
        
    }, intervalminisec);
}