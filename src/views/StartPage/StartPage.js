class StartPage {
  constructor() {}
  render() {
    return `    <div class="bodyStartPage">
    <header class="headerLogo">
        <img class="headerLogoImg" src="./images/Common/logo.svg">
    </header>
    <main class="mainStartPage">
        <div class="quizChoice">
            <div class="quizChoiceArtists">
                <img  class ='quizChoiceArtistsBtn' src="./images/StartPage/artistsQuiz.svg">

            </div>
            <div class="quizChoicePictures">
                <img class='quizChoicePicturesBtn' src="./images/StartPage/picturesQuiz.svg">
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