import settingsStyle from "./Settings.css";
import correctAnswerSound from "../../audio/correct_answer.mp3";
import wrongAnswerSound from "../../audio/wrong_answer.mp3";
class Settings {
  constructor(settingsData) {
    this.settingsData = settingsData;
  }
  render() {
    return `        <div class="Settings">
    <header class="headerLogo">
        <img class="headerLogoImg" src="./images/Common/logo.svg">
        <div class="SettingsHeader"></div>
    </header>
    <main class="SettingsWrapper">

        <div class="Settings__volume">
            <div class="Settings__volumeContainer">
                <img class="Settings__VolumePicture" src="./images/Settings/SoundBig.svg">
                <div class="Settings__volumeControl">
                    <img src="./images/Settings/volumeOff.svg">
                    <div class="Settings__ProgressContainer">
                        <div class="Settings__Progress"></div>
                    </div>
                </div>
                <p class="Setting__VolumeTitle">VOLUME</p>
            </div>
        </div>
        <div class="Settings__Time">
            <div class="Settings__TimeContainer">
                <img class="Settings__TimePicture" src="./images/Settings/timeBig.svg">
                <div class="SettingsTime__CheckBox">
                    <img class="Settings__checked " src="./images/Settings/checked.svg">
                </div>
                <div class="Settings__ProgressTimeContainer">
                    <div class="Settings__ProgressTime"></div>
                </div> 
                <div class='ShowTimeOnQuestion'> ${timeOnAnswer} </div>
                <p class="Setting__TimeTitle">TIME GAME </p>
            </div>
        </div>
    </main>
    <footer class="SettingsFooter">
        <button class="SettingsSave HomeBtn">SAVE</button>
    </footer>
</div>`;
  }
}

export function settingsBtnHandler(elem) {
  if (elem.closest(".settings")) {
    window.location = "/#/Settings/";
    setTimeout(() => {
      document.querySelector(".ShowTimeOnQuestion").textContent = timeOnAnswer;
    }, 0);
    setTimeout(() => {
      document.querySelector(
        ".Settings__Progress"
      ).style.width = `${volumeControl}px`;
    }, 0);
  }
}

let volumeControl = 50;
function setLocalStorageSettings() {
  localStorage.setItem("timeOnAnswerLocalStorage", timeOnAnswer);
  localStorage.setItem("volumeLocalStorage", volume);
  localStorage.setItem("volumeControlLocalStorage", volumeControl);
}

function getLocalStorageSettings() {
  if (localStorage.getItem("timeOnAnswerLocalStorage")) {
    timeOnAnswer = localStorage.getItem("timeOnAnswerLocalStorage");
  }
  if (localStorage.getItem("volumeLocalStorage")) {
    volume = localStorage.getItem("volumeLocalStorage");
    wrongAnswerAudio.volume = volume;
    correctAnswerAudio.volume = volume;
  }
  if (localStorage.getItem("volumeControlLocalStorage")) {
    let volumePosition = localStorage.getItem("volumeControlLocalStorage");
    volumeControl = volumePosition;
  }
}

window.addEventListener("beforeunload", setLocalStorageSettings);
window.addEventListener("load", getLocalStorageSettings);

export let timeGameStatus = true; // состояние, есть таймер или нет
export let timeOnAnswer = 30;
export let correctAnswerAudio = new Audio(correctAnswerSound);
export let wrongAnswerAudio = new Audio(wrongAnswerSound);

let volume = 0.5;

export function volumeHandler(elem) {
  if (elem.target.closest(".Settings__ProgressContainer")) {
    correctAnswerAudio.volume = elem.offsetX / elem.target.clientWidth;
    volume = elem.offsetX / elem.target.clientWidth;
    wrongAnswerAudio.volume = elem.offsetX / elem.target.clientWidth;
    volumeControl = elem.offsetX; // сохранение значения offset для local storage
    document.querySelector(
      ".Settings__Progress"
    ).style.width = `${elem.offsetX}px`;
    correctAnswerAudio.play();
  }
}

export function timeHandler(elem) {
  if (elem.target.closest(".Settings__ProgressTimeContainer")) {
    document.querySelector(
      ".Settings__ProgressTime"
    ).style.width = `${elem.offsetX}px`;
    timeOnAnswer =
      Math.round(((elem.offsetX / elem.target.clientWidth) * 30) / 5) * 5;
    document.querySelector(".ShowTimeOnQuestion").textContent =
      Math.round(((elem.offsetX / elem.target.clientWidth) * 30) / 5) * 5;
    settingsContent = settings.render();
  }
}

export function timeGameToggle(elem) {
  if (elem.classList.contains("Settings__checked")) {
    elem.classList.toggle("Settings__checked_disable");
    timeGameStatus === true
      ? (timeGameStatus = false)
      : (timeGameStatus = true); // toggle флаг тайм-гейм
  }
}

let settings = new Settings(timeGameStatus);

export let settingsContent = settings.render();
