let gameManager = (function () {

    socket.on("getWordOfTheDay", (wordOfTheDay) => {
        console.log(wordOfTheDay.length)
        word = wordOfTheDay;
        wordLength = wordOfTheDay.length;
        gameManager.createBoard();
    })

    let gameBoard = document.getElementById("gameBoard");
    let word = undefined
    let wordLength = undefined;
    let chance = 7;

    return {
        createBoard(){
            for (let i = 0; i < wordLength * chance; i++) {
                let div = document.createElement("div");
                div.setAttribute("index", i.toString());
                if(i < wordLength){
                    div.textContent = ".";
                }
                div.style.setProperty("width", "5rem");
                div.style.setProperty("height", "5rem");
                gameBoard.appendChild(div);
            }

            gameBoard.style.setProperty("width", (5 * wordLength).toString() + "rem");
            gameBoard.style.setProperty("grid-template-columns", "repeat(" + wordLength + ", 5rem)");
            gameBoard.style.setProperty("grid-template-rows", "repeat(" + chance + ", 5rem)");

        },
    }
})();