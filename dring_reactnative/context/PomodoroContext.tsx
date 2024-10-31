import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { pomodoro25min, PomodoroSettings } from "../utils";

interface PomodoroContextType {
    isRunning: boolean;
    counterOfPomodoris: number;
    remainingTime: number;
    pomodoroSettings: PomodoroSettings;
    timerMode: 'Focus' | 'Break';
    intervalId: NodeJS.Timeout | null;
    setIntervalId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>;
    setTimerMode: (timerMode: 'Focus' | 'Break') => void;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
    setPomodoroSettings: (settings: PomodoroSettings) => void;
    setCounterOfPomodoris: React.Dispatch<React.SetStateAction<number>>;
}

export const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<'Focus'|'Break'>('Focus');
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [counterOfPomodoris, setCounterOfPomodoris] = useState(0);
    const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings>(pomodoro25min);
    const [remainingTime, setRemainingTime] = useState(pomodoro25min.focusTime);

    const value = useMemo(()=> 
        ({
            isRunning,
            counterOfPomodoris,
            remainingTime,
            pomodoroSettings,
            timerMode,
            intervalId,
            setIntervalId,
            setTimerMode,
            setIsRunning,
            setCounterOfPomodoris,
            setPomodoroSettings,
            setRemainingTime
        }), [isRunning, counterOfPomodoris, remainingTime, pomodoroSettings, timerMode, intervalId, setIntervalId, setTimerMode, setIsRunning, setCounterOfPomodoris, setPomodoroSettings, setRemainingTime]
    )

    return <PomodoroContext.Provider value={value}>
        { children }
        </PomodoroContext.Provider>
}

export const usePomodoroContext = () => {
    const context = useContext(PomodoroContext);
    if(!context) {
        throw new Error("usePomodoroContext must be used within a PomodoroProvider")
    }
    return context;
}