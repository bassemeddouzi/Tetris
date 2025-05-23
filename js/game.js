var teterominos=[
    {
        name:"carry",
        cellPrincipaleIndex:9,
        cells:[5,6,15,16],
        nextLeft:nextLeft,
        nextRight:nextRight,
        nextDown:nextDown
    },
    {name:"line"},
    {name:"z"},
    {name:"T"},
    {name:"point"}
]
function nextLeft(){
    if((this.cells[0]%10)-1<0||(this.cells[2]%10)-1<0){
        return false
    }
    for(var i=0;i<this.cells.length;i++){
        this.cells[i]--
    }
}
function nextRight(){
    if((this.cells[0]%10)+1>9||(this.cells[2]%10)+1>9){
        return false
    }
    for(var i=0;i<this.cells.length;i++){
        this.cells[i]++
    }
}
function nextDown(){
        for(var i=0;i<this.cells.length;i++){
        this.cells[i]=this.cells+10
    }
}


addEventListener("DOMContentLoaded", (event) => { 
function init(){
    timerTostart()
    dropTetormino()
}
function timerTostart(){
    setTimeout(function(){
        document.getElementById("timerValue").innerText=4
    },1000)
    setTimeout(function(){
        document.getElementById("timerValue").innerText=3
    },2000)
    setTimeout(function(){
        document.getElementById("timerValue").innerText=2
    },3000)
    setTimeout(function(){
        document.getElementById("timerValue").innerText=1
    },4000)
    setTimeout(function(){
        document.getElementById("timer-to-start").style.display="none"
    },5000)
    
}
function dropTetormino(){
    var curentTet= creatTetormino()
    document.getElementById("moveLeft").addEventListener('click',function(){
        curentTet.nextLeft()
    })
    document.getElementById("moveRight").addEventListener('click',function(){
        curentTet.nextRight()
    })
    var i=1
    while(true){
        setTimeout(function(){

        },i*1000)
    }

}
function creatTetormino(){
    return teterominos[0]
}
init()







})
