import { Component, OnChanges, OnInit } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings';
import { StateAndSettingsService } from 'src/app/services/state-and-settings.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})

export class PomodoroComponent implements OnInit {

  constructor(
    private stateAndSettingsService: StateAndSettingsService
  ) { }

  settings: Settings = this.stateAndSettingsService.getSettings()
  countingInterval: any = 0;

  ngOnInit(): void {
    this.stateAndSettingsService.settingsChanged.subscribe(
      setting => {
        this.settings = setting
      }
    )

    this.stateAndSettingsService.stopCounter.subscribe(res => {
      clearInterval(this.countingInterval)
    })

    Notification.requestPermission()
  }

  setSettings() {
    this.stateAndSettingsService.setSettings(this.settings)
  }

  toggleSettingsModal() {
    this.stateAndSettingsService.toggleSettingsModal()
  }

  toTwoDigits(number: number): string {
    return "0" + number
  }

  startCounting() {
    this.settings.isCounting = true;
    this.setSettings()

    this.countingInterval = setInterval(() => {
      this.count()

      if (this.settings.timeInSecs === 0) {
        this.pauseCounting()
        this.passToNextState()
      }
    }, 1000)

    if (this.settings.notifications) {
      this.popNotification()
    }
  }

  alterState(state: string) {
    this.settings.state = state;
    this.setSettings()
  }

  popNotification() {
    if (this.settings.state === 'focus') {
      const focusNotification = new Notification("It's time to Focus!", {
        body: "Focus timer just started!",
        icon: "assets/logo.png"
      })
    } else if (this.settings.state === 'short-break') {
      const shortBreakNotification = new Notification("It's time to take a Short Break!", {
        body: "Short break timer just started!",
        icon: "assets/logo.png"
      })
    } else if (this.settings.state === 'long-break') {
      const longBreakNotification = new Notification("It's time to take a Long Break!", {
        body: "Long break timer just started!",
        icon: "assets/logo.png"
      })
    }
  }

  passToNextState() {
    if (!this.settings.autoResumeTimer) {
      this.pauseCounting()
    }

    if (this.settings.state === `long-break`) {
      this.alterState(`focus`);
      this.setTime(this.settings.focusLength)
    } else if (this.settings.pomodorosLeft === 0) {
      this.alterState(`long-break`);
      this.setTime(this.settings.longBreakLength)
      this.settings.pomodorosLeft = this.stateAndSettingsService.getSettings().pomodoros;
    } else {
      if (this.settings.state === `focus`) {
        this.alterState(`short-break`);
        this.setTime(this.settings.shortBreakLength)
        this.settings.pomodorosLeft--
      } else {
        this.alterState(`focus`);
        this.setTime(this.settings.focusLength)
      }
    }

    if (this.settings.autoResumeTimer) {
      this.pauseCounting()
      this.startCounting()
    }

    this.setSettings()
  }

  setTime(minutes: number) {
    this.settings.minutes = minutes;
    this.settings.seconds = 0;
    this.settings.timeInSecs = this.settings.minutes * 60;

    this.setSettings()
  }

  pauseCounting() {
    this.settings.isCounting = false;
    clearInterval(this.countingInterval)

    this.setSettings()
  }

  count() {
    this.settings.timeInSecs--

    if (this.settings.timeInSecs >= 60) {
      this.settings.minutes = Math.floor(this.settings.timeInSecs / 60)
      this.settings.seconds = this.settings.timeInSecs - (this.settings.minutes * 60)
    } else {
      this.settings.minutes = 0;
      this.settings.seconds = this.settings.timeInSecs;
    }

    this.setSettings()
  }
}
