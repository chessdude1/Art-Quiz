import categoriesStyles from "./Categories.css";

class Categories {
  constructor(CategoriesStore) {
    this.CategoriesStore = CategoriesStore;
  }
  generateCategoriesContent() {
    let HTMLfragment = document.createElement("div"); //контейнер для того,чтобы сложить всю разметку, Вроде fragment но принимает HTML
    for (let i = 0; i < this.CategoriesStore.length; i++) {
      let currentCard = this.CategoriesStore[i];
      let cardStatus = "CategoriesCardDisabled";
      if (currentCard[2]) {
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
    return HTMLfragment.innerHTML; // конвертация элемента в разметку
  }

  render() {
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
                ${this.generateCategoriesContent()}
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

// первая цифра Номер карточки, вторая количество ответов, третье - состояние было нажато ил нет

let categories = new Categories(PicturesStore);
export let categoriesContent = categories.render();

export function categoryHandler(elem) {
  if (elem.closest(".CategoriesCard")) {
    window.location = "/#/Question/";
    categoriesContent = categories.render();
  }
  console.log(PicturesStore);
}

export function artistQuizHandler(elem) {
  if (elem.classList.contains("quizChoiceArtistsBtn")) {
    window.location = "/#/Categories";
    categoriesContent = categories.render();
  }
}
