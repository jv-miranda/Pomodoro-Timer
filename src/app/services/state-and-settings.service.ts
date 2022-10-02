import { EventEmitter, Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';

@Injectable({
  providedIn: 'root'
})

export class StateAndSettingsService {

  constructor() {
    this.getSettingsFromLocalStorage()
  }

  private PatternSettings: Settings = {
    state: `focus`,

    pomodoros: 4,
    pomodorosLeft: 4,

    focusLength: 25,
    minutes: 25,

    shortBreakLength: 5,
    longBreakLength: 10,

    darkModeEnabled: false,
    modalIsOpen: false,
    isCounting: false,
    autoResumeTimer: false,

    seconds: 0,
    timeInSecs: 1500,
    notifications: true
  }

  private settings: Settings = { ...this.PatternSettings };

  settingsChanged = new EventEmitter();
  stopCounter = new EventEmitter();

  getSettings(): Settings {
    return this.settings;
  }

  getSettingsFromLocalStorage() {
    if (localStorage.getItem("settings") !== null) {
      this.settings = JSON.parse(localStorage.getItem("settings") || `{}`);
      this.settings.isCounting = false;
      this.settings.modalIsOpen = false;
    }
  }

  setSettingsInLocalStorage() {
    localStorage.setItem("settings", JSON.stringify(this.settings))
  }

  reloadPomodoro() {
    this.settings.state = `focus`;
    this.settings.pomodorosLeft = this.settings.pomodoros;
    this.settings.minutes = this.settings.focusLength;
    this.settings.seconds = 0;
    this.settings.timeInSecs = this.settings.minutes * 60;

    this.setSettings(this.settings)
  }

  setSettings(settings: Settings) {
    this.settings = settings;
    this.settingsChanged.emit(this.settings)
    this.setSettingsInLocalStorage()
  }

  toggleSettingsModal() {
    this.settings.modalIsOpen = !this.settings.modalIsOpen;
    this.setSettings(this.settings)
  }

  resetApp() {
    this.settings = { ...this.PatternSettings };
    this.setSettings(this.settings)
    this.stopCounter.emit(true)
  }
}
