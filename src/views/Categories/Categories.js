import categoriesStyles from "./Categories.css";

export class Categories {
  constructor(CategoriesStore) {
    this.CategoriesStore = CategoriesStore;
  }

  generateCategoriesContent() {
    let HTMLfragment = document.createElement("div");
    for (let i = 0; i < this.CategoriesStore.length; i++) {
      let currentCard = this.CategoriesStore[i];
      let cardStatus = "CategoriesCardDisabled";
      if (currentCard[2]) {
        // card interface [1(serial number), 0(correct answers in category), true(status of card), "PORTRAIT" (name of card)]
        cardStatus = "CategoriesCardActive";
      }
      
      let card = `<div class="CategoriesCard ${cardStatus}" CategoriesCardId='${
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
                 }' src="./images/Categories/category_${currentCard[0]}.svg">
            </div>`;
      HTMLfragment.insertAdjacentHTML("beforeEnd", card);
    }
    return HTMLfragment.innerHTML; // convert elem to HTML
  }

  render() {
    return `            <div class="bodyCategoriesPage">
      <header class="headerLogo">
          <img class="header_CategoriesLogoImg" src="./images/Common/logo.svg">
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
                ${this.generateCategoriesContent()}
              </div>
          </div>
      </main>
      <footer class="footerCategories">
      <div class='arrowDown'>
      <div class="arrow one">
     
    <img src="../../images/Common/double_arrow_down.svg" alt="double arrow">
  </div>
  <div class="arrow two"><img src="../../images/Common/double_arrow_down.svg" alt="double arrow"></div>
  </div>
      </footer>
  </div>`;
  }
}

export let ArtistsStore = [
  // card interface [1(serial number), 0(correct answers in category), true(status of card), "PORTRAIT" (name of card)]
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

let categories = new Categories(ArtistsStore);
export let categoriesContent = categories.render();

export function firstQuestionHandler(elem) {
  if (
    elem.closest(".CategoriesCardActive") &&
    elem.closest(".CategoriesCard")
  ) {
    window.location = "/#/Question/";
    categoriesContent = categories.render();
  }
}

export function artistQuizHandler(elem) {
  if (elem.classList.contains("quizChoiceArtistsBtn")) {
    window.location = "/#/Categories";
    categoriesContent = categories.render();
    window.addEventListener("scroll", () => {
      document.querySelector(".arrowDown").classList.add("displayNone");
    });
  }
}
