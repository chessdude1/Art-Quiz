import {startPageContent } from "./views/StartPage/StartPage";
import Utils from "./services/Utils";
import StartPageStyles from "./views/StartPage/StartPage.css";
import { puck } from "./services/UIHandler";

function pushInitialHash() {
  window.location = "/#/StartPage/";
}
const routes = {
  "#/StartPage/": startPageContent ,
  // "/about": tessst,
  // , '/p/:id'      : PostShow
  // , '/register'   : Register
};

const router = async () => {
  // const header = document.querySelector("header");
  // const footer = document.querySelector("footer");
  const main = document.querySelector(".container");

  let request = Utils.parseRequestURL();
  let currentContent = routes[request]; //
  main.innerHTML = currentContent;
};

window.addEventListener("hashchange", router);
window.addEventListener("load", pushInitialHash);
window.addEventListener("load", router);
