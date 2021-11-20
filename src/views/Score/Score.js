import scoreStyles from "./Score.css";
import allCards from "../../../image-data/images";

class Score {
  constructor(resolvedCards, allCards) {
    this.resolvedCardsStore = resolvedCards;
    this.allCards = allCards;
    this.currentPageScore = 0;
  }
  generateScoreCards() {
    let HTMLfragment = document.createElement("div");
    for (
      let i = this.currentPageScore * 10;
      i < this.currentPageScore * 10 + 10;
      i++
    ) {
      let currentCard = this.allCards[i];
      let statusOfCard = "unresolved";
      if (
        this.resolvedCardsStore.indexOf(Number(this.allCards[i].imageNum)) != -1
      ) {
        statusOfCard = "resolved";
      }
      let ScoreCard = `
      <div class="ScoreCard ${
        statusOfCard === "resolved" ? "ScoreCardResolved" : ""
      }" ScoreCardId='${currentCard.imageNum + 1}'>
      <div class="ScoreCard__head">
          <p class="ScoreCard__Name">${Number(currentCard.imageNum) + 1}</p>
          <p class="ScoreCar__Status">${
            statusOfCard === "resolved"
              ? '<img src="./images/Score/correctAnswer.svg">'
              : '<img src="./images/Score/wrongAnswer.svg">'
          }</p>
      </div>
      <img class="ScoreCardImage ${
        statusOfCard === "resolved" ? "ScoreCardImageResolved" : ""
      }" src="./images/pictures/${currentCard.imageNum}.jpg">
      <div class="ScoreCard__Modal">
          <div class="ScoreCard__Info">
              <p>${currentCard.name}</p>
              <p>${currentCard.author}</p>
              <p>${currentCard.year}</p>
          </div>
      </div>
  </div>`;
      HTMLfragment.insertAdjacentHTML("beforeEnd", ScoreCard);
    }
    return HTMLfragment.innerHTML; // конвертация элемента в разметку
  }
  render() {
    return `
    <div class="bodyScorePage">
    <header class="headerLogo">
        <img class="headerLogoImg" src="./images/Common/logo.svg">
    </header>
    <main class="mainScorePage">
        <div class="CategoriesHeader">
            <div class="CategoriesHeader__HomeBtn HomeBtn">
                <img src="./images/Categories/Home.svg">
                <p>HOME</p>
            </div>
            <h2 class="CategoriesHeader__Header">SCORE</h2>
            <div class="ScorePageHeader__Category">
                <img src="./images/Score/Category.svg">
                <p>CATEGORY</p>
            </div>
        </div>
        <div class="ScoreCardsContainer">
        ${this.generateScoreCards()}
        </div>
</div>
</main>
<footer class="footerScore">
    <div class="Score_leftButton">
        <img src="./images/Score/LeftBtn.svg">
    </div>
    <div class="Score_NumberOfPage">${this.currentPageScore + 1}/20</div>
    <div class="Score_RightButton">
        <img src="./images/Score/NextBtn.svg">
    </div>
</footer>
        `;
  }
}
export let arrOfResolvedCards = []; // Хранит в себе номера картин, которые были пройдены

let score = new Score(arrOfResolvedCards, allCards);

export let scoreContent = score.render();

export function scoreHandler(elem) {
  if (elem.closest(".ScoreBtn")) {
    scoreContent = score.render();
    window.location = "#/Score/";
  }
}

export function nextScorePageHandler(elem) {
  if (elem.closest(".Score_RightButton")) {
    score.currentPageScore++;
    if (score.currentPageScore === 20) {
      score.currentPageScore = 0;
    }
    scoreContent = score.render();
    window.location = `#/Score/?${score.currentPageScore}`;
  }
}

export function prevScorePageHandler(elem) {
  if (elem.closest(".Score_leftButton")) {
    score.currentPageScore--;

    if (score.currentPageScore === -1) {
      score.currentPageScore = 19;
    }
    scoreContent = score.render();
    window.location = `#/Score/?${score.currentPageScore}`;
  }
}
