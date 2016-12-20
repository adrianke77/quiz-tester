var questionInputsArray =
  [
    ["What is one plus one?", "3", "five", "six", "two"],
    ["What is five times six?", "2", "31", "30"],
    ["Who am I?", "3", "Jackie Chan", "The browser", "Who knows?"],
    ["What is eight minus two?", "1", "6", "ninja", "Thomas Edison", "don't trust the system"]
  ]

var questionsArray = []

var questionNow = 0 // 0 means question 1, etc
var currentPlayer = 1 // player 1 or 2
var playerScore = [0, 0] // playerScore[0] is player 1, playerScore[1] is player 2

function Question(question, correctAnswer, answersArray) {
  // Question constructor
  // any number of answers is acceptable
  this.question = question //string
  this.correctAnswer = correctAnswer //zero-based index for correct answer in answersArray
  this.answersArray = answersArray
  this.numberOfAnswers = answersArray.length
}

//MAIN CODE BODY:
setupQuestionsArray()
restart()
$(".start").on("click", function() {
  $(".start").addClass("hidden")
  $(".buttonBox").removeClass("hidden")
  drawQuestion()
})

function setupQuestionsArray() {
  var answersArray
  questionInputsArray.forEach(function(dataLine, idx, arr) {
    answersArray = []
    for (i = 2; i < dataLine.length; i++) {
      if (typeof dataLine[i] != "undefined") answersArray[i - 2] = dataLine[i]
    }
    questionsArray[idx] = new Question(dataLine[0], dataLine[1], answersArray)

  })
}

function restart() {
  questionNow = 0
  currentPlayer = 1 // 1 is player 1 
  playerScore = [0, 0]
}

function drawQuestion() {
  //display question
  var questionText = questionsArray[questionNow].question
  var questionNumberText = questionNow + 1
  $(".questionNo").text("question " + questionNumberText)
  $(".playerNo").text("This question is for player " + currentPlayer)
  $(".questionText").text(questionText)
  $(".buttonBox").empty()
  questionsArray[questionNow].answersArray.forEach(function(ele, idx, array) {
    $(".buttonBox").append("<button class = 'answer'>" + ele + "</button>")
    $(".buttonBox button").last().on("click", function() {
      var x = (playTurn(idx+1))
    })
  })

}

function playTurn(choice) {
  console.log("choice", choice, "played")
  console.log("current player is " + currentPlayer)
  
  if (isGameOver()) { // because test definition of isGameOver is different from program
    gameEnd()
    return false
  }
  var result = false
  console.log("current question is " + questionNow)
  console.log("current correct answer is " + questionsArray[questionNow].correctAnswer)
  if (questionsArray[questionNow].correctAnswer === choice.toString()) {
    console.log("correct answer detected")
    result = true
    playerScore[currentPlayer - 1]++
  }
  questionNow++
  console.log("question number after increment is", questionNow)
  console.log("current score is " + playerScore[0],playerScore[1])
  currentPlayer =
    currentPlayer === 1 ? 2 : 1
  if (isGameOver()) {
    gameEnd()
    return false
  }
  drawQuestion()
  return result
}


function gameEnd() {
  winCondition = whoWon()
  switch (winCondition) {
    case 1:
    $(".questionNo").text("the first of the players has won")
    break
    case 2:
    $(".questionNo").text("the second of the players has won")
    break
    case 3:
    $(".questionNo").text("nobody has won - nobody")
    break
  }
  $(".playerNo").text("and surviving this quiz makes your mind")
  $(".questionText").text("rot that little bit more")
  $(".buttonBox").empty().append("<button>I crave another round</button>")
  $(".buttonBox button").on("click",function() {
    restart()
    drawQuestion()
  })
}

function updateQuestionNo() {
  $(".questionNo").text("Question" + questionNow)
}

function numberOfQuestions() {
  return questionsArray.length
}

function currentQuestion() {
  return questionNow
}

function correctAnswer() {
  return questionsArray[questionNow].correctAnswer
}

function numberOfAnswers() {
  return questionsArray[questionNow].answersArray.length
}

function isGameOver() {
  return questionNow >= numberOfQuestions() ? true : false
}

function whoWon() {

  if (questionNow < questionsArray.length) return 0
  if (playerScore[0] === playerScore[1]) return 3
  return playerScore[0] > playerScore[1] ? 1 : 2
}