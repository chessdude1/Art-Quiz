import questionPicturesStyles from "./QuestionPictures.css";
import { images } from "../../../image-data/images";
import { arrOfResolvedCards } from "../Score/Score";
import { PicturesStore } from "../CategoriesPictures/CategoriesPictures";
import { correctAnswerAudio } from "../Settings/Settings";
import { wrongAnswerAudio } from "../Settings/Settings";
import { showModalWindow } from "../Questions/Questions";
import { timeGameStatus } from "../Settings/Settings";
import { checkTimer } from "../Questions/Questions";
import { timeOnAnswer } from "../Settings/Settings";
class QuestionPictures {
  constructor(numberOfCategory) {
    this.correctQuestionCounter = 0;
    this.numberOfCategory = numberOfCategory;
    this.questionsState = [];
    this.questionsCounter = 0;
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
    PicturesStore[this.numberOfCategory][2] = true;
    PicturesStore[this.numberOfCategory - 1][1] = this.correctQuestionCounter; //устанавливаем для следующей карточки флаг, делающий ее цветной и записываем количество правильных ответов
    this.questionsCounter = 0; //обнуление счетчиков
    this.correctQuestionCounter = 0;
    return `        <div class="bodyModalWindowEndCategory">
    <div class="ModalWindowEndCategoryContainer ">
        <p class="EndCategory__Congratulations">
        ${message}
        </p>
        <p class="EndCategory__Result">${correctQuestion} / 10</p>

        ${
          message == "I know you can do better" ? (
            ""
          ) : (
            '<img src="./images/ModalWindowEnd/Congratulations.svg"></img>'
          )
        }
        <div class="EndCategory_Controls">
            <button class="ModalWindowEndBtn ModalWindowEndBtn__NextBtn HomeBtn">HOME</button>
            <button class="ModalWindowEndBtn ModalWindowEndBtn__Home ModalWindow_NextQuizPicturesBtn">NEXT QUIZ</button>
        </div>
    </div>

</div>`;
  }
  generateRandomQuestions(currentQuestion) {
    let setOfWrongAnswers = new Set();
    for (
      let i = this.numberOfCategory * 10;
      i < this.numberOfCategory * 10 + 10;
      i++
    ) {
      setOfWrongAnswers.add(images[i].imageNum);
    }
    let shuffledWrongArr = Array.from(setOfWrongAnswers).sort(function () {
      return Math.random() - 0.5;
    });
    let test = shuffledWrongArr.slice(0, 3);
    let arrOfAnswers = test.concat([images[currentQuestion - 1].imageNum]);
    return arrOfAnswers.sort(function () {
      return Math.random() - 0.5;
    });
  }
  createQuestions() {
    let questionFragment = []; // буфер в который мы складываем сгенерированную разметку вопросов
    for (
      let i = this.numberOfCategory * 10 - 9; //отсчет не с нуля, а с 1
      i < this.numberOfCategory * 10 + 1;
      i++
    ) {
      let answers = this.generateRandomQuestions(i);
      questionFragment.push(`<div class="bodyQuestionPicture">
      <header class="QuestionHeader">
      <div class="QuestionPause"><img class='QuestionPauseArtist_Btn' src="./images/Question/pause.svg"><p class='QuestionPause_Text'>2 / 2</p> </div>
      <p class="QuestionHead__Text"> Which is ${
        images[i - 1].author
      } picture?</p>
      <div class='QuestionTimer'><img src="./images/Question/timer.svg"> <p class='QuestionTimer_Text'>${timeOnAnswer}</p></div>
  </header>

      <div class="QuestionWrapper">
          <div class="QuestionPicture__PicturesBlock">
              <img src="./images/pictures/${answers[0]}.jpg">
              <img src="./images/pictures/${answers[1]}.jpg">
              <img src="./images/pictures/${answers[2]}.jpg">
              <img src="./images/pictures/${answers[3]}.jpg">
          </div>
  
          <div class="QuestionPicture__Answers">
              <div class="QuestionPicture__Answer_left ${
                answers[0] == images[i - 1].imageNum
                  ? "QuestionPictureCorrect"
                  : "QuestionPictureWrong"
              }" ">A</div>
              <div class="QuestionPicture__Answer_right ${
                answers[1] == images[i - 1].imageNum
                  ? "QuestionPictureCorrect"
                  : "QuestionPictureWrong"
              } ">B</div>
              <div class="QuestionPicture__Answer_left ${
                answers[2] == images[i - 1].imageNum
                  ? "QuestionPictureCorrect"
                  : "QuestionPictureWrong"
              }">C</div>
              <div class="QuestionPicture__Answer_right ${
                answers[3] == images[i - 1].imageNum
                  ? "QuestionPictureCorrect"
                  : "QuestionPictureWrong"
              }">D</div>
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
      <p class="ModalWindow__PictureTitle">${images[i - 1].name}</p>
      <p class="ModalWindow__PictureArtist">${images[i - 1].author}</p>
      <button class="ModalWindow__NextBtnPicture">NEXT</button>
  </div>
  
  </div>`);
      this.questionsState = questionFragment; // записываем актуальные вопросы из буфера в локальный стейт
    }
  }
  render() {
    this.createQuestions();
    if (this.questionsCounter == 10) {
      //прошли последнюю карточку
      return this.endCategoryHandler();
    } else {
      return this.questionsState[this.questionsCounter];
    }
  }
}

export function nextCategoryPicturesBtn(elem) {
  if (elem.classList.contains("ModalWindow_NextQuizPicturesBtn")) {
    let newNumberOfCategory = questionsPictures.numberOfCategory + 1;
    questionsPictures.numberOfCategory = newNumberOfCategory;
    questionsPicturesContent = questionsPictures.render();
    window.location = "/#/QuestionPictures/";
    setTimeout(checkTimer, 0);
  }
}

let numberOfQuestionPictures = 1;

let questionsPictures = new QuestionPictures(numberOfQuestionPictures);
export let questionsPicturesContent = questionsPictures.render();

export function getCategoryPicturesNumber(elem) {
  let currentCategoryPictureElem = elem.closest(".CategoriesCardPictures");
  if (currentCategoryPictureElem) {
    let id = currentCategoryPictureElem.getAttribute("CategoriesCardId");
    questionsPictures.numberOfCategory = Number(id);
    questionsPicturesContent = questionsPictures.render();
    setTimeout(checkTimer, 0);
  }
}

export function changeQuestionPicture(elem) {
  if (elem.classList.contains("ModalWindow__NextBtnPicture")) {
    questionsPictures.questionsCounter++;
    window.location = `#/QuestionPictures/?${questionsPictures.numberOfCategory}/${questionsPictures.questionsCounter}`;
    questionsPicturesContent = questionsPictures.render();
    setTimeout(checkTimer, 0);
  }
}
export function checkCorrectPictureAnswer(elem) {
  if (elem.classList.contains("QuestionPictureCorrect")) {
    elem.classList.add("QuestionPicture__correctAnswer");
    questionsPictures.correctQuestionCounter++;
    correctAnswerAudio.play();
    arrOfResolvedCards.push(
      (questionsPictures.numberOfCategory - 1) * 10 +
        questionsPictures.questionsCounter
    );
    showModalWindow(true);
  } else if (elem.classList.contains("QuestionPictureWrong")) {
    wrongAnswerAudio.play();
    elem.classList.add("QuestionPicture__Wrong");
    showModalWindow(false);
  }
}
