import { PomodoroSettings, PomodoroType } from "../utils";
import { Pomodori } from "./Pomodori";

export class Pomodoro {
    pomodoris: Pomodori[];
    isRunning: boolean;
    settings: PomodoroSettings;

    constructor(pomodoris: Pomodori[], isRunning: boolean, settings: PomodoroSettings) {
        this.pomodoris = pomodoris;
        this.isRunning = isRunning;
        this.settings = settings;
    }

    changeSettings(pomodoroType: PomodoroType) {
        this.settings = {
            type: pomodoroType,
            focusTime: pomodoroType === '25min' ? 25 : 45,
            breakTime: pomodoroType === '25min' ? 5 : 15,
            longBreakTime: 15,
        };
    }

    startPomodoro() {
        this.isRunning = true;
    }

    stopPomodoro() {
        this.isRunning = false;
    }
}