import { startPageContent } from "./views/StartPage/StartPage";
import Utils from "./services/Utils";
import { categoriesContent } from "./views/Categories/Categories";
import StartPageStyles from "./views/StartPage/StartPage.css";
import { body } from "./services/UIHandler";
import { questionsContent } from "./views/Questions/Questions";
import { scoreContent } from "./views/Score/Score";
import { categoriesPicturesContent } from "./views/CategoriesPictures/CategoriesPictures";
import { questionsPicturesContent } from "./views/QuestionPictures/QuestionPictures";
import { settingsContent } from "./views/Settings/Settings";

const WIPEANIMATIONTIME = 600;
const FLASHANIMATIONTIME = 200;

function pushInitialHash() {
  window.location = "/#/StartPage/";
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
  }, FLASHANIMATIONTIME);
  setTimeout(() => {
    main.classList.add("containerShow");
  }, FLASHANIMATIONTIME);
}

function animationWipe() {
  const main = document.querySelector(".container");
  main.classList.remove("containerShow");
  document
    .querySelector(".AnimationChangePage")
    .classList.add("AnimationChangePage__Show");

  setTimeout(() => {
    document
      .querySelector(".AnimationChangePage")
      .classList.remove("AnimationChangePage__Show");
    main.classList.add("containerShow");
  }, WIPEANIMATIONTIME);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", pushInitialHash);
window.addEventListener("load", router);
