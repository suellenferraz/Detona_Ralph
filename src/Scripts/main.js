// Estado do jogo
const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#live"),
  },
  values: {
    gameVelocity: 1000,  // Velocidade do jogo
    hitPosition: 0,
    result: 0,
    curretTime: 30, // Tempo em segundos
    lives: 3, // Vidas do jogador
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

// Função para inicializar o jogo
function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0 || state.values.lives <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

// Função para tocar som
function playSound(audioName) {
  let audio = new Audio(`./src/Sounds/${audioName}`);
  audio.volume = 0.2;
  audio.play().catch((error) => {
    console.error("Erro ao reproduzir o áudio:", error);
  });
}

// Função para escolher uma posição aleatória para o inimigo
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;

  // Reseta a hitPosition após um tempo para permitir contagem de vidas apenas se não clicar
  setTimeout(() => {
    if (state.values.hitPosition) { // Se o hitPosition ainda é válido
      state.values.lives--;
      state.view.lives.textContent = `x${state.values.lives}`;
      state.values.hitPosition = null; // Reseta hitPosition para evitar múltiplas reduções de vida
    }
  }, state.values.gameVelocity);
}

// Função para adicionar evento de clique nas "casas"
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null; // Resetando após um acerto
        playSound("src_audio_next.wav"); // Chama o som
      }
    });
  });
}

// Função para inicializar o jogo
function initialize() {
  addListenerHitBox();
}

// Inicializa o jogo
init();