let prevTile;

document.querySelectorAll("tile").forEach(element => 
    element.addEventListener("click", e => {
        if(!prevTile && e.target.style.length > 0) return prevTile = e.target;

        if(prevTile){
            const classes = e.target.className.split(" ");
            const prevClasses = prevTile.className.split(" ");
    
            //Remove piece from first tile
            prevTile.style.backgroundImage = "none";
            prevTile.style.removeProperty("background-image");
            prevTile.className = prevClasses[0] + " " + prevClasses[1];
    
            //Remove piece from second tile (if any)
            e.target.style.backgroundImage = "none";
            e.target.style.removeProperty("background-image");
            e.target.className = classes[0] + " " + classes[1];
    
            //Add piece on first tile to second tile
            addPiece(classes[0], prevClasses[2].slice(0, 5), prevClasses[2].slice(6, 15));

            prevTile = undefined;
        }
    })
)

function addPiece(pos, color, piece){
    const target = document.getElementsByClassName(pos)[0];

    target.style.backgroundImage = "url('./images/"+ color +"-pieces/" + piece +".png')";
    target.classList.add(color + "-" + piece);
}