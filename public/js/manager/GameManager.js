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

    // Game variables
    let previousLetterIndex = undefined;
    let unReachableIndex = [];

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

            for (let i = 1; i < 7; i++) {
                unReachableIndex.push((wordLength * i) - 1);
            }

            console.log(unReachableIndex)

            gameBoard.style.setProperty("width", (5 * wordLength).toString() + "rem");
            gameBoard.style.setProperty("grid-template-columns", "repeat(" + wordLength + ", 5rem)");
            gameBoard.style.setProperty("grid-template-rows", "repeat(" + chance + ", 5rem)");
        },


        // Listener
        onTyping(event){
            let key = event.key.toUpperCase();
            let children = gameBoard.children;
            if(key === "BACKSPACE") {
                if (previousLetterIndex !== undefined) {
                    children[previousLetterIndex + 1].textContent = ".";
                    if(!unReachableIndex.includes(previousLetterIndex)){
                        previousLetterIndex -= 1;
                    }
                }
            } else if(key === "ENTER") {
                //console.log(word)
                let tmp = 7 - chance;
                for (let i = (wordLength * tmp), j = 0; i < (wordLength * tmp) + wordLength; i++, j++) {
                    if(children[i].textContent === word[j]){
                        children[i].classList.add("green");
                    } else if(word.includes(children[i].textContent)){
                        children[i].classList.add("orange");
                    }
                }
                // CheckWin
                for (let i = 0, count = 0; i < wordLength; i++) {
                    if(children[i].textContent === word[i]){
                        count++
                        if(count === wordLength){
                            //console.log("Win")
                        }
                    }
                }

                // CheckLoose
                chance -= 1;
                if(chance <= 0){
                    //console.log("Looser")
                } else {
                    let tmp = 7 - chance;
                    for (let i = (wordLength * tmp); i < (wordLength * tmp) + wordLength; i++) {
                        children[i].textContent = "."
                    }
                    previousLetterIndex = undefined;
                }
            } else {
                for (let i = 0; i < children.length; i++) {
                    if(children[i].textContent === "."){
                        children[i].textContent = key;
                        if(i !== 0){
                            console.log(i)
                            previousLetterIndex = i - 1;
                        }
                        break;
                    }
                }
            }

            console.log("User has pressed key: " + key);
            console.log("PreviousLetterIndex: " + previousLetterIndex);
            console.log("Chance: " + chance);
        },
    }
})();