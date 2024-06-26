class basicShape{
    constructor(){
        
        this.Shape="Basic"

    };

     getShape(){
       return this.Shape;
     };

}
class ballShape extends basicShape{
    constructor(){
        super();
        this.Shape="Ball"
    };
    getShape(){
        return this.Shape;
    }

}
class squareShape extends basicShape{
    constructor(){
        super();
        this.Shape="Square"
    };  
      getShape(){
        return this.Shape;
    }

}
class caroShape extends basicShape{
    constructor(){
        super();
        this.Shape="Caro"
    };  
      getShape(){
        return this.Shape;
    }

}
class circleShape extends basicShape{
    constructor(){
        super();
        this.Shape="Circle"
    };  
      getShape(){
        return this.Shape;
    }


}
function getRandomShape(){
    var globalShapeLists=ShapeLists;


    var rShape=getRandom(globalShapeLists);

    return rShape;
}