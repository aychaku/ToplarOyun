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
    var rColor;
    var ColorList=[];
     //ColorList.push(new basicColor());
    ColorList.push(new redColor());
    ColorList.push(new greenColor());
    ColorList.push(new blueColor());
    ColorList.push(new yellowColor());
    ColorList.push(new purpleColor());

    rColor=getRandom(ColorList);

    return rColor;
}