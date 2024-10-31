import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { usePomodoroContext } from "../../context/PomodoroContext";

const DisplayTimer = () => {

    const {remainingTime} = usePomodoroContext();

    return <Text style={styles.text}>
        {new Date(remainingTime).getMinutes().toString().padStart(2, "0")}:
        {new Date(remainingTime).getSeconds().toString().padStart(2, "0")}
      </Text>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        fontWeight: '600',
    }
});

export default DisplayTimer;