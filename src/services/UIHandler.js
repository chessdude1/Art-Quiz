import { artistQuizHandler } from "../views/Categories/Categories";
import { getCategoryNumber } from "../views/Questions/Questions";
import { categoryHandler } from "../views/Categories/Categories";
import { changeQuestion } from "../views/Questions/Questions";
import { checkCorrectPictureAnswer } from "../views/Questions/Questions";
import { scoreHandler } from "../views/Score/Score";
import { nextScorePageHandler } from "../views/Score/Score";
import { homeBtnHandler } from "../views/StartPage/StartPage";
import { prevScorePageHandler } from "../views/Score/Score";

export let full = document.querySelector(".body");

full.addEventListener("click", (e) => {
  e.preventDefault();
  artistQuizHandler(e.target);
  getCategoryNumber(e.target);
  categoryHandler(e.target);
  changeQuestion(e.target);
  checkCorrectPictureAnswer(e.target);
  scoreHandler(e.target);
  nextScorePageHandler(e.target);
  homeBtnHandler(e.target);
  prevScorePageHandler(e.target);
});
