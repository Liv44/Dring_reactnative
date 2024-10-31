import { pomodoro25min, PomodoroType, TimerMode } from "../utils";

export class Pomodori {
    isRunning: boolean;
    counterOfPomodoris: number;
    remainingTime: number;
    durationMode: PomodoroType;
    status: TimerMode;

    constructor(isRunning: boolean, counterOfPomodoris: number, remainingTime: number, durationMode: PomodoroType, status: TimerMode) {
        this.isRunning = isRunning;
        this.counterOfPomodoris = counterOfPomodoris;
        this.remainingTime = remainingTime;
        this.durationMode = durationMode;
        this.status = status;
    }

    restartPomodori() {
        this.isRunning = false;
        this.remainingTime = pomodoro25min.focusTime;
        this.status = 'Focus';
    }

    startTimer() {
        // Start the timer

    }

    stopTimer() {
        // Stop the timer

    }


}