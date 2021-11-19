import { images } from "../../../image-data/images";
import questionsStyles from "./Questions.css";

class Questions {
  constructor(numberOfCategory) {
    this.numberOfCategory = numberOfCategory;
    this.questionsState = [];
    this.questionsCounter = 0;
  }
  generateRandomQuestions(arr, currentQuestion) {
    let arrOrWrongAnswers =[]
    for (let i = this.numberOfCategory + 10; i< this.numberOfCategory + 20; i++) {
      arrOrWrongAnswers.push(images[i].author)
    }
    let shuffledWrongArr = arrOrWrongAnswers.sort(function(){
      return Math.random() - 0.5;
    });
    let arrOfAnswers = (shuffledWrongArr.splice(4)).concat([images[currentQuestion - 1].author])
    return arrOfAnswers.sort(function(){
      return Math.random() - 0.5;
    });
  }

  createQuestions() {
    for (let i = this.numberOfCategory; i < this.numberOfCategory + 10; i++) {
      let answers = []
      questionsState.push(` 
      <div class="bodyQuestionPicture">
      <header class="QuestionHead">WHO IS THE AUTHOR OF THIS PICTURE?</header>
      <div class="QuestionWrapper">
          <div class="QuestionPicture">
              <img src="./images/pictures/${this.numberOfCategory - 1}.jpg">
          </div>
  
          <div class="QuestionPicture__Answers">
              <div class="QuestionPicture__Answer_left">{}</div>
              <div class="QuestionPicture__Answer_right">2</div>
              <div class="QuestionPicture__Answer_left">3</div>
              <div class="QuestionPicture__Answer_right">4</div>
          </div>
          <button class='next'>next</button>
      </div>
  </div>`)
    }
  }
  render() {
    this.createQuestions()
    return `        <div class="bodyQuestionPicture">
    <header class="QuestionHead">WHO IS THE AUTHOR OF THIS PICTURE?</header>
    <div class="QuestionWrapper">
        <div class="QuestionPicture">
            <img src="./images/pictures/${this.numberOfCategory - 1}.jpg">
        </div>

        <div class="QuestionPicture__Answers">
            <div class="QuestionPicture__Answer_left">1</div>
            <div class="QuestionPicture__Answer_right">2</div>
            <div class="QuestionPicture__Answer_left">3</div>
            <div class="QuestionPicture__Answer_right">4</div>
        </div>
        <button class='next'>next</button>
    </div>
</div>`;
  }
}

let numberOfQuestion = 1;

document.querySelector(".body").addEventListener("click", () => {
  questions.numberOfCategory++;
});

export function getCategoryNumber(elem) {
  let currentCategoryElem = elem.closest(".CategoriesCard");
  if (currentCategoryElem) {
    let id = currentCategoryElem.getAttribute("CategoriesCardId");
    questions.numberOfCategory = Number(id);
    questionsContent = questions.render();
  }
}

let questions = new Questions(numberOfQuestion);
console.log(questions);
export let questionsContent = questions.render();
