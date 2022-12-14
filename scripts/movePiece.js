let prevTile;
let legalSpots = [];

document.querySelectorAll("tile").forEach(element =>
    element.addEventListener("click", e => {
        if (!prevTile && e.currentTarget.style.length > 0) {
            //Show all Legal Moves
            const classNames = e.currentTarget.className.split(" ");
            calcLegalMoves(classNames[2], classNames[0]);

            return prevTile = e.currentTarget;
        }

        if(legalSpots.length == 0) return;

        if(e.currentTarget === prevTile) return removeAllDots();

        const classes = e.currentTarget.className.split(" ");
        const prevClasses = prevTile.className.split(" ");

        if(legalSpots.length != 0 && !legalSpots.includes(classes[0])) return;

        //Remove piece from first tile
        prevTile.style.removeProperty("background-image");
        prevTile.className = prevClasses[0] + " " + prevClasses[1];

        //Remove piece from second tile (if any)
        e.currentTarget.style.removeProperty("background-image");
        e.currentTarget.className = classes[0] + " " + classes[1];

        //Add piece on first tile to second tile
        addPiece(classes[0], prevClasses[2].slice(0, 5), prevClasses[2].slice(6, 15));

        //Remove all dots
        removeAllDots();
    })
)

function calcLegalMoves(piece, coordinates) {
    const x = Number(coordinates.slice(0, 1));
    const y = Number(coordinates.slice(1, 2));

    switch (piece) {
        case "black-king":
            for (let i = -1; i <= 1; i++) {
                addLegalSpot(x + i, y - 1, "white");
                addLegalSpot(x + i, y + 1, "white");
            }
            addLegalSpot(x - 1, y, "white");
            addLegalSpot(x + 1, y, "white");
        break;

        case "white-king":
            for (let i = -1; i <= 1; i++) {
                addLegalSpot(x + i, y - 1, "black");
                addLegalSpot(x + i, y + 1, "black");
            }
            addLegalSpot(x - 1, y, "black");
            addLegalSpot(x + 1, y, "black");
        break;

        case "black-queen":
            drawLine("x + i", "y - i", "white");
            drawLine("x - i", "y + i", "white");
            drawLine("x - i", "y - i", "white");
            drawLine("x + i", "y + i", "white");
            drawLine("x + i", "y", "white");
            drawLine("x - i", "y", "white");
            drawLine("x", "y + i", "white");
            drawLine("x", "y - i", "white");
        break;
        
        case "white-queen":
            drawLine("x + i", "y - i", "black");
            drawLine("x - i", "y + i", "black");
            drawLine("x - i", "y - i", "black");
            drawLine("x + i", "y + i", "black");
            drawLine("x + i", "y", "black");
            drawLine("x - i", "y", "black");
            drawLine("x", "y + i", "black");
            drawLine("x", "y - i", "black");
        break;

        case "black-bishop":
            drawLine("x + i", "y - i", "white");
            drawLine("x - i", "y + i", "white");
            drawLine("x - i", "y - i", "white");
            drawLine("x + i", "y + i", "white");
        break;

        case "white-bishop":
            drawLine("x + i", "y - i", "black");
            drawLine("x - i", "y + i", "black");
            drawLine("x - i", "y - i", "black");
            drawLine("x + i", "y + i", "black");
        break;

        case "black-rook":
            drawLine("x + i", "y", "white");
            drawLine("x - i", "y", "white");
            drawLine("x", "y + i", "white");
            drawLine("x", "y - i", "white");
        break;

        case "white-rook":
            drawLine("x + i", "y", "black");
            drawLine("x - i", "y", "black");
            drawLine("x", "y + i", "black");
            drawLine("x", "y - i", "black");
        break;

        case "black-horse":
            addLegalSpot(x - 1, y - 2, "white");
            addLegalSpot(x + 1, y - 2, "white");
            addLegalSpot(x + 2, y - 1, "white");
            addLegalSpot(x + 2, y + 1, "white");
            addLegalSpot(x + 1, y + 2, "white");
            addLegalSpot(x - 1, y + 2, "white");
            addLegalSpot(x - 2, y + 1, "white");
            addLegalSpot(x - 2, y - 1, "white");
        break;

        case "white-horse":
            addLegalSpot(x - 1, y - 2, "black");
            addLegalSpot(x + 1, y - 2, "black");
            addLegalSpot(x + 2, y - 1, "black");
            addLegalSpot(x + 2, y + 1, "black");
            addLegalSpot(x + 1, y + 2, "black");
            addLegalSpot(x - 1, y + 2, "black");
            addLegalSpot(x - 2, y + 1, "black");
            addLegalSpot(x - 2, y - 1, "black");
        break;

        case "black-pawn":
            addLegalSpot(x - 1, y, "white");
            if(x == 7) addLegalSpot(x - 2, y, "white");
        break;

        case "white-pawn":
            addLegalSpot(x + 1, y, "white");
            if(x == 2) addLegalSpot(x + 2, y, "white");
    }

    function drawLine(xVal, yVal, oppositeColor){
        for(let i = 1; i <= 8; i++){
            const addSpot = addLegalSpot(eval(xVal), eval(yVal), oppositeColor);

            if(addSpot === "enemy") return;
            if(addSpot === "team") return;
        }
    }

    function addLegalSpot(xPos, yPos, enemyColor) {
        xPos = xPos.toString();
        yPos = yPos.toString();

        const element = document.getElementsByClassName(xPos + yPos)[0];
        if(!element) return;

        const teamColor = piece.split("-")[0];
        const pieceAtPos = element.className.split(" ")[2]?.slice(0, 5);
        const dot = document.createElement("div");

        if(pieceAtPos === teamColor) return "team";
        if(pieceAtPos === enemyColor){
            dot.classList.add("danger-dot")
            element.appendChild(dot);
            legalSpots.push(xPos + yPos);
            return "enemy";
        }
        dot.classList.add("dot");

        element.appendChild(dot);
        legalSpots.push(xPos + yPos);
    }
}

function addPiece(pos, color, piece){
    const target = document.getElementsByClassName(pos)[0];

    target.style.backgroundImage = "url('./images/" + color + "-pieces/" + piece + ".png')";
    target.classList.add(color + "-" + piece);
}

function removeAllDots(){
    const dots = document.querySelectorAll(".dot, .danger-dot");
    for (let i = dots.length - 1; i >= 0; i--) {
        dots[i].parentNode.removeChild(dots[i]);
    }

    prevTile = undefined;
    legalSpots = [];
}