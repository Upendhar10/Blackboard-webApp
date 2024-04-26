
let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let download = document.querySelector("#download");

let pencilColorList = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector("#pencil-width");

let eraserWidthElem = document.querySelector("#eraser-width");

let pencilWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let pencilColor = "white";  // Default color

// let eraserColor = getComputedStyle(document.body).getPropertyValue("background"); 
let eraserColor = "black";

let undobtn = document.querySelector("#undo");
let redobtn = document.querySelector("#redo");
 
// API
let screen = canvas.getContext("2d");

screen.strokeStyle = pencilColor;
screen.lineWidth = pencilWidth;

// # Pencil Color

pencilColorList.forEach((colorElem) => {
    colorElem.addEventListener("click",(e) => {
        let color = colorElem.id;
        pencilColor = color;
        screen.strokeStyle = pencilColor;
    })
});

pencilWidthElem.addEventListener("change",(e)=>{
    pencilWidth = pencilWidthElem.value;
    screen.lineWidth = pencilWidth;
})

// # eraser color 

eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth = eraserWidthElem.value;
    screen.lineWidth = eraserWidth;
})

eraser.addEventListener("click",()=> {
    if(eraserToggle){
        screen.strokeStyle = eraserColor;
        screen.lineWidth = eraserWidth;
    }else{
        screen.strokeStyle = pencilColor;
        screen.lineWidth = pencilWidth;
    }
})

// # download feature

download.addEventListener("click",(e) => {
    let url = canvas.toDataURL();

    let link = document.createElement("a");
    link.href = url;
    link.download = "board.png";
    link.click();
});

// store the data written on the board in the form of urls in an array

let undoHistory = [];
let redoHistory = [];

let mouseDownFlag = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mouseout", endDrawing);


function startDrawing(event){
    mouseDownFlag = true;
    screen.beginPath();
    screen.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);  
};

function draw(event) {
    if (!mouseDownFlag) return;
    drawLine({
		x : event.clientX - canvas.offsetLeft,
    	y : event.clientY - canvas.offsetTop,
		color : eraserToggle ? eraserColor : pencilColor,
    	width : eraserToggle ? eraserWidth : pencilWidth
	})
}

function drawLine(strokeObj){
    screen.strokeStyle = strokeObj.color;
    screen.lineWidth = strokeObj.width;
    screen.lineTo(strokeObj.x, strokeObj.y);
    screen.stroke();
}

function endDrawing(){
    mouseDownFlag = false;
    saveState();
}

function saveState(){
	undoHistory.push(canvas.toDataURL());
    redoHistory = [];
}

undobtn.addEventListener("click", undo);
redobtn.addEventListener("click", redo);

function undo() { 

	if (undoHistory.length < 2) return;
    redoHistory.push(undoHistory.pop());
    restoreState();
};

function redo(){

    if (redoHistory.length === 0) return;
    undoHistory.push(redoHistory.pop());
    restoreState();
};

function restoreState() {
    const img = new Image();
    img.onload = function() {
        screen.clearRect(0, 0, canvas.width, canvas.height);
        screen.drawImage(img, 0, 0);
    };
    img.src = undoHistory[undoHistory.length - 1];
}