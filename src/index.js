import { startPageContent } from "./views/StartPage/StartPage";
import Utils from "./services/Utils";
import { categoriesContent } from "./views/Categories/Categories";
import StartPageStyles from "./views/StartPage/StartPage.css";
import { full } from "./services/UIHandler";
import { questionsContent } from "./views/Questions/Questions";
import { scoreContent } from "./views/Score/Score";
import { categoriesPicturesContent } from "./views/CategoriesPictures/CategoriesPictures";
import { questionsPicturesContent } from "./views/QuestionPictures/QuestionPictures";
import { settingsContent } from "./views/Settings/Settings";
function pushInitialHash() {
  window.location = "/#/StartPage/";
  // window.location = "/#/Categories";
}

export const router = () => {
  let main = document.querySelector(".container");
  let routes = {
    "#/StartPage/": startPageContent,
    "#/Categories": categoriesContent,
    "#/Question/": questionsContent,
    "#/Question/?": questionsContent,
    "#/Score/": scoreContent,
    "#/Score/?": scoreContent,
    "#/CategoriesPictures": categoriesPicturesContent,
    "#/QuestionPictures/": questionsPicturesContent,
    "#/QuestionPictures/?": questionsPicturesContent,
    "#/Settings/": settingsContent,
  };

  // animationFlash();
  let request = Utils.parseRequestURL();
  request == "#/StartPage/" || request == "#/Settings/"
    ? animationWipe()
    : animationFlash();
  let currentContent = routes[request];
  main.innerHTML = currentContent;
};

function animationFlash() {
  document.body.classList.add("bodyDisable");
  const main = document.querySelector(".container");
  main.classList.remove("containerShow");
  setTimeout(() => {
    document.body.classList.remove("bodyDisable");
  }, 200);
  setTimeout(() => {
    main.classList.add("containerShow");
  }, 200);
}

function animationWipe() {
  document
    .querySelector(".AnimationChangePage")
    .classList.add("AnimationChangePage__Show");

  document.body.classList.add("bodyDisable");

  setTimeout(() => {
    document
      .querySelector(".AnimationChangePage")
      .classList.remove("AnimationChangePage__Show");
  }, 1000);
  setTimeout(() => {
    document.body.classList.remove("bodyDisable");
  }, 300);

  let main = document.querySelector(".container");
  main.classList.add("containerShow");
}

// document.body.addEventListener("click", (e) => {
//   document.querySelector(".showpuk").classList.add("showPukTest");
// });

window.addEventListener("hashchange", router);
window.addEventListener("load", pushInitialHash);
window.addEventListener("load", router);
