import { StyleSheet, View } from "react-native"
import { Bar as ProgressBar } from 'react-native-progress';
import { NUMBER_OF_POMODORIS, PRIMARY_COLOR, PRIMARY_COLOR_20, TimerMode } from "../../utils";
import { usePomodoroContext } from "../../context/PomodoroContext";


interface ProgressDotsProps {
    status : TimerMode;
}

const ProgressDots = (
    {status}: ProgressDotsProps
) => {

  const {isRunning, counterOfPomodoris, remainingTime, pomodoroSettings} = usePomodoroContext();

    const counterDisplay = ()=> {
        const dots = [];
        for(let i = 1; i <= NUMBER_OF_POMODORIS; i++) {

          const timerActive = (pomodoroSettings.focusTime);

          if(isRunning && counterOfPomodoris == i && status === 'Focus') {
            const progress = (timerActive -  remainingTime) / timerActive;
    
            dots.push(<ProgressBar key={i} 
              progress={
                progress
              }
              width={30} color={PRIMARY_COLOR}
              height={10}
              borderRadius={5}
              unfilledColor={PRIMARY_COLOR_20}
              borderWidth={0}
              />)
          }else {
    
            dots.push(<View key={i} style={{...styles.dot, backgroundColor: counterOfPomodoris >= i ? PRIMARY_COLOR : PRIMARY_COLOR_20, width: 10}}></View>);
          }
        };
        return dots;
      }

    return <View style={styles.dots}>
        {counterDisplay()}
      </View>
}

const styles = StyleSheet.create({
    dots:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot:{
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'black',
      margin: 5,
    }
});

export default ProgressDots;