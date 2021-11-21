import questionPicturesStyles from "./QuestionPictures.css";
import { images } from "../../../image-data/images";
import { arrOfResolvedCards } from "../Score/Score";
import { PicturesStore } from "../CategoriesPictures/CategoriesPictures";

class QuestionPictures {
  constructor(numberOfCategory) {
    this.correctQuestionCounter = 0;
    this.numberOfCategory = numberOfCategory;
    this.questionsState = [];
    this.questionsCounter = 0;
  }
  endCategoryHandler() {
    let correctQuestion = this.correctQuestionCounter;
    PicturesStore[this.numberOfCategory][2] = true;
    PicturesStore[this.numberOfCategory - 1][1] = this.correctQuestionCounter; //устанавливаем для следующей карточки флаг, делающий ее цветной и записываем количество правильных ответов
    this.questionsCounter = 0; //обнуление счетчиков
    this.correctQuestionCounter = 0;
    return `        <div class="bodyModalWindowEndCategory">
    <div class="ModalWindowEndCategoryContainer ">
        <p class="EndCategory__Congratulations">
            CONGRATULATIONS
        </p>
        <p class="EndCategory__Result">${correctQuestion} / 10</p>

        <img src="./images/ModalWindowEnd/Congratulations.svg">
        <div class="EndCategory_Controls">
            <button class="ModalWindowEndBtn ModalWindowEndBtn__NextBtn HomeBtn">HOME</button>
            <button class="ModalWindowEndBtn ModalWindowEndBtn__Home">NEXT QUIZ</button>
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
      <header class="QuestionHead">Which is ${
        images[i - 1].author
      } picture?</header>
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

let numberOfQuestionPictures = 1;

let questionsPictures = new QuestionPictures(numberOfQuestionPictures);
export let questionsPicturesContent = questionsPictures.render();

export function getCategoryPicturesNumber(elem) {
  let currentCategoryPictureElem = elem.closest(".CategoriesCardPictures");
  if (currentCategoryPictureElem) {
    let id = currentCategoryPictureElem.getAttribute("CategoriesCardId");
    questionsPictures.numberOfCategory = Number(id);
    questionsPicturesContent = questionsPictures.render();
  }
}

export function changeQuestionPicture(elem) {
  if (elem.classList.contains("ModalWindow__NextBtnPicture")) {
    questionsPictures.questionsCounter++;
    window.location = `#/QuestionPictures/?${questionsPictures.numberOfCategory}/${questionsPictures.questionsCounter}`;
    questionsPicturesContent = questionsPictures.render();
  }
}
export function checkCorrectPictureAnswer(elem) {
  if (elem.classList.contains("QuestionPictureCorrect")) {
    elem.classList.add("QuestionPicture__correctAnswer");
    questionsPictures.correctQuestionCounter++;

    arrOfResolvedCards.push(
      (questionsPictures.numberOfCategory - 1) * 10 +
        questionsPictures.questionsCounter
    );
    setTimeout(() => {
      document
        .querySelector(".ModalWindowResult__Correct")
        .classList.add("ModalWindowResult__Show");
      document
        .querySelector(".bodyModalWindow")
        .classList.add("ModalWindowResult__Show");
    }, 1000);
  } else if (elem.classList.contains("QuestionPictureWrong")) {
    elem.classList.add("QuestionPicture__Wrong");
    setTimeout(() => {
      document
        .querySelector(".ModalWindowResult__Wrong")
        .classList.add("ModalWindowResult__Show");
      document
        .querySelector(".bodyModalWindow")
        .classList.add("ModalWindowResult__Show");
    }, 1000);
  }
}