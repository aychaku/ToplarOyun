class basicDirection{

    constructor(){
        this.x=0;
        this.y=0;
    }
    addDirection(basicDirection){
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

 class directionManager{
    static dUp=new dUp();
    static dBottom=new dBottom();
    static dLeft=new dLeft();   
    static dRight=new dRight();


    constructor(){

    }
    static getSumDirections(directionSteps){
        var result=new basicDirection();
        directionSteps.forEach(element => {
            result.addDirection(element);
        });

        return result;
    }


 }