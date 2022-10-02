import { Component, OnChanges, OnInit } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings';
import { StateAndSettingsService } from 'src/app/services/state-and-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnChanges {

  constructor(
    private stateAndSettingsService: StateAndSettingsService
  ) { }

  settings: Settings = this.stateAndSettingsService.getSettings()

  ngOnInit(): void {
    this.stateAndSettingsService.settingsChanged.subscribe(
      setting => {
        this.settings = setting
      }
    )
  }

  ngOnChanges() {
    this.stateAndSettingsService.setSettings(this.settings)
  }

  closeModal() {
    this.stateAndSettingsService.toggleSettingsModal()
  }

  alterNumber(numberToAlter: string, option: string) {
    const number: number = option === `increase` ? 1 : -1;

    switch (numberToAlter) {
      case `pomodoros`: {
        if ((this.settings.pomodoros < 60 && option === `increase`) || (this.settings.pomodoros > 1 && option === `decrease`)) {
          this.settings.pomodoros += number;
        }
        break;
      }
      case `focusLength`: {
        if ((this.settings.focusLength < 60 && option === `increase`) || (this.settings.focusLength > 1 && option === `decrease`)) {
          this.settings.focusLength += number;
        }
        break;
      }
      case `shortBreakLength`: {
        if ((this.settings.shortBreakLength < 60 && option === `increase`) || (this.settings.shortBreakLength > 1 && option === `decrease`)) {
          this.settings.shortBreakLength += number;
        }
        break;
      }
      case `longBreakLength`: {
        if ((this.settings.longBreakLength < 60 && option === `increase`) || (this.settings.longBreakLength > 1 && option === `decrease`)) {
          this.settings.longBreakLength += number;
        }
        break;
      }
    }

    this.stateAndSettingsService.reloadPomodoro()
  }

  setSettings() {
    this.stateAndSettingsService.setSettings(this.settings)
  }

  resetApp() {
    this.stateAndSettingsService.resetApp()
  }

}
