import { startPageContent } from "./views/StartPage/StartPage";
import Utils from "./services/Utils";
import { categoriesContent } from "./views/Categories/Categories";
import StartPageStyles from "./views/StartPage/StartPage.css";
import { full } from "./services/UIHandler";
import { questionsContent } from "./views/Questions/Questions";
import { scoreContent } from "./views/Score/Score";

function pushInitialHash() {
  window.location = "/#/StartPage/";
  // window.location = "#/Score/";
}

export const router = () => {
  let routes = {
    "#/StartPage/": startPageContent,
    "#/Categories": categoriesContent,
    "#/Question/": questionsContent,
    "#/Question/?": questionsContent,
    "#/Score/": scoreContent,
    '#/Score/?': scoreContent
  };
  const main = document.querySelector(".container");
  let request = Utils.parseRequestURL();
  let currentContent = routes[request];
  main.innerHTML = currentContent;
};

window.addEventListener("hashchange", router);
window.addEventListener("load", pushInitialHash);
window.addEventListener("load", router);
