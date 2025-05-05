let turnBackMovements=[];
function turnBackMove(){
    if(turnBackMovements.length>0){
        let session=turnBackMovements.pop();
        Maingame.score=session.score;
        document.getElementById("MaingamexInput").value=session.x;
        document.getElementById("MaingameyInput").value=session.y;
        Maingame.setStoneAddCountVal(session.stoneAddCount);
        Maingame.setStoneCollectCountVal(session.stoneCollectCountVal);
        Maingame.setGameArena();
        Maingame.arena.stoneHoleMap=Maingame.arena.createStoneHoleArenaMap();
        session.arenaMapHole.forEach(element => {
            Maingame.addBallAtPosWithColorShapeForLoad(element[0],element[1],element[2],element[3])
        
        });
    }else{
        alert("Geri alıncacak hareket yok.");
    }
}
function pushTurnBackMove(){
    let currentSession=getCurrentGame();
    turnBackMovements.push(currentSession);
}
function getCurrentGame(recordName){
    let saveDate=new Date();
    let saveName=saveDate.toISOString().slice(0,10)
    //[ []  ,gameSession,gameSession]

    let thisGameSession=new gameSession(recordName);
    
    //get holemap
    let holemap=[];
    Maingame.arena.getFullStoneholes().forEach(Element=>{
        holemap.push([Element.xPos,Element.yPos,ColorList.indexOf(Element.ballStoneHole.color),ShapeLists.indexOf(Element.ballStoneHole.Shape)]);
    })
    thisGameSession.score=Maingame.score;
    thisGameSession.arenaMapHole=holemap;
    thisGameSession.x=Maingame.arena.x;
    thisGameSession.y=Maingame.arena.y;
    thisGameSession.stoneAddCount=Maingame.getStoneAddCountVal();
    thisGameSession.stoneCollectCountVal=Maingame.getStoneCollectCountVal();

    return thisGameSession;
}
function saveGame(){
    let saveName=prompt("Kayıt Edilen oyun için isim gir");
    let currentGame=getCurrentGame(saveName);
    addToSessionList(currentGame);
    updateSaveMenuList();
    return currentGame;
}
function deleteGameSession(gameSessionIndex){
    let sessions=getSessionList();
    let newSessions=[];
    sessions.forEach(session=>{
        if(sessions.indexOf(session)!=gameSessionIndex){
        newSessions.push(session);
        }
    });
    setSessionList(newSessions);
    updateSaveMenuList();
}
function loadGame(gameSessionIndex){
    let session=getSession(gameSessionIndex);
    Maingame.score=session.score;
    document.getElementById("MaingamexInput").value=session.x;
    document.getElementById("MaingameyInput").value=session.y;
    Maingame.setStoneAddCountVal(session.stoneAddCount);
    Maingame.setStoneCollectCountVal(session.stoneCollectCountVal);
    Maingame.setGameArena();
    Maingame.arena.stoneHoleMap=Maingame.arena.createStoneHoleArenaMap();
    session.arenaMapHole.forEach(element => {
        Maingame.addBallAtPosWithColorShapeForLoad(element[0],element[1],element[2],element[3])
    
    });

}
function updateSaveMenuList(){
    let loadElementrow=document.getElementById("savedListMenu");
    loadElementrow.innerHTML="";
    let loadList=getSessionList();
    
    while(loadList.length>0){
        let session=loadList[loadList.length-1];
        let sessionIndex=loadList.indexOf(session);
        let loadSpan=document.createElement("span");
        let sessionElement=document.createElement("button");
        let br=document.createElement("br");
        let deleteBtn=document.createElement("button");
        deleteBtn.setAttribute("onclick","deleteGameSession("+sessionIndex+")");
        deleteBtn.innerText=`✕`;

        sessionElement.innerText=session.saveName;
        sessionElement.setAttribute("onclick","loadGame("+sessionIndex+")");

        loadSpan.append(sessionElement);
        loadSpan.append(deleteBtn);
        loadElementrow.append(br);
        loadElementrow.append(loadSpan);
        loadList.pop();
    }
    



}
const setSessionKey="toplarOyun";

function getSessionList(){
    let sessions=JSON.parse(localStorage.getItem(setSessionKey));
    if(!sessions){sessions=[];}
    let sessionsObjs=[];
    sessions.forEach(item=>{
        sessionsObjs.push(gameSession.parseObj(item));
    });

    return sessionsObjs;
}
function getSession(gameSessionIndex){
    let sessions=getSessionList();
    let session=sessions[gameSessionIndex];

    return session;
}
function setSessionList(sessionList){
    let sessionListJsonStr=JSON.stringify(sessionList);
    localStorage.setItem(setSessionKey,sessionListJsonStr);
}
function addToSessionList(gameSessionClass){
    let sessionLists=getSessionList();
    sessionLists.push(gameSessionClass);
    setSessionList(sessionLists);
}

class gameSession{
    constructor(recordName=""){
        this.saveName="Oyun: "+recordName;
        this.saveDate=new Date();
        this.arenaMapHole;
        this.score;
        this.x;
        this.y;
        this.stoneAddCount;
        this.stoneCollectCountVal;
    }
    static parseObj(obj){
        let ret = new gameSession();
        ret.saveName=obj.saveName;
        ret.saveDate=obj.saveDate;
        ret.arenaMapHole=obj.arenaMapHole;
        ret.score=obj.score;
        ret.x=obj.x;
        ret.y=obj.y;
        ret.stoneAddCount=obj.stoneAddCount;
        ret.stoneCollectCountVal=obj.stoneCollectCountVal;

        return ret;
    }

}