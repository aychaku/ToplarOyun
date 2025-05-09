class basicDirection{

    constructor(){
        this.x=0;
        this.y=0;
        this.reverse;
    }
    getType(){
        return this.x+"-"+this.y;
    }
    addDirection(basicDirection){
        if(!basicDirection){
            basicDirection=new basicDirection()
            alert(`basic direction null`)
            console.log(this)    
        }
        this.x+=basicDirection.x;
        this.y+=basicDirection.y;

    }
    getHypotenuse(){
        var hypotenuseLength=0;
        var xSqr=Math.pow(this.x,2);
        var ySqr=Math.pow(this.y,2);
        hypotenuseLength=Math.sqrt(xSqr+ySqr);
        return hypotenuseLength;

    }
    setReverse(setReverse){
        this.reverse=setReverse;
    }
    getReverse(){
        if(this.reverse){
            return this.reverse;
        }else{
            return this;
        }
    }

 }
 class dUp extends basicDirection{
    constructor(){
        super();
        this.y=-1;
    }

 }
 class dBottom extends basicDirection{
    constructor(){
        super();
        this.y=1;
    }

 }
 class dRight extends basicDirection{
    constructor(){
        super();
        this.x=1;
    }

 }
 class dLeft extends basicDirection{
    constructor(){
        super();
        this.x=-1;
    }

 }


 let publicdUp=new dUp();
 let publicdBottom=new dBottom();
 let publicdLeft=new dLeft();   
 let publicdRight=new dRight();
 publicdUp.setReverse(publicdBottom);
 publicdBottom.setReverse(publicdUp);
 publicdLeft.setReverse(publicdRight);
 publicdRight.setReverse(publicdLeft);

 class directionManager{
    static dUp=publicdUp;
    static dBottom=publicdBottom;
    static dLeft=publicdLeft;   
    static dRight=publicdRight;

    constructor(){
    }
    static getSumDirections(directionSteps=[]){
        var result=new basicDirection();
        directionSteps.forEach(element => {
            result.addDirection(element);
        });

        return result;
    }

    static getPreferredDirectionsByHole(area1,area2){
        let res = [];
        let verticalDis = area2.yPos - area1.yPos;
        let horizontalDis = area2.xPos - area1.xPos;


        let primaryDirection;
        let secondaryDirection;
        let horiDir = directionManager.getHorizontalDirectionByDistance(horizontalDis);
        let vertiDir = directionManager.getVerticalDirectionByDistance(verticalDis);
        
            if (Math.abs(verticalDis) < Math.abs(horizontalDis)) {
                primaryDirection =horiDir ;
                secondaryDirection = vertiDir;
            }
            else{
                primaryDirection = vertiDir;
                secondaryDirection = horiDir;

            }
            res.push(primaryDirection);
            res.push(secondaryDirection);
            res.push(secondaryDirection.getReverse());
            res.push(primaryDirection.getReverse());
        return res;
    }
    static getVerticalDirectionByDistance(distance){
        let res=directionManager.dBottom;
        if(distance<0){res= directionManager.dUp;}
        return res;
    }
    static getHorizontalDirectionByDistance(distance){
        let res=directionManager.dRight;
        if(distance<0){res= directionManager.dLeft;}
        return res;
    }





 }