var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var input3 = document.getElementById('input3');
var input4 = document.getElementById('input4');
var input5 = document.getElementById('input5');
var input6 = document.getElementById('input6');

var button = document.getElementById('getMoney');
var results = document.getElementById('results');
var digits = document.getElementById('setDigits');


var inputs = [input1, input2, input3, input4, input5, input6];


button.addEventListener('click', function (e) {
  e.preventDefault();


  if (isItEmpty()) {
    if (isItDigit()) {
      if (isItInRange()) {
        if (isItRedundant()) {
          var shuffledDigits = shuffle();
          var hits = checkHits(shuffledDigits);
          showResults(hits);
        }
      }
    }
  }

});

digits.addEventListener('click', function(e){
  e.preventDefault();
  setDigits();
});

function setDigits(){
  var shuffledDigits = shuffle();
  for(var i = 0; i < shuffledDigits.length; i++){
    inputs[i].value = shuffledDigits[i];
  }
}



function showValidation(element, message){
  element.style.borderColor = 'red';
  results.innerText = message;

}

function showResults(hits) {

  var message = '';

  switch (hits.length) {
    case 4:
      message = 'Wygrałeś 5.000PLN';
      break;
    case 5:
      message = 'Wygrałeś 25.000PLN';
      break;
    case 6:
      message = 'Wygrałeś 10.000.000PLN';
      break;
    default:
      message = 'Nic nie wygrałeś, spróbuj jeszcze raz.'
  }

  results.innerText = 'Twoje trafienia: ' + hits.length + ' ' + message;
}


function isItEmpty() {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      showValidation(inputs[i], 'Pole jest puste');
      return false;
    }
  }
  return true;
}


function isItDigit() {
  for (var i = 0; i < inputs.length; i++) {
    if (isNaN(inputs[i].value)) {
      showValidation(inputs[i], 'Wartość nie jest cyfrą');
      return false;
    }
  }
  return true;
}


function isItInRange() {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value < 0 || inputs[i].value > 49) {
      showValidation(inputs[i], 'Wartość nie jest w przedziale 1-49');
      return false;
    }
  }
  return true;
}

function isItRedundant() {
  for (var i = 0; i < inputs.length; i++) {
    for (var j = 0; j < inputs.length; j++) {
      if (inputs[i].value === inputs[j].value && i !== j) {
        showValidation(inputs[i], 'Liczby się powtarzają');
        return false;
      }
    }
  }
  return true;
}


function shuffle() {
  var shuffledDigits = [];

  for (var i = 0; i < 6; i++) {
    var shuffledDigit = Math.round(Math.random() * 48 + 1);

    if (shuffledDigits.indexOf(shuffledDigit) === -1) {
      shuffledDigits.push(shuffledDigit);
    } else {
      i--;
    }
  }

  return shuffledDigits;
}


function checkHits(shuffledDigits) {

  var hits = [];

  for (var i = 0; i < inputs.length; i++) {
    for (var z = 0; z < inputs.length; z++) {
      if (parseInt(inputs[i].value, 10) === shuffledDigits[z]) {
        hits.push(inputs[i].value);
      }
    }
  }
  return hits;

}