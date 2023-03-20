const DEFAULT_COLOR = 'rgba(0,0,0)';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 65;

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



//event listener for color picker
colorPicker.addEventListener('input', function(event){
    currentColor = event.target.value;
});

eraserButton.addEventListener('click', function(){
    currentMode = 'eraser';
});

colorButton.addEventListener('click', function(){
    currentMode = 'color';
});

rainbowButton.addEventListener('click', function(){
    currentMode = 'rainbow';

});

shadingButton.addEventListener('click', function(){
    currentMode = 'shading';

});

highlightButton.addEventListener('click', function(){
    currentMode = 'highlight';
});

clearButton.addEventListener('click', function(){
    createGrid(currSize);
    console.log('work');

});


function randomRGB(){
    //rgb(num,num,num)
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
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
            row.appendChild(column);
        }
    }


    //event listener for changing color of divs 
    const cells = document.querySelectorAll('.column');
    cells.forEach((cell) => {
        cell.addEventListener('mousedown', function(event){
            if(currentMode === 'color'){
                cell.setAttribute('style', `background-color: ${currentColor};`);
            }else if (currentMode === 'eraser'){
                cell.setAttribute('style', `background-color: #ffffff;`);
            }else if(currentMode === 'rainbow'){
                cell.setAttribute('style', `background-color: ${randomRGB()};`);
            }else if(currentMode === 'shading'){
                cell.setAttribute('style', `background-color: ${addShading(cell.style.backgroundColor)};`);
            }else if(currentMode === 'highlight'){
                cell.setAttribute('style',`background-color: ${addHighlight(cell.style.backgroundColor)};`);
            }
            console.log(cell.style.backgroundColor);
            
        });

        cell.addEventListener('mousemove', function(event){
            console.log(event.type);
            if (event.buttons === 1){
                if(currentMode === 'color'){
                    cell.setAttribute('style', `background-color: ${currentColor};`);
                }else if (currentMode === 'eraser'){
                    cell.setAttribute('style', `background-color: #ffffff;`);
                }else if(currentMode === 'rainbow'){
                    cell.setAttribute('style', `background-color: ${randomRGB()};`);
                }
            }
            
        });

    });


}


function toRGB(color){


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

