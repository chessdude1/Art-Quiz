import { artistQuizHandler } from "../views/Categories/Categories";
import { getCategoryNumber } from "../views/Questions/Questions";
import { firstQuestionHandler } from "../views/Categories/Categories";
import { changeQuestion } from "../views/Questions/Questions";
import { checkCorrectArtistAnswer } from "../views/Questions/Questions";
import { scoreHandler } from "../views/Score/Score";
import { nextScorePageHandler } from "../views/Score/Score";
import { homeBtnHandler } from "../views/StartPage/StartPage";
import { prevScorePageHandler } from "../views/Score/Score";
import { picturesQuizHandler } from "../views/CategoriesPictures/CategoriesPictures";
import { getCategoryPicturesNumber } from "../views/QuestionPictures/QuestionPictures";
import { firstQuestionPictureHandler } from "../views/CategoriesPictures/CategoriesPictures";
import { changeQuestionPicture } from "../views/QuestionPictures/QuestionPictures";
import { checkCorrectPictureAnswer } from "../views/QuestionPictures/QuestionPictures";
import { settingsBtnHandler } from "../views/Settings/Settings";
export let full = document.querySelector(".body");

full.addEventListener("click", (e) => {
  e.preventDefault();
  getCategoryPicturesNumber(e.target);
  artistQuizHandler(e.target);
  getCategoryNumber(e.target);
  firstQuestionHandler(e.target);
  changeQuestion(e.target);
  checkCorrectArtistAnswer(e.target);
  scoreHandler(e.target);
  nextScorePageHandler(e.target);
  homeBtnHandler(e.target);
  prevScorePageHandler(e.target);
  picturesQuizHandler(e.target);
  firstQuestionPictureHandler(e.target);
  changeQuestionPicture(e.target);
  checkCorrectPictureAnswer(e.target);
  settingsBtnHandler(e.target);
});
