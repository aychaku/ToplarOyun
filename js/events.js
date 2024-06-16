function toggleClass(documentObj,classStr){
    documentObj.classList.toggle(classStr);
}
function removeClass(documentObj,classStr){
    documentObj.classList.remove(classStr);
}
function addClass(documentObj,classStr){
    documentObj.classList.add(classStr);
}
function isNull(element){
result=true;
if(element!=null){
result=false;
}
return result;
}
function removeFromArray(array,remove){
newarray=[]
array.forEach(element => {
    if (element!=remove) {
        newarray.push(element);
    }
});
    return newarray;


}