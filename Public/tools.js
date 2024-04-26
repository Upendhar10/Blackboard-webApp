// # Splash

const Splash = document.querySelector(".Splash");
let duration = 1500;

function removeSplash(){
    Splash.classList.add("remove-splash");
}

setTimeout(()=>{
    removeSplash();
},duration);


// # Tools

let MenuCont = document.querySelector('.Menu-cont');
let iconElement = MenuCont.children[0];

let toolsCont = document.querySelector('.tools-cont');
toolsCont.style.display = "none";

let pencil = document.querySelector('#pencil');
let eraser = document.querySelector('#eraser');

let pencilToolCont = document.querySelector('.pencil-tool-cont');
let eraserToolCont = document.querySelector('.eraser-tool-cont');

pencilToolCont.style.display = "none"
eraserToolCont.style.display = "none"

let stickyNotes = document.querySelector("#stickyNotes")

// true -> hide toolsCont , show menu symbol
// false -> show toolsCont , hide close symbol

let MenuContFlag = true;

MenuCont.addEventListener("click",() => {
    MenuContFlag = !MenuContFlag;
    if(MenuContFlag) OpenToolsCont();
    else CloseToolsCont();
});

function OpenToolsCont(){
    iconElement.classList.remove("fa-xmark");
    iconElement.classList.add("fa-bars");
    toolsCont.style.display = "none";

    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

function CloseToolsCont(){
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-xmark");
    toolsCont.style.display = "grid";
}

eraserToggle = false;
eraser.addEventListener("click",()=>{

    eraserToggle = !eraserToggle;

    if(eraserToggle){
        eraserToolCont.style.display = "flex";
        eraser.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px";
    }else {
        eraserToolCont.style.display = "none";
        eraser.style.boxShadow = "none";
    }

});

pencilToggle = false;
pencil.addEventListener("click",()=>{

    pencilToggle = !pencilToggle;

    if(pencilToggle){
        pencilToolCont.style.display = "flex";
        pencil.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px";
    }else {
        pencilToolCont.style.display = "none";
        pencil.style.boxShadow = "none";
    }
});


// # Sticky Notes

stickyNotes.addEventListener("click",(e) => {

    // stickyNotes.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px";

    let stickyTemplateHTML = `
    <div class="sticky-header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
    <div class="sticky-body-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `
    createSticky(stickyTemplateHTML);
})

// # CreateSticky
function createSticky(stickyTemplateHTML){
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");

    stickyActions(minimize,remove,stickyCont);

    stickyCont.onmousedown = function(event) {
        DragAndDrop(stickyCont,event);
    };
        
      stickyCont.ondragstart = function() {
          return false;
    };
}

// # Drag and Drop function

function DragAndDrop(element,event){
    
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    // document.body.append(element);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
}

// # StickyActions

function stickyActions(minimize,remove,stickyCont){

    minimize.addEventListener("click",()=>{
        let stickyBodyCont = stickyCont.querySelector('.sticky-body-cont');
        let display = getComputedStyle(stickyBodyCont).getPropertyValue("display");

        if(display === "block") {
            stickyBodyCont.style.display = "none";
            
        }else {
            stickyBodyCont.style.display = "block";
        };
    });

    remove.addEventListener("click",()=>{
        stickyCont.remove();
    });
}


// # UpladImage

let UploadImg = document.querySelector('#UploadImg');

UploadImg.addEventListener("click",()=>{
    // open file explorer
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="sticky-header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
            </div>
        <div class="sticky-body-cont">
            <img src="${url}" id="ImgUpload"/>
        </div>
        `
        createSticky(stickyTemplateHTML);
    })   
});
