export interface Settings {
  state: string;
  pomodoros: number;
  focusLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  darkModeEnabled: boolean;
  modalIsOpen: boolean;
  pomodorosLeft: number;
  minutes: number;
  seconds: number,
  timeInSecs: number;
  isCounting: boolean;
  autoResumeTimer: boolean
  notifications: boolean
}
