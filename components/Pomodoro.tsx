import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Platform, Pressable, StyleSheet, Text, View, AppState } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import DisplayTimer from './timer/DisplayTimer';
import ToggleDurationTimer from './timer/ToggleDurationTimer';
import { TimerMode, PRIMARY_COLOR_20, PRIMARY_COLOR, NUMBER_OF_POMODORIS } from '../utils';
import ProgressDots from './timer/ProgressDots';
import { NotificationService } from '../domain/Notifications';
import Background from './Background';
import { PomodoroProvider, usePomodoroContext } from '../context/PomodoroContext';
import ResetButton from './timer/ResetButton';
import { useHistoryContext } from '../context/HistoryContext';
import { History } from '../domain/History';
import { Session } from '../domain/Session';
import HistoryComponent from './history/HistoryComponent';

const Notifications = new NotificationService(Platform.OS);

const Pomodoro = () => {
  const {
    history: history,
    setHistory: setHistory
  } = useHistoryContext();

  const date = new Date().toISOString().split('T')[0];

  const [session, setSession] = useState<Session>(new Session(date, 0, 0, 0));
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);


  useEffect(()=> {

    const getDate = async () => {
      // Check if a session is already created for the current date
      const sessionIndex = history.sessions.findIndex(session => session.date === date);

      // console.log({history, sessions: history.sessions, sessionIndex, sessionDate : history.sessions[0].date, date});
      if(sessionIndex === -1) {
        setHistory((history: History) => {
          const newHistory = new History(
            history.name,
            [...history.sessions, session]
          );
          newHistory.saveInStorage();
          return newHistory;
        });
        
        setActiveSessionIndex(history.sessions.length - 1);
      } else {
        setSession(history.sessions[sessionIndex]);
        // console.log({session: history.sessions[sessionIndex]});
        setActiveSessionIndex(sessionIndex);
      }
    }

    getDate();
    console.log({date});

  }, [date]);
 
  const { pomodoroSettings,
    timerMode, 
    setTimerMode,
    isRunning,
    setIsRunning,
    remainingTime,
    setRemainingTime,
    counterOfPomodoris,
    setCounterOfPomodoris,
    intervalId,
    setIntervalId
  } = usePomodoroContext();  

  useEffect(() => {
    const saveHistory = async () => {
      history.saveInStorage();
    }

    if(remainingTime == 0 && isRunning) {
      timerMode === 'Focus' ? goToBreakTime() : goToNextPomodori();
      session?.addPomodoro();
      saveHistory();
      Notifications.sendEndSessionNotification({counterOfPomodoris, timerMode})
    }

    if(isRunning && session && timerMode === 'Focus') {
      session?.addTimeToTotal(1000);
      history.updateSession(session, activeSessionIndex);
      saveHistory();
    }

  }, [remainingTime]);

  Background();

  const launchInterval = () => {
    const intervalId = setInterval(() => { 
      setRemainingTime((prev) =>  prev - 1000);
    
    }, 1000);
    if(remainingTime === 0) {
      clearInterval(intervalId);
    }
    setIntervalId(intervalId);
  }

  useEffect(()=> {
    if(isRunning){
      launchInterval();
    }

  }, [isRunning])
  
  const startTimer = async () => {
    // comment savoir que c'est le premier start du pomodori
    if(timerMode === 'Focus' && remainingTime === pomodoroSettings.focusTime && counterOfPomodoris === 0) {
      setCounterOfPomodoris((prev) => prev + 1);
    }
    if(timerMode === 'Focus' && remainingTime === 0) {
      await goToBreakTime();
    }
    setIsRunning(true);
  }
  const pauseTimer = () => {
    setIsRunning(false);
    if(intervalId){
      clearInterval(intervalId);
    }
  }

  const goToNextPomodori = async () => {
    if(counterOfPomodoris === NUMBER_OF_POMODORIS) {
      setCounterOfPomodoris(1);
    } else {
      setCounterOfPomodoris((prev) => prev + 1);
    }
    
    session.addPomodori();
    history.updateSession(session, activeSessionIndex);
    await history.saveInStorage();
    
    setTimerMode('Focus');
    setRemainingTime(pomodoroSettings.focusTime);
  };

  const goToBreakTime = async () => {
    setTimerMode('Break');
    if(counterOfPomodoris === NUMBER_OF_POMODORIS && pomodoroSettings.longBreakTime) {
      setRemainingTime(pomodoroSettings.longBreakTime);
      session.addPomodoro();
      history.updateSession(session, activeSessionIndex);
      await history.saveInStorage();
    } else {
      setRemainingTime(pomodoroSettings.breakTime);
    }
  }

  const saveHistory = (history: History) => {
    return new History(
      history.name,
      [...history.sessions]
    )
  }

  const addSession = () => {
    const session = history.sessions[0];
    session.addSession();
    session.addTimeToTotal(pomodoroSettings.focusTime);
    session.addPomodoro();
    setHistory(saveHistory);
  }

  return (
      <View style={styles.container}>
        <Text>{timerMode === 'Break' && counterOfPomodoris === NUMBER_OF_POMODORIS ? "Long " : ''}{timerMode} Time</Text>
        <DisplayTimer/>
        <ProgressDots status={timerMode} />
        <Pressable style={styles.actionButton} onPress={isRunning ? pauseTimer : startTimer}>
          <Icon
            style={{marginLeft: isRunning ? 0 : 5}}
            name={isRunning ? 'control-pause': 'control-play'}
            size={24}
            color={PRIMARY_COLOR}
          />
        </Pressable>
        {!isRunning && <ToggleDurationTimer />}
        <View style={styles.extraButtons}>
          <ResetButton pauseTimer={pauseTimer} />
          <HistoryComponent/>
        </View>
        <StatusBar style="dark"/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap:10
  },
  actionButton: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: PRIMARY_COLOR_20,
    color: PRIMARY_COLOR
  },
  extraButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  }
});

export default Pomodoro;