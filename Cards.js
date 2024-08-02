"use strict"

let cards = document.querySelectorAll(".card");
let buttonStart = document.querySelector(".start");
let buttonAdjust = document.querySelectorAll(".adjustButton");
let difficultyInput = document.querySelector(".difficultyInput");
let infoText = document.querySelector(".info");
let rightBoxes = [];
let difficulty = 4;
let gameRuning = false;
let winCount = 0;
let numberOfCards = 30;

///////////////////
function generateRightBoxes()
{
    for(let i = 0; i < difficulty; i++)
    {
        let randomNumber;
        randomNumber = Math.round((Math.random() * numberOfCards) + 1);
        while(checkRepeatedNumber(randomNumber))
        {
            randomNumber = Math.round((Math.random() * numberOfCards) + 1);
        }
        rightBoxes.unshift(randomNumber);
    }
    //console.log(rightBoxes);
}

function checkRepeatedNumber(randomNumber)
{
    for(let i = 0; i < rightBoxes.length; i++)
    {
        if(rightBoxes[i] === randomNumber)
        {
            return true;
        }
    }
    return false;
}

function turnOnBoxes()
{
    for(let i = 0; i < rightBoxes.length; i++)
    {
        for(let j = 0; j < cards.length; j++)
        {
            if(rightBoxes[i] === Number(cards[j].className.split(" ")[0]))
            {
                cards[j].style.backgroundColor = "#0732aa";
                break;
            }
        }
    }
}

function checkTheBoxes(button)
{
    if(gameRuning)
    {
        for(let i = 0; i < rightBoxes.length; i++)
            {
                if(Number(button.target.className.split(" ")[0]) === rightBoxes[i])
                {
                    button.target.style.backgroundColor = "#07aa46";
                    button.target.style.pointerEvents = "none";
                    winCount++;
                    checkGameWin();
                    return;
                }
            }
        
            button.target.style.backgroundColor = "#db3d3d";
            checkGameOver("You Lose");
    }
}

function checkGameWin()
{
    if(winCount === rightBoxes.length)
    {
        checkGameOver("You Win");
    }
}

function checkGameOver(textToDisplay)
{
    winCount = 0;
    rightBoxes = [];
    gameRuning = false;
    infoText.innerHTML = textToDisplay;
}

function cleanBoard()
{
    cards.forEach(Element => 
        {
            Element.style.backgroundColor = "#E9C46A";
            Element.style.pointerEvents = "auto";
        });
}

function startGame()
{
    if(!gameRuning)
    {
        infoText.innerHTML = "click on the boxes you saw in blue";
        cleanBoard();
        gameRuning = true;
        generateRightBoxes();
        turnOnBoxes();
        setTimeout(cleanBoard,100);
    }
}

function changeDifficulty(event)
{
    if(event.target.textContent === ">" && difficulty < 10)
    {
        difficulty++;
        difficultyInput.value = difficulty;
        console.log(difficulty);
    }
    else if(event.target.textContent === "<" && difficulty > 4)
    {
        difficulty--;
        difficultyInput.value = difficulty;
        console.log(difficulty);
    }
}

for(let i = 0; i < cards.length; i++)
{
    cards[i].addEventListener("click",checkTheBoxes);
}

buttonStart.addEventListener("click",startGame);

buttonAdjust.forEach(Element => {Element.addEventListener("click",changeDifficulty)});