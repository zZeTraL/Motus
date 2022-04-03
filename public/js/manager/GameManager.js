let gameManager = (function () {

    socket.on("getWordOfTheDay", (wordOfTheDay) => {
        console.log(wordOfTheDay.length)
        word = wordOfTheDay;
        wordLength = wordOfTheDay.length;
        gameManager.createBoard();
    })

    let gameBoard = document.getElementById("gameBoard");
    let gameResult = document.getElementById("gameResult")
    let word = undefined
    let wordLength = undefined;
    let chance = 7;

    // Game variables
    let previousLetterIndex = undefined;
    let unReachableIndex = [];
    let savedRow = [];

    return {
        createBoard(){
            for (let i = 0; i < wordLength * chance; i++) {
                let div = document.createElement("div");
                div.setAttribute("index", i.toString());
                if(i < wordLength){
                    div.textContent = ".";
                    savedRow.push(i);
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

        checkWin(){
            let children = gameBoard.children;
            let tmp = 7 - chance;
            for (let i = (wordLength * tmp), j = 0, count = 0; i < (wordLength * tmp) + wordLength; i++, j++) {
                if(children[i].textContent === word[j]){
                    count++
                    if(count === wordLength){
                        console.log("Win")
                        gameResult.textContent = "You have found the mystery word!!! (" +  ((7 - chance) + 1).toString() + ")"
                    }
                }
            }
        },

        checkLoose(){
            let children = gameBoard.children;
            if(chance <= 0){
                console.log("Looser")
            } else {
                let tmp = 7 - chance;
                for (let i = (wordLength * tmp); i < (wordLength * tmp) + wordLength; i++) {
                    children[i].textContent = "."
                    savedRow.push(i);
                }
                previousLetterIndex = undefined;
            }
        },

        isRowFull(){
            let children = gameBoard.children;
            for (let i = 0; i < savedRow.length; i++) {
                if(children[savedRow[i]].textContent === "."){
                    return false;
                }
            }
            return true;
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

                if(gameManager.isRowFull()){

                    let tmp = 7 - chance;
                    for (let i = (wordLength * tmp), j = 0; i < (wordLength * tmp) + wordLength; i++, j++) {
                        if(children[i].textContent === word[j]){
                            children[i].classList.add("green");
                        } else if(word.includes(children[i].textContent)){
                            children[i].classList.add("orange");
                        }
                    }

                    // CheckWin
                    gameManager.checkWin();

                    // CheckLoose
                    chance -= 1;
                    gameManager.checkLoose();
                }
            } else {
                for (let i = 0; i < children.length; i++) {
                    if(children[i].textContent === "."){
                        children[i].textContent = key;
                        savedRow.push(i);
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