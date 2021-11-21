import settingsStyle from "./Settings.css";
import correctAnswerSound from "../../audio/correct_answer.mp3";
import wrongAnswerSound from "../../audio/wrong_answer.mp3";
class Settings {
  constructor(settingsData) {
    this.settingsData = settingsData;
  }
  render() {
    return `<div class="Settings">
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
  }
}

let settingsData = [0, false]; //в массиве лежит актальное состояние о громкости и наличии таймера

export let correctAnswerAudio = new Audio(correctAnswerSound);
export let wrongAnswerAudio = new Audio(wrongAnswerSound);

export function volumeHandler(elem) {
  if (elem.target.closest(".Settings__ProgressContainer")) {
    correctAnswerAudio.volume = elem.offsetX / elem.target.clientWidth;
    wrongAnswerAudio.volume = elem.offsetX / elem.target.clientWidth;
    document.querySelector(
      ".Settings__Progress"
    ).style.width = `${elem.offsetX}px`;
    correctAnswerAudio.play();
  }
}

let settings = new Settings(settingsData);

export let settingsContent = settings.render();
