const state = {
    view: {
        squares: documents.queySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        time: document.querySelector('.time .label:contains("Time") + .value'),
        score: document.querySelector('.score .label:contains("Score") + .value'),
     },
    valeus: {}

};

function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
  }

function addListenerHitBox(){}


function init() {
    randomSquare();
}

init();