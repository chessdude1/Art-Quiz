import {artistQuizHandler} from '../views/StartPage/StartPage'

let full = document.querySelector(".body");

full.addEventListener("click", (e) => {
  e.preventDefault();

  artistQuizHandler(e.target)

});

export let puck = "puck";
