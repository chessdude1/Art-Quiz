class StartPage {
  constructor() {}
  render() {
    return `        <div class="bodyStartPage">
    <header class="headerLogo">
        <img class="headerLogoImg" src="./images/Common/logo.svg">
    </header>
    <main class="mainStartPage">
        <div class="quizChoice">
            <div class="quizChoiceArtists">
                <img class='quizChoiceArtistsBtn' src="./images/StartPage/Artist_Quiz.svg">
                <p class="quizChoiceArtists__categoryName"><strong>ARTISTS</strong> QUIZ</p>
                <!-- <div class="quizChoiceArtistsBtn">1</div> -->
            </div>
            <div class="quizChoicePictures">
                <img class='quizChoicePicturesBtn' src="./images/StartPage/Pictures_Quiz.svg">
                <p class="quizChoiceArtists__categoryName"><strong>PICTURES </strong> QUIZ</p>
            </div>
        </div>
    </main>
    <footer class="footerStartPage">
        <div class="settings">
            <img src="./images/Common/Settings.svg">
            <p>SETTINGS</p>
        </div>
    </footer>
</div>`;
  }
}

let startPage = new StartPage();

export let startPageContent = startPage.render();

export function homeBtnHandler(elem) {
  if (elem.closest(".HomeBtn")) {
    window.location = "/#/StartPage/";
  }
}
