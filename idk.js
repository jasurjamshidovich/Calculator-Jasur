const screen = document.querySelector(".screen");
let buffer = "";
let operator = "";
let previousNumber;
function handleInput(value){
    if (isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
}
function calculateAnswer(){
    if (operator ===null){
        return;
    }
    else{
        switch(operator){
            case"+":
            screen.innerText=parseInt(previousNumber)+parseInt(buffer);
            break;
            case"-":
            screen.innerText=parseInt(previousNumber)-parseInt(buffer);
            break;
            case"*":
            screen.innerText=parseInt(previousNumber)*parseInt(buffer);
            break;
            case"/":
            screen.innerText=parseInt(previousNumber)/parseInt(buffer);
            break;
        }
        buffer = screen.innerText;
        operator=null;
    }
}
function handleSymbol(value){
    switch(value){
        case"/":
        case"*":
        case"-":
        case"+":
        operator=value;
        previousNumber=buffer;
        buffer="";
        SVGFEFuncRElement.innerText=0;
        break;
        case"C":
        buffer=0;
        rerender();
        break;
        case"<-":
        if(screen.innerText.length < 2){
            buffer = 0;
        }
        else{
            buffer = buffer.slice(0,-1);
        }
        rerender();
        break;
        case"=":
        calculateAnswer();
    }
}
function handleNumber(value){
    if(buffer === 0){
        buffer = value;
    }
    else {
        buffer = buffer + value.toString();
    }
    rerender();
}
function rerender(){
    screen.innerText = buffer;
}
function init(){
    document
    .querySelector(".button-sections")
    .addEventListener("click",function(e){
        handleInput(e.target.innerText);
    });
}
init();