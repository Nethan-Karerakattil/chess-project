//Load Tiles
const board = document.querySelector("board");

for(let i = 1; i <= 8; i++){
    for(let n = 1; n <= 8; n++){
        const element = document.createElement("tile")
        element.classList.add(i.toString() + n.toString())

        if((i % 2 == 0) == false && (n % 2 == 0) == false) element.classList.add("dark-tile")
        if((i % 2 == 0) == false && (n % 2 == 0) == true) element.classList.add("light-tile")
        if((i % 2 == 0) == true && (n % 2 == 0) == false) element.classList.add("light-tile")
        if((i % 2 == 0) == true && (n % 2 == 0) == true) element.classList.add("dark-tile")

        board.appendChild(element)
    }
}

//Add Pieces
addPiece("71", "black", "pawn");
addPiece("72", "black", "pawn");
addPiece("73", "black", "pawn");
addPiece("74", "black", "pawn");
addPiece("75", "black", "pawn");
addPiece("76", "black", "pawn");
addPiece("77", "black", "pawn");
addPiece("78", "black", "pawn");

addPiece("81", "black", "rook");
addPiece("82", "black", "horse");
addPiece("83", "black", "bishop");
addPiece("84", "black", "queen");
addPiece("85", "black", "king");
addPiece("86", "black", "bishop");
addPiece("87", "black", "horse");
addPiece("88", "black", "rook");

addPiece("21", "white", "pawn");
addPiece("22", "white", "pawn");
addPiece("23", "white", "pawn");
addPiece("24", "white", "pawn");
addPiece("25", "white", "pawn");
addPiece("26", "white", "pawn");
addPiece("27", "white", "pawn");
addPiece("28", "white", "pawn");

addPiece("11", "white", "rook");
addPiece("12", "white", "horse");
addPiece("13", "white", "bishop");
addPiece("14", "white", "queen");
addPiece("15", "white", "king");
addPiece("16", "white", "bishop");
addPiece("17", "white", "horse");
addPiece("18", "white", "rook");

function addPiece(pos, color, piece){
    const target = document.getElementsByClassName(pos)[0];

    target.style.backgroundImage = "url('./images/"+ color +"-pieces/" + piece +".png')";
    target.classList.add(color + "-" + piece);
}