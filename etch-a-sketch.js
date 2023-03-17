const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 30

let currSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

const container = document.querySelector('.container');
const colorPicker = document.querySelector('#colorPicker');
const eraserButton = document.querySelector('.eraser');
const colorButton = document.querySelector('.color');


//event listener for color picker
colorPicker.addEventListener('input', function(event){
    currentColor = event.target.value;
});

eraserButton.addEventListener('click', function(){
    currentMode = 'eraser';
});

colorButton.addEventListener('click', function(){
    currentMode = 'color'
});




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
            }else if (currentMode = 'eraser'){
                cell.setAttribute('style', `background-color: #ffffff;`);
            }
            
        })

    })


}


createGrid(currSize);

