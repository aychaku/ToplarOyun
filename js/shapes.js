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
    var ShapeLists=[];
    ShapeLists.push(new ballShape());
    //ShapeLists.push(new circleShape());
    ShapeLists.push(new squareShape());
    ShapeLists.push(new caroShape());

    var rShape=getRandom(ShapeLists);

    return rShape;
}