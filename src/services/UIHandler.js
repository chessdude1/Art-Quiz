import { artistQuizHandler } from "../views/StartPage/StartPage";
import { getCategoryNumber } from "../views/Questions/Questions";
import { categoryHandler } from "../views/Categories/Categories";

export let full = document.querySelector(".body");

full.addEventListener("click", (e) => {
  e.preventDefault();
  artistQuizHandler(e.target);
  getCategoryNumber(e.target);
  categoryHandler(e.target);
});
