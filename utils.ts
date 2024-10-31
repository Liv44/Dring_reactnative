export type TimerMode = 'Focus' | 'Break';
export type PomodoroType = '45min' | '25min';


export function convertMinutesToMilliseconds(minutes: number) {
    return minutes * 60 * 1000;
}

const TIMER_25_MIN_MODE = convertMinutesToMilliseconds(25);
const BREAK_25_MIN_MODE = convertMinutesToMilliseconds(5);
const TIMER_45_MIN_MODE = convertMinutesToMilliseconds(45);
const BREAK_45_MIN_MODE = convertMinutesToMilliseconds(15);

const TIMER_DEMO_MODE = convertMinutesToMilliseconds(0.1);
const BREAK_DEMO_MODE = convertMinutesToMilliseconds(0.05);

const LONG_BREAK_DEFAULT = convertMinutesToMilliseconds(1);

export const pomodoro25min: PomodoroSettings = {
    type: '25min',
    focusTime: TIMER_25_MIN_MODE,
    breakTime: BREAK_25_MIN_MODE,
    longBreakTime: LONG_BREAK_DEFAULT
}

export const pomodoro45min: PomodoroSettings = {
    type: '45min',
    focusTime: TIMER_45_MIN_MODE,
    breakTime: BREAK_45_MIN_MODE,
    longBreakTime: LONG_BREAK_DEFAULT
}

export const pomodoroDemo: PomodoroSettings = {
    type: 'demo',
    focusTime: TIMER_DEMO_MODE,
    breakTime: BREAK_DEMO_MODE,
    longBreakTime: LONG_BREAK_DEFAULT
}

export const NUMBER_OF_POMODORIS = 4;

export type PomodoroSettings = {
    type: '45min' | '25min' | 'demo';
    focusTime: number;
    breakTime: number;
    longBreakTime: number;
};

export const PRIMARY_COLOR = "#14D7A6";
export const PRIMARY_COLOR_60 = "#14D7A660";
export const PRIMARY_COLOR_20 = "#14D7A620";