var attemptCount = -1;
var wrongAttempts = 0;
var luckyAttempts = 0;
var startButton = document.querySelector('.start');
var nextButton = document.querySelector('.nextquest');
var resetButton = document.querySelector('.reset');
var numberBox = document.querySelector('.number');
var choices = document.querySelectorAll('.choices .choice');

function startGame() {
  startButton.style.display = 'none';
  nextButton.style.display = 'block';
  resetButton.style.display = 'block';

  reset();
  choices.forEach(function(choice) {
    choice.querySelector('.choice-text').classList.add('hidden'); 
    choice.addEventListener('click', function() {
      hideChoicesText();
      showNumber(this); 
    });
  });
}

function nextQuest() {
  var randomNumbers = generateRandomNumbers(3);
  var displayedChoice = randomNumbers[0];
  numberBox.textContent = displayedChoice;

  choices.forEach(function(choice) {
    choice.removeEventListener('click', checkAnswer); 
    choice.addEventListener('click', checkAnswer); 
    choice.querySelector('.choice-text').classList.add('hidden');
    choice.classList.remove('shown'); 
  });

  var x = Math.floor(Math.random() * 3);
  choices[x].querySelector('.choice-text').textContent = displayedChoice;

  if (x === 0) {
    choices[1].querySelector('.choice-text').textContent = getRandomNumberExcluding(displayedChoice);
    choices[2].querySelector('.choice-text').textContent = getRandomNumberExcluding(displayedChoice, choices[1].querySelector('.choice-text').textContent);
  }

  if (x === 1) {
    choices[0].querySelector('.choice-text').textContent = getRandomNumberExcluding(displayedChoice);
    choices[2].querySelector('.choice-text').textContent = getRandomNumberExcluding(displayedChoice, choices[0].querySelector('.choice-text').textContent);
  }

  if (x === 2) {
    choices[0].querySelector('.choice-text').textContent = getRandomNumberExcluding(displayedChoice);
    choices[1].querySelector('.choice-text').textContent = getRandomNumberExcluding(displayedChoice, choices[0].querySelector('.choice-text').textContent);
  }

  attemptCount++;
  updateAttemptsCount();

  if (attemptCount === 10) {
    nextButton.style.display = 'none';
    resetButton.firstChild.textContent = 'Test Your Luck';
  } else {
    nextButton.style.display = 'block';
  }
}

function checkAnswer() {
  var clickedChoice = parseInt(this.querySelector('.choice-text').textContent);
  var displayedChoice = parseInt(document.querySelector('.number').textContent);

  if (clickedChoice === displayedChoice) {
    luckyAttempts++;
  } else {
    wrongAttempts++;
  }

  choices.forEach(function(choice) {
    var hiddenNumber = choice.querySelector('.hidden-number');
    hiddenNumber.style.visibility = 'visible';
    choice.classList.add('shown'); 
  });

  nextButton.style.display = 'block';
  resetButton.style.display = 'block';
  updateAttemptsCount();

  if (attemptCount === 10) {
    nextButton.style.display = 'none';
    resetButton.firstChild.textContent = 'Test Your Luck';
  }

  // Show all choices after a choice is clicked
  choices.forEach(function(choice) {
    var choiceText = choice.querySelector('.choice-text');
    choiceText.classList.remove('hidden');
  });
}


function resetGame() {
  reset();
  startButton.style.display = 'block';
  nextButton.style.display = 'none';
  resetButton.firstChild.textContent = 'Reset';
  resetButton.removeEventListener('click', resetGame);
  resetButton.addEventListener('click', reset);
}

function reset() {
  attemptCount = 0;
  wrongAttempts = 0;
  luckyAttempts = 0;
  updateAttemptsCount();
  numberBox.textContent = '';

  choices.forEach(function(choice) {
    var hiddenNumber = choice.querySelector('.hidden-number');
    hiddenNumber.style.visibility = 'hidden';
    choice.querySelector('.choice-text').classList.add('hidden'); 
    choice.classList.remove('shown');
  });

  nextButton.style.display = 'block';
  resetButton.style.display = 'none';

}

function updateAttemptsCount() {
  document.querySelector('.attempts').textContent = 'Attempts: ' + attemptCount + '/10';
  document.querySelector('.wrong').textContent = 'Wrong Attempts: ' + wrongAttempts + '/10';
  document.querySelector('.lucky').textContent = 'Lucky Attempts: ' + luckyAttempts + '/10';
}

function showNumber(choice) {
  const choiceText = choice.querySelector('.choice-text');
  choiceText.classList.remove('hidden'); 
}

function hideChoicesText() {
  choices.forEach(function(choice) {
    choice.querySelector('.choice-text').classList.add('hidden'); 
  });
}

function generateRandomNumbers(count) {
  var randomNumbers = [];

  while (randomNumbers.length < count) {
    var randomNumber = generateRandomNumber();

    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
}

function getRandomNumberExcluding(excludeNumber, previousNumber = '') {
  var randomNumber;

  do {
    randomNumber = generateRandomNumber();
  } while (randomNumber === excludeNumber || randomNumber === previousNumber);

  return randomNumber;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
