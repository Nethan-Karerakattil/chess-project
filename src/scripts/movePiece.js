let prevTile;

document.querySelectorAll("tile").forEach(element => 
    element.addEventListener("click", e => {
        if(!prevTile && e.target.style.length > 0) prevTile = e.target;

        if(prevTile && !e.target.style.length > 0){
            const classes = e.target.className.split(" ");
            const prevClasses = prevTile.className.split(" ");

            addPiece(classes[0], prevClasses[2].slice(0, 5), prevClasses[2].slice(6, 15));

            prevTile.style.backgroundImage = "none";
            prevTile.style.removeProperty("background-image");
            prevTile.className = prevClasses[0] + " " + prevClasses[1];
            prevTile = undefined;
        }
    })
)

function addPiece(pos, color, piece){
    const target = document.getElementsByClassName(pos)[0];

    target.style.backgroundImage = "url('./images/"+ color +"-pieces/" + piece +".png')";
    target.classList.add(color + "-" + piece);
}