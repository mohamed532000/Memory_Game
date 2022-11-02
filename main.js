// function start the game 

let hideGameDiv = document.getElementById("start-button-div");
let startButton = document.getElementById("start-button");
let mainDeuration = 1000;

startButton.onclick = ()=>{
    hideGameDiv.style.display = "none"
};


// function access on username of player

let username = prompt("enter user name please..");
let usernamePlace = document.getElementById("username");
let userTrying = document.getElementById("userTryeing");

function usernameFunction() {
    if(username === "" || username === null) {
        usernamePlace.innerHTML = "Unknown";
    }else {
        usernamePlace.innerHTML = username
    }
}
usernameFunction()


// function shuffeling the all boxes

let gameBoxes = document.querySelectorAll(".boxes-content .box");
let arrayOfGameBoxes = Array.from(gameBoxes);
let orderArray = [...Array(arrayOfGameBoxes.length).keys()];

function shffelfunction(array) {

    let current = array.length,
        storeCurrent,
        random

        while(current > 0) {

            random = Math.floor(Math.random() * current);

            // store the current index

            // the main idea is replace the place of current index to place of the random index in the our array of game boxes
            storeCurrent = array[current];

            array[current] = array[random];

            array[random] = storeCurrent;

            current--;

        }

}
shffelfunction(orderArray);


// function flip the box and add the random index from order array
gameBoxes.forEach((box , indexFromOrderArray)=>{

    box.onclick = ()=>{
        box.classList.add("is-fliped");
        stopClicking();
    }
    box.style.order = orderArray[indexFromOrderArray];
})


// add no clicking on content of the all boxes;

function stopClicking() {
    let contentOfBoxes = document.querySelector(".boxes-content");
    let flipBoxes = arrayOfGameBoxes.filter(flipBox => flipBox.classList.contains("is-fliped"));

    
    if(flipBoxes.length === 2) {
        contentOfBoxes.classList.add("no-clicking");
        chick(flipBoxes[0] , flipBoxes[1]);
    }

    setTimeout(()=>{
        contentOfBoxes.classList.remove("no-clicking")
    } , mainDeuration)

};


// call sounds of game 
let correctSound = document.getElementById("correct");
let wrongSound = document.getElementById("wrong");

function chick(firstBox , secondBox) {
    if(firstBox.getAttribute("boxdata") === secondBox.getAttribute("boxdata")) {

        firstBox.classList.remove("is-fliped");
        secondBox.classList.remove("is-fliped");

        firstBox.classList.add("has-matched");
        secondBox.classList.add("has-matched");

        correctSound.play();
        
    }else {
        setTimeout(()=>{
            firstBox.classList.remove("is-fliped");
            secondBox.classList.remove("is-fliped");
        } , mainDeuration);

        userTrying.innerHTML = parseInt(userTrying.innerHTML)+1;
        userTrying.style.color = 'red';

        wrongSound.play()
    }
}