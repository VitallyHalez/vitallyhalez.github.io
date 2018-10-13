var socket = new WebSocket('wss://jamboapp.herokuapp.com')

let game = new Set()

socket.onmessage = function(event) {
    handleMessage(JSON.parse(event.data));
}

socket.onopen = function(event) {
    $(field).unbind('click');
    progress.hidden = true;
}

socket.onerror=function(event) {
    console.log(event);
}
/*
    Для отображения победной комбинации можно создать победный сет, и отправлять его. 
    Затем по его данным перерисовать в другой цвет победную комбинацию.
*/
function handleMessage(message) {
    if (message.method === "restart") {
        location.href = "game.html";
    }
    else if (message.method === "renderonclient") {
        renderClient(message.game);
    }
    else if (message.method === "Winner"){
        result.innerText="Вы победили поздравляем";
        $(field).bind('click',function(){return false;});
    }
    else if (message.method === "Lose"){
        result.innerText="К сожалению вы проиграли";
        $(field).bind('click',function(){return false;});
    }
    else if (message.method === "msgtoclient"){
        let date = new Date();

        let dateFormated = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:`
        
        if(date.getMinutes() < 10)
            dateFormated += `0${date.getMinutes()}`
        else
            dateFormated += `${date.getMinutes()}`

        allmsg.appendChild(createMsg(inpmsg.value, dateFormated));
        allmsg.scrollTop = 9999;
    }
    else return;
}

function renderClient(gameArray){
    gameArray.forEach(function(item) {
        box = document.querySelector(`#${item}`);
        box.style.backgroundColor="rgb(211, 193, 32)";
        game.add(item);
    });

    $(field).unbind('click');
    result.innerText="ВАШ ХОД";
}