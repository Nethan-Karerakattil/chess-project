//Load Tiles
const board = document.querySelector("board");

for(let i = 1; i <= 8; i++){
    for(let n = 1; n <= 8; n++){
        let element = document.createElement("tile")
        element.classList.add(i.toString() + n.toString())

        if((i % 2 == 0) == false && (n % 2 == 0) == false) element.classList.add("dark-tile")
        if((i % 2 == 0) == false && (n % 2 == 0) == true) element.classList.add("light-tile")
        if((i % 2 == 0) == true && (n % 2 == 0) == false) element.classList.add("light-tile")
        if((i % 2 == 0) == true && (n % 2 == 0) == true) element.classList.add("dark-tile")

        board.appendChild(element)
    }
}