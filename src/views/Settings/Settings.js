import settingsStyle from "./Settings.css";

class Settings {
  constructor() {}
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
                <button class="SettingsSave">SAVE</button>
            </footer>
        </div>`;
  }
}

export function settingsBtnHandler(elem) {
  if (elem.closest(".settings")) {
    window.location = "/#/Settings/";
  }
}

let settings = new Settings();

export let settingsContent = settings.render();
