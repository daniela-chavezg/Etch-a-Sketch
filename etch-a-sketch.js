const DEFAULT_COLOR = 'rgba(0,0,0)';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 15;

let currSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

const container = document.querySelector('.container');
const colorPicker = document.querySelector('#colorPicker');
const eraserButton = document.querySelector('.eraser');
const colorButton = document.querySelector('.color');
const rainbowButton = document.querySelector('.rainbow');
const shadingButton = document.querySelector('.shading');
const clearButton = document.querySelector('.clear');
const highlightButton = document.querySelector('.highlight');
const slider = document.querySelector('#myRange');
const sliderCount = document.querySelector('.range-count');
const toggleGridButton = document.querySelector('.grid-lines');



//event listener for color picker

slider.addEventListener('change', function(){
    currSize = slider.value;
    sliderCount.textContent = `${slider.value} x ${slider.value}`;
    removeGrid();
    createGrid(currSize);
});

colorPicker.addEventListener('input', function(event){
    toggleButton(currentMode, colorButton);
    currentMode = 'color';
    currentColor = event.target.value;
});

eraserButton.addEventListener('click', function(){
    toggleButton(currentMode, eraserButton);
    currentMode = 'eraser';
});

colorButton.addEventListener('click', function(){
    toggleButton(currentMode, colorButton);
    currentMode = 'color';
    
});

rainbowButton.addEventListener('click', function(){
    toggleButton(currentMode, rainbowButton);
    currentMode = 'rainbow';
});

shadingButton.addEventListener('click', function(){
    toggleButton(currentMode, shadingButton);
    currentMode = 'shading';

});

highlightButton.addEventListener('click', function(){
    toggleButton(currentMode, highlightButton);
    currentMode = 'highlight';
});

clearButton.addEventListener('click', function(){
    removeGrid();
    createGrid(currSize);

});

toggleGridButton.addEventListener('click', function(){
    const columns = document.querySelectorAll('.column');
    columns.forEach((col) => {
        col.classList.toggle('grid-border');
    });

});

function toggleButton(currBrush, clickedBrush){
    if (currBrush !== clickedBrush.classList.item(0)){
        if (currBrush == 'color'){
            colorButton.classList.remove('active-button');
        } 
        else if(currBrush == 'eraser'){
            eraserButton.classList.remove('active-button');
        }
        else if(currBrush == 'rainbow'){
            rainbowButton.classList.remove('active-button');
        }
        else if(currBrush == 'shading'){
            shadingButton.classList.remove('active-button');
        }
        else if(currBrush == 'highlight'){
            highlightButton.classList.remove('active-button');
        }
        clickedBrush.classList.add('active-button');
    }

}

function removeGrid(){
    const grid = container.querySelectorAll(".row");
    for(let i = 0; i < grid.length; i++){
        container.removeChild(grid[i]);
}
}


function randomRGB(){
    //rgb(num,num,num)
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
}

function pickBrush(color){
    let brush;
    if(currentMode === 'color'){
        brush = currentColor;
    }else if (currentMode === 'eraser'){
        brush = 'rgb(255,255,255)'
    }else if(currentMode === 'rainbow'){
        brush = randomRGB();
    }else if(currentMode === 'shading'){
        brush = addShading(color);
    }else if(currentMode === 'highlight'){
        brush = addHighlight(color);
    }

    return brush;

}



//creates grid
function createGrid(num){
    for(let i=0; i < num; i ++){
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for(let i = 0; i < num; i ++){
            const column = document.createElement('div');
            column.classList.add('column')
            column.setAttribute('style', 'background-color: rgb(255, 255, 255);')
            row.appendChild(column);
        }
    }


    //event listener for changing color of divs 
    const cells = document.querySelectorAll('.column');
    cells.forEach((cell) => {
        cell.addEventListener('mousedown', function(event){
            cell.setAttribute('style', `background-color: ${pickBrush(cell.style.backgroundColor)};`);
        });

        cell.addEventListener('mousemove', function(event){
            console.log(event.type);
            if (event.buttons === 1){
                cell.setAttribute('style', `background-color: ${pickBrush(cell.style.backgroundColor)};`);
            }     
        });

    });


}




function addShading(color){
    //RGB(NUM,NUM,NUM)
    //slice string, split numbers into array and then subtract 10 from each
    //look up if javascript registers hex colors?
    let rgb = color.slice(4,color.length - 1);
    const rgbNums = rgb.split(',');
    for(let i = 0; i < rgbNums.length; i++){
        if (rgbNums != 0){
            rgbNums[i] = parseInt(rgbNums[i]) - 10;
        }       
    }
    return `rgb(${rgbNums[0]}, ${rgbNums[1]}, ${rgbNums[2]})`



}

function addHighlight(color){
    //RGB(NUM,NUM,NUM)
    //slice string, split numbers into array and then subtract 10 from each
    //look up if javascript registers hex colors?
    let rgb = color.slice(4,color.length - 1);
    const rgbNums = rgb.split(',');
    for(let i = 0; i < rgbNums.length; i++){
        if (rgbNums != 255){
            rgbNums[i] = parseInt(rgbNums[i]) + 10;
        }       
    }
    return `rgb(${rgbNums[0]}, ${rgbNums[1]}, ${rgbNums[2]})`



}


createGrid(currSize);

