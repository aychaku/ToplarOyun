class basicColor{
    constructor(){
        this.color="Black";

    }
    getColor(){
        return this.color;
    }

}
class redColor extends basicColor{
    constructor(){
        super();
        this.color="Red";
    }
    getColor(){
        return super.getColor();
    }
}
class greenColor extends basicColor{
    constructor(){
        super();
        this.color="Green";
    }    
    getColor(){
        return super.getColor();
    }
}
class blueColor extends basicColor{
    constructor(){
        super();
        this.color="Blue";
    }
    getColor(){
        return super.getColor();
    }
}
class yellowColor extends basicColor{
    constructor(){
        super();
        this.color="Yellow";
    }
    getColor(){
        return super.getColor();
    }
}
class purpleColor extends basicColor{
    constructor(){
        super();
        this.color="Purple";
    }
    getColor(){
        return super.getColor();
    }
}
function getRandomColor(){
    var glovalColorList=ColorList;


    var rColor=getRandom(glovalColorList);

    return rColor;
}