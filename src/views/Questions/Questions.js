import { images } from "../../../image-data/images";
import questionsStyles from "./Questions.css";
import { arrOfResolvedCards } from "../Score/Score";
import { ArtistsStore } from "../Categories/Categories";
import { correctAnswerAudio } from "../Settings/Settings";
import { wrongAnswerAudio } from "../Settings/Settings";
import { timeGameStatus } from "../Settings/Settings";
import { timeOnAnswer } from "../Settings/Settings";

const TIMESHOWMODALWINDOW = 1000;
const TIMERTICK = 1000;
class Questions {
  constructor(numberOfCategory) {
    this.correctQuestionCounter = 0;
    this.numberOfCategory = numberOfCategory;
    this.questionsState = [];
    this.questionsCounter = 0;
    this.stopBtnCounter = 0;
  }

  generateRandomQuestions(currentQuestion) {
    let setOfWrongAnswers = new Set();
    for (
      let i = this.numberOfCategory * 10;
      i < this.numberOfCategory * 10 + 10;
      i++
    ) {
      setOfWrongAnswers.add(images[i].author);
    }
    let shuffledWrongArr = Array.from(setOfWrongAnswers).sort(function () {
      return Math.random() - 0.5;
    });
    let test = shuffledWrongArr.slice(0, 3);
    let arrOfAnswers = test.concat([images[currentQuestion - 1].author]);
    return arrOfAnswers.sort(function () {
      return Math.random() - 0.5;
    });
  }

  endCategoryHandler() {
    let correctQuestion = this.correctQuestionCounter;
    let message = "";
    if (correctQuestion > 7) {
      message = "Awesome!";
    } else if (correctQuestion < 7 && correctQuestion > 4) {
      message = "Ok";
    } else {
      message = "I know you can do better";
    }

    ArtistsStore[this.numberOfCategory][2] = true;
    ArtistsStore[this.numberOfCategory - 1][1] = this.correctQuestionCounter; // make next card available, and save number of correct answers in category
    this.questionsCounter = 0;
    this.correctQuestionCounter = 0;
    this.stopBtnCounter = 0;

    return `        <div class="bodyModalWindowEndCategory">
    <div class="ModalWindowEndCategoryContainer ">
        <p class="EndCategory__Congratulations">
            ${message}
        </p>
        <p class="EndCategory__Result">${correctQuestion} / 10</p>

        ${
          message == "I know you can do better"
            ? ""
            : '<img src="./images/ModalWindowEnd/Congratulations.svg"></img>'
        }
        <div class="EndCategory_Controls">
            <button class="ModalWindowEndBtn ModalWindowEndBtn__NextBtn HomeBtn">HOME</button>
            <button class="ModalWindowEndBtn ModalWindowEndBtn__Home ModalWindow_NextQuizBtn">NEXT QUIZ</button>
        </div>
    </div>

</div>`;
  }

  createQuestions() {
    let questionFragment = []; // container for markdown
    for (
      let i = this.numberOfCategory * 10 - 9; // question start from 1, not from 0
      i < this.numberOfCategory * 10 + 1;
      i++
    ) {
      let answers = this.generateRandomQuestions(i);

      questionFragment.push(` 
      <header class="QuestionHeader">
                <div class="QuestionPause"><img class='QuestionPauseArtist_Btn' src="./images/Question/pause.svg"><p class='QuestionPause_Text'>2 / 2</p> </div>
                <p class="QuestionHead__Text"> WHO IS THE AUTHOR OF THIS PICTURE?</p>
                <div class='QuestionTimer'><img src="./images/Question/timer.svg"> <p class='QuestionTimer_Text'>${timeOnAnswer}</p></div>
            </header>
      <div class="QuestionWrapper">
          <div class="QuestionPicture">
              <img src="./images/pictures/${i - 1}.jpg">
          </div>
  
          <div class="QuestionPicture__Answers">
              <div class="QuestionPicture__Answer_left ${
                answers[0] == images[i - 1].author
                  ? "QuestionArtistCorrect"
                  : "QuestionArtistWrong"
              }">${answers[0]}</div>
              <div class="QuestionPicture__Answer_right ${
                answers[1] == images[i - 1].author
                  ? "QuestionArtistCorrect"
                  : "QuestionArtistWrong"
              }">${answers[1]}</div>
              <div class="QuestionPicture__Answer_left ${
                answers[2] == images[i - 1].author
                  ? "QuestionArtistCorrect"
                  : "QuestionArtistWrong"
              }">${answers[2]}</div>
              <div class="QuestionPicture__Answer_right ${
                answers[3] == images[i - 1].author
                  ? "QuestionArtistCorrect"
                  : "QuestionArtistWrong"
              }">${answers[3]}</div>
          </div>
      </div>
  </div>
  <div class="bodyModalWindow">
  <div class="ModalWindowContainer ">
      <div class="ModalWindowResult">
          <img class='ModalWindowResult__Correct' src="./images/ModalWindow/Correct.svg">
          <img class='ModalWindowResult__Wrong' src="./images/ModalWindow/wrong.svg">
      </div>

      <img src="./images/pictures/${i - 1}.jpg">
      <p class="ModalWindow__PictureTitle">${images[i - 1].author}</p>
      <p class="ModalWindow__PictureArtist">${images[i - 1].name}</p>
      <button class="ModalWindow__NextBtn">NEXT</button>
  </div>

</div>`);
      this.questionsState = questionFragment; // save actual questions in local state
    }
  }

  render() {
    this.createQuestions();
    if (this.questionsCounter === 10) {
      //check on last question in category
      return this.endCategoryHandler();
    } else {
      return this.questionsState[this.questionsCounter];
    }
  }
}

let numberOfQuestion = 1;
let NumberOfStop = 2;
export function getCategoryNumber(elem) {
  let currentCategoryElem = elem.closest(".CategoriesCard");
  if (currentCategoryElem) {
    let id = currentCategoryElem.getAttribute("CategoriesCardId");
    questions.numberOfCategory = Number(id);
    questionsContent = questions.render();
    setTimeout(checkTimer, 0);
  }
}

export function nextCategoryBtn(elem) {
  if (elem.classList.contains("ModalWindow_NextQuizBtn")) {
    let newNumberOfCategory = questions.numberOfCategory + 1;
    questions.numberOfCategory = newNumberOfCategory;
    questionsContent = questions.render();
    window.location = "/#/Question/";
    setTimeout(checkTimer, 0);
  }
}

export function changeQuestion(elem) {
  if (elem.classList.contains("ModalWindow__NextBtn")) {
    questions.questionsCounter++;
    window.location = `#/Question/?${questions.numberOfCategory}/${questions.questionsCounter}`;
    questionsContent = questions.render();
    setTimeout(checkTimer, 0);
  }
}

export function checkCorrectArtistAnswer(elem) {
  if (elem.classList.contains("QuestionArtistCorrect")) {
    elem.classList.add("QuestionArtist__correctAnswer");
    correctAnswerAudio.play();
    questions.correctQuestionCounter++;

    arrOfResolvedCards.push(
      (questions.numberOfCategory - 1) * 10 + questions.questionsCounter
    );
    showModalWindow(true);
  } else if (elem.classList.contains("QuestionArtistWrong")) {
    clearTimeout(setTimer);
    wrongAnswerAudio.play();
    elem.classList.add("QuestionArtist__wrongAnswer");
    showModalWindow(false);
  }
}

export function showModalWindow(status) {
  if (status) {
    setTimeout(() => {
      document
        .querySelector(".ModalWindowResult__Correct")
        .classList.add("ModalWindowResult__Show");
      document
        .querySelector(".bodyModalWindow")
        .classList.add("ModalWindowResult__Show");
    }, TIMESHOWMODALWINDOW);
  } else {
    setTimeout(() => {
      document
        .querySelector(".ModalWindowResult__Wrong")
        .classList.add("ModalWindowResult__Show");
      document
        .querySelector(".bodyModalWindow")
        .classList.add("ModalWindowResult__Show");
    }, TIMESHOWMODALWINDOW);
  }

  stopTimer = true;
}

let stopTimer = false;

function setTimer() {
  document.querySelector(
    ".QuestionPause_Text"
  ).textContent = `${NumberOfStop} / 2`;
  let timeOnAnswerCopy = timeOnAnswer;
  stopTimer = false;
  setTimeout(function timer() {
    document.querySelector(".QuestionTimer_Text").textContent =
      timeOnAnswerCopy;
    timeOnAnswerCopy--;
    if (timeOnAnswerCopy === -1) {
      showModalWindow(false);
      wrongAnswerAudio.play();
      timeOnAnswerCopy = 0;
      document.querySelector(".QuestionTimer_Text").textContent =
        timeOnAnswerCopy;
      return;
    } else if (stopTimer) {
      timeOnAnswerCopy = "";
      return;
    }
    setTimeout(timer, TIMERTICK);
  }, TIMERTICK);
}

let questions = new Questions(numberOfQuestion);
export let questionsContent = questions.render();

export function stopTimerHandler(elem) {
  if (elem.closest(".QuestionPauseArtist_Btn")) {
    if (NumberOfStop !== 0) {
      stopTimer = true;
      NumberOfStop--;
      document.querySelector(
        ".QuestionPause_Text"
      ).textContent = `${NumberOfStop} / 2`;
    }
  }
}

export function checkTimer() {
  if (timeGameStatus) {
    setTimer();
  } else {
    document.querySelector(".QuestionTimer").classList.add("visibilityHidden");
    document.querySelector(".QuestionPause").classList.add("visibilityHidden");
  }
}
