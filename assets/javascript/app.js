
var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "Who won the 1994 FIFA World Cup?",
  answers: ["Italy", "Argentina", "France", "Brazil"],
  correctAnswer: "Brazil",
  image:"assets/images/brazil.gif"
}, {
  question: "What are the home colors of the FC Barcelona uniform?",
  answers: ["Orange and White", "Black and White", "Blue and Red", "All Blue"],
  correctAnswer: "Blue and Red",
  image:"assets/images/messi.gif"
}, {
  question: "Who is the fastest football player in the world?",
  answers: ["Gareth Bale", "Jurgen Damm", "Lionel Messi", "Cristiano Ronaldo"],
  correctAnswer: "Gareth Bale",
  image:"assets/images/bale.gif"
}, {
  question: 'Which country has won the most World Cups?',
  answers: ["Argentina", "Brazil", "Germany", "Italy"],
  correctAnswer: "Brazil",
  image:"assets/images/brazilcup.gif"
}, {
  question: 'Which team has won the most Champions League titles?',
  answers: ["Real Madrid", "Barcelona", "Bayern Munich", "AC Milan"],
  correctAnswer: "Real Madrid",
  image:"assets/images/realmadrid.gif"
}, {
  question: "Who won the Ballon d'Or in 2017?",
  answers: ["Lionel Messi", "Neymar", "Gareth Bale", "Cristiano Ronaldo"],
  correctAnswer: "Cristiano Ronaldo",
  image:"assets/images/cr7.gif"
}, {
  question: "Which country hosted the firsr ever World Cup?",
  answers: ["Brazil", "Uruguay", "Argentina", "England"],
  correctAnswer: "Uruguay",
  image:"assets/images/uruguay.gif"
}, {
  question: "Which football club has the biggest stadium?",
  answers: ["Barcelona", "Manchester United", "Real Madrid", "Arsenal"],
  correctAnswer: "Barcelona",
  image:"assets/images/campnou.gif"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
