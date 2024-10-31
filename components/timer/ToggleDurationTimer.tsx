import { Button, Pressable, Text, View } from "react-native"
import { pomodoro25min, pomodoro45min, pomodoroDemo, PRIMARY_COLOR, PRIMARY_COLOR_60 } from "../../utils";
import { usePomodoroContext } from "../../context/PomodoroContext";

const ToggleDurationTimer = () => {
    const {pomodoroSettings, setPomodoroSettings, setRemainingTime} = usePomodoroContext();

    return <View style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10,
        margin: 10
    }}>
    <Pressable
        onPress={()=>{setPomodoroSettings(pomodoro25min); setRemainingTime(pomodoro25min.focusTime)}}
        
        accessibilityLabel="25 minutes focus and 5 minutes break">
            <Text 
            style={{color:pomodoroSettings.type == "25min" ? PRIMARY_COLOR : PRIMARY_COLOR_60, fontSize: 20, textAlign: 'center'}}
            >25min | 5min</Text>
    </Pressable>
    <Pressable
        onPress={()=> {setPomodoroSettings(pomodoro45min); setRemainingTime(pomodoro45min.focusTime)}}
        
        accessibilityLabel="45 minutes focus and 15 minutes break">
            <Text 
            style={{color:pomodoroSettings.type == "45min" ? PRIMARY_COLOR : PRIMARY_COLOR_60, fontSize: 20, textAlign: 'center'}}
            >45min | 15min</Text>
    </Pressable>
    <Pressable
        onPress={()=> {setPomodoroSettings(pomodoroDemo); setRemainingTime(pomodoroDemo.focusTime)}}
        
        accessibilityLabel="45 minutes focus and 15 minutes break">
            <Text 
            style={{color:pomodoroSettings.type == "demo" ? PRIMARY_COLOR : PRIMARY_COLOR_60, fontSize: 20, textAlign: 'center'}}
            >6sec | 5sec</Text>
    </Pressable>
  </View>
}

export default ToggleDurationTimer;