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

        // if(legalSpots.length == 0) return;

        const classes = e.currentTarget.className.split(" ");
        const prevClasses = prevTile.className.split(" ");

        if(legalSpots.length != 0 && !legalSpots.includes(classes[0])) return;

        //Remove all dots
        const dots = document.querySelectorAll(".dot, .danger-dot");
        for (let i = dots.length - 1; i >= 0; i--) {
            dots[i].parentNode.removeChild(dots[i]);
        }

        //Remove piece from first tile
        prevTile.style.removeProperty("background-image");
        prevTile.className = prevClasses[0] + " " + prevClasses[1];

        //Remove piece from second tile (if any)
        e.currentTarget.style.removeProperty("background-image");
        e.currentTarget.className = classes[0] + " " + classes[1];

        //Add piece on first tile to second tile
        addPiece(classes[0], prevClasses[2].slice(0, 5), prevClasses[2].slice(6, 15));

        prevTile = undefined;
        legalSpots = [];
    })
)

function addPiece(pos, color, piece) {
    const target = document.getElementsByClassName(pos)[0];

    target.style.backgroundImage = "url('./images/" + color + "-pieces/" + piece + ".png')";
    target.classList.add(color + "-" + piece);
}

function calcLegalMoves(piece, coordinates) {
    const x = Number(coordinates.slice(0, 1));
    const y = Number(coordinates.slice(1, 2));

    switch (piece) {
        case "black-king":
            for (let i = -1; i <= 1; i++) {
                addLegalSpot((x + i).toString(), (y - 1).toString(), "black", "white");
                addLegalSpot((x + i).toString(), (y + 1).toString(), "black", "white");
            }
            addLegalSpot((x - 1).toString(), y.toString(), "black", "white");
            addLegalSpot((x + 1).toString(), y.toString(), "black", "white");
        break;

        case "white-king":
            for (let i = -1; i <= 1; i++) {
                addLegalSpot((x + i).toString(), (y - 1).toString(), "white", "black");
                addLegalSpot((x + i).toString(), (y + 1).toString(), "white", "black");
            }
            addLegalSpot((x - 1).toString(), y.toString(), "white", "black");
            addLegalSpot((x + 1).toString(), y.toString(), "white", "black");
        break;
    }

    function addLegalSpot(xPos, yPos, teamColor, enemyColor) {
        const element = document.getElementsByClassName(xPos + yPos)[0];
        if(!element) return;

        const pieceAtPos = element.className.split(" ")[2]?.slice(0, 5);
        const dot = document.createElement("div");

        if(pieceAtPos === teamColor) return;
        if(pieceAtPos === enemyColor) dot.classList.add("danger-dot");
        else dot.classList.add("dot");

        element.appendChild(dot);
        legalSpots.push(xPos + yPos);
    }
}   