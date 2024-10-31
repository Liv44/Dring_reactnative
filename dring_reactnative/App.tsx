import { View } from "react-native";
import Pomodoro from "./components/Pomodoro";
import { createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { History } from "./domain/History";
import { PomodoroProvider } from "./context/PomodoroContext";
import { HistoryProvider, useHistoryContext } from "./context/HistoryContext";
import { DomainToStorage, StorageToDomain } from "./mappers/History.mappers";
import { Session } from "./domain/Session";
import Home from "./components/Home";
// import auth from '@react-native-firebase/auth';

export default function App() {


  return (
    <HistoryProvider>
      <PomodoroProvider>
        <Home/>
      </PomodoroProvider>
    </HistoryProvider>
  );
}
