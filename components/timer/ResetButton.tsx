import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { PRIMARY_COLOR } from "../../utils";
import { usePomodoroContext } from "../../context/PomodoroContext";

const ResetButton = ({pauseTimer}:{pauseTimer: ()=>void}) => {

    const {timerMode, isRunning, setCounterOfPomodoris, setTimerMode, setIsRunning, setRemainingTime, pomodoroSettings} = usePomodoroContext();

    const resetAll = () => {
        pauseTimer();
        setCounterOfPomodoris(0);
        setTimerMode('Focus');
        setIsRunning(false);
        setRemainingTime(pomodoroSettings.focusTime);
    };

    return <Pressable onPress={resetAll}>
        <Icon
            style={{marginLeft: isRunning ? 0 : 5}}
            name={'reload'}
            size={24}
            color={PRIMARY_COLOR}
        />
    </Pressable>
}

export default ResetButton;