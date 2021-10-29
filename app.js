const selectionButtons = document.querySelectorAll("[data-id]");
const playerTitle = document.querySelector(".player-score");
const computerTitle = document.querySelector(".computer-score");
const playerEmoji = document.querySelector(".player-emoji");
const computerEmoji = document.querySelector(".computer-emoji");

//Keeps record of player and computer scores
let playerScore = 0;
let computerScore = 0;

incrementScores();

//Stores named value pairs of each game selection
const selections = [
  {
    name: "rock",
    emoji: "👊",
    defeats: "scissors",
  },

  {
    name: "paper",
    emoji: "✋",
    defeats: "rock",
  },

  {
    name: "scissors",
    emoji: "✌",
    defeats: "paper",
  },
];

//Invokes function for each button clicked
selectionButtons.forEach(button => {
  button.addEventListener("click", element => {
    const buttonName = button.dataset.id; //Stores buttons dataset-id to variable
    //Variable matches selections object to variable with same name
    const selection = selections.find(
      selection => selection.name === buttonName
    );
    computerChoice(selection); //Invokes playerSelection with selection name passed as arg
  });
});

function computerChoice(selection) {
  const randomNumber = Math.floor(Math.random() * selections.length);
  var computerSelection = selections[randomNumber];
  addSelection(selection, computerSelection);
  checkWinner(selection, computerSelection);
}

function addSelection(selection, computerSelection) {
  playerEmoji.innerHTML = selection.emoji;
  playerEmoji.classList.add("player-selection");
  computerEmoji.innerHTML = computerSelection.emoji;
  computerEmoji.classList.add("player-selection");
}

function checkWinner(selection, computerSelection) {
  if (selection.name === computerSelection.name) {
    console.log("draw");
  } else if (selection.defeats === computerSelection.name) {
    console.log("winner winner chicken dinner");
    playerScore++;
  } else if (computerSelection.defeats === selection.name) {
    console.log("you snooze ya lose");
    computerScore++;
  }
  incrementScores();
}

function incrementScores() {
  playerTitle.innerHTML = "Player :" + " " + playerScore;
  computerTitle.innerHTML = "Computer :" + " " + computerScore;

  if (playerScore >= 5) {
    var winAudio = new Audio("sounds/Win.wav");
    winAudio.play();
    resetGame();
  } else if (computerScore >= 5) {
    var loseAudio = new Audio("sounds/wrong.mp3");
    loseAudio.play();
    resetGame();
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
}
