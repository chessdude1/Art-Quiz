import { images } from "../../../image-data/images";
import questionsStyles from "./Questions.css";
import { arrOfResolvedCards } from "../Score/Score";
import { ArtistsStore } from "../Categories/Categories";
import { correctAnswerAudio } from "../Settings/Settings";
import { wrongAnswerAudio } from "../Settings/Settings";
class Questions {
  constructor(numberOfCategory) {
    this.correctQuestionCounter = 0;
    this.numberOfCategory = numberOfCategory;
    this.questionsState = [];
    this.questionsCounter = 0;
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
    ArtistsStore[this.numberOfCategory][2] = true;
    ArtistsStore[this.numberOfCategory - 1][1] = this.correctQuestionCounter; //устанавливаем для следующей карточки флаг, делающий ее цветной и записываем количество правильных ответов
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
  createQuestions() {
    let questionFragment = []; // буфер в который мы складываем сгенерированную разметку вопросов
    for (
      let i = this.numberOfCategory * 10 - 9; //отсчет не с нуля, а с 1
      i < this.numberOfCategory * 10 + 1;
      i++
    ) {
      //если первая карточка вопросы 0 - 10, вторая 10-20
      let answers = this.generateRandomQuestions(i);

      questionFragment.push(` 
      <div class="bodyQuestionPicture">
      <header class="QuestionHead">WHO IS THE AUTHOR OF THIS PICTURE?</header>
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

let numberOfQuestion = 1;

export function getCategoryNumber(elem) {
  let currentCategoryElem = elem.closest(".CategoriesCard");
  if (currentCategoryElem) {
    let id = currentCategoryElem.getAttribute("CategoriesCardId");
    questions.numberOfCategory = Number(id);
    questionsContent = questions.render();
  }
}

export function changeQuestion(elem) {
  if (elem.classList.contains("ModalWindow__NextBtn")) {
    questions.questionsCounter++;
    window.location = `#/Question/?${questions.numberOfCategory}/${questions.questionsCounter}`;
    questionsContent = questions.render();
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
    showModalWindow();
  } else if (elem.classList.contains("QuestionArtistWrong")) {
    wrongAnswerAudio.play();
    elem.classList.add("QuestionArtist__wrongAnswer");
    showModalWindow();
  }
}

function showModalWindow() {
  setTimeout(() => {
    document
      .querySelector(".ModalWindowResult__Wrong")
      .classList.add("ModalWindowResult__Show");
    document
      .querySelector(".bodyModalWindow")
      .classList.add("ModalWindowResult__Show");
  }, 1000);
}

let questions = new Questions(numberOfQuestion);
export let questionsContent = questions.render();
