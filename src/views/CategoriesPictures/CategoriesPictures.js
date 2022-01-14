import { Categories } from "../Categories/Categories";
import categoriesStylesPicture from "./CategoriesPictures.css";

class CategoriesPictures extends Categories {
  constructor(CategoriesStore) {
    super(CategoriesStore);
  }
  generateCategoriesContentPictures() {
    let HTMLfragment = document.createElement("div");

    for (let i = 0; i < this.CategoriesStore.length; i++) {
      let currentCard = this.CategoriesStore[i];
      let cardStatus = "CategoriesCardDisabled";
      if (currentCard[2]) {
        cardStatus = "CategoriesCardActive";
      }
      
      let card = `<div class="CategoriesCardPictures ${cardStatus}" CategoriesCardId='${
        currentCard[0]
      }'>
                <div class="CategoriesCard__head">
                    <p class="CategoriesCard__Number">${currentCard[0]}</p>
                    <p class="CategoriesCard__Score">${currentCard[1]}/10</p>
                </div>
                <p class="CategoriesCard__name">${currentCard[3]}</p>
                 <img class ='${
                   cardStatus === "CategoriesCardDisabled"
                     ? "Img_CategoriesCardDisabled"
                     : ""
                 }' src="./images/Categories/category_${
        currentCard[0] + 10
      }.svg"> 
            </div>`;
      HTMLfragment.insertAdjacentHTML("beforeEnd", card);
    }
    return HTMLfragment.innerHTML;
  }

  renderPictures() {
    return `            <div class="bodyCategoriesPage">
      <header class="headerLogo">
          <img class="headerLogoImg" src="./images/Common/logo.svg">
      </header>
      <main class="mainCategoriesPage">
          <div class="CategoriesHeader">
              <div class="CategoriesHeader__HomeBtn HomeBtn">
                  <img src="./images/Categories/Home.svg">
                  <p>HOME</p>
              </div>
              <h2 class="CategoriesHeader__Header">CATEGORIES</h2>
              <div class="CategoriesHeader__ScoreBtn ScoreBtn">
                  <img src="./images/Categories/Score.svg">
                  <p>SCORE</p>
              </div>
          </div>
          <div class="CategoriesContainer">
                ${this.generateCategoriesContentPictures()}
              </div>
          </div>
      </main>
      <footer class="footerCategories">
      </footer>
  </div>`;
  }
}

export let PicturesStore = [
  [1, 0, true, "PORTRAIT"],
  [2, 0, false, "LANDSCAPE"],
  [3, 0, false, "STILL LIFE"],
  [4, 0, false, "IMPRESSIONISM"],
  [5, 0, false, "EXPRESSIONISM"],
  [6, 0, false, "AVANT-GARDE"],
  [7, 0, false, "RENAISSANCE"],
  [8, 0, false, "SURREALISM"],
  [9, 0, false, "KITSCH"],
  [10, 0, false, "MINIMALISM"],
];

let categoriesPictures = new CategoriesPictures(PicturesStore);
export let categoriesPicturesContent = categoriesPictures.renderPictures();

export function picturesQuizHandler(elem) {
  if (elem.classList.contains("quizChoicePicturesBtn")) {
    window.location = "/#/CategoriesPictures";
    categoriesPicturesContent = categoriesPictures.renderPictures();
  }
}

export function firstQuestionPictureHandler(elem) {
  if (
    elem.closest(".CategoriesCardPictures") &&
    elem.closest(".CategoriesCardActive")
  ) {
    window.location = "/#/QuestionPictures/";
    categoriesPicturesContent = categoriesPictures.renderPictures();
  }
}
