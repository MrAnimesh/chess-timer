const btnWhitePlayer = document.querySelector(".white-player-btn")
const btnBlackPlayer = document.querySelector(".black-player-btn")
const btnResetTimer = document.getElementById("btn-reset-timer")
const btnPauseTimer = document.getElementById("btn-pause-timer")
const btnSetTimer = document.getElementById("btn-set-timer")
const ipTime = document.getElementById("ip-time")

const whiteTime = document.getElementById("white-time")
const whiteMove = document.getElementById("white-move")
const blackTime = document.getElementById("black-time")
const blackMove = document.getElementById("black-move")

let mainTime = 60000
let wTime = bTime = mainTime
let wMinute = bMinute = 0
let wSecond = bSecond = 0
let whiteFlag = blackFlag = false
let wMove = 0
let bMove = 0

// resetimer()


function resetimer(){
    wTime = bTime = mainTime
    wMinute = bMinute = ((wTime / 1000) / 60)
    wSecond = bSecond = ((wTime / 1000) % 60)
    whiteFlag = blackFlag = false
    wMove = bMove = 0
    whiteMove.innerText = "Move"
    blackMove.innerText = "Move"
    if (mainTime < 60000){
        whiteTime.innerText = "00" + " : " + wSecond
        blackTime.innerText = "00" + " : " + bSecond
    }else{
        check()
    }
    
}

function check(){
    if (((mainTime/1000) / 60) < 10){
        whiteTime.innerText =  "0"+wMinute + " : " + wSecond+"0"
        blackTime.innerText = "0"+bMinute + " : " + bSecond+"0"
    }else{
        whiteTime.innerText = wMinute + " : " + wSecond+"0"
        blackTime.innerText = bMinute + " : " + bSecond+"0"
    }
}

function playerWhiteTimer(){
    if (whiteFlag == true){
        if (wTime > 0){
           wTime -= 1000    
            wMinute = Math.floor((wTime / 1000) / 60)
            wSecond = Math.floor((wTime / 1000) % 60)
            // wMilis = Math.floor((time % 100))
            
            whiteTime.innerText = wMinute<10? "0"+wMinute + " : " + (wSecond > 10? wSecond : "0"+wSecond) : wMinute + " : " + wSecond 
            
            setTimeout(playerWhiteTimer, 1000)
        }
    }
}
function playerBlackTimer(){
    if (blackFlag == true){
        if (bTime > 0){
           bTime -= 1000    
            bMinute = Math.floor((bTime / 1000) / 60)
            bSecond = Math.floor((bTime / 1000) % 60)
            
            blackTime.innerText = bMinute<10 ? "0"+bMinute + " : " + (bSecond > 10? bSecond : "0"+bSecond)  :bMinute + " : " + bSecond 
            
            setTimeout(playerBlackTimer, 1000)
        }
    }
}
btnBlackPlayer.addEventListener("click", ()=>{
    playAudio()
    whiteFlag = true
    blackFlag = false
    btnWhitePlayer.disabled = false
    btnBlackPlayer.disabled = true
    bMove+=1
    blackMove.innerText = "Move: "+ bMove
    playerWhiteTimer()
    playerBlackTimer()

})
btnWhitePlayer.addEventListener("click", ()=>{
    playAudio()
    whiteFlag = false
    blackFlag = true
    btnWhitePlayer.disabled = true
    btnBlackPlayer.disabled = false
    wMove+=1
    whiteMove.innerText = "Move: "+ wMove
    playerWhiteTimer()
    playerBlackTimer()
})
btnResetTimer.addEventListener("click",()=>{
    resetimer()
})
btnPauseTimer.addEventListener("click",()=>{
    whiteFlag = false
    blackFlag = false
    playerWhiteTimer()
    playerBlackTimer()
})

btnSetTimer.addEventListener("click",()=>{
    let temp = parseFloat(ipTime.value)
    temp < 1 ? mainTime = temp * 100000 : mainTime = temp * 60000
    resetimer()

})

function playAudio(){
    new Audio('tap.mp3').play()
}


