import { useContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

const Background = ()=> {

    // const context = useContext(PomodoroProviderContext);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
    
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            // pauseTimer();
            console.log('App has come to the foreground!');
          }
    
          if(appState.current === 'active' && nextAppState === 'background') {
            console.log('App has gone to the background!');
          }
          
          console.log({current : appState.current, nextAppState});
          appState.current = nextAppState;
          setAppStateVisible(appState.current);
          // console.log('AppState', appState.current);
        });
    
        return () => {
          subscription.remove();
        };
      }, []);
}

export default Background;