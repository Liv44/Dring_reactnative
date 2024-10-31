import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { useHistoryContext } from "../context/HistoryContext";
import { History } from "../domain/History";

const AddNameComponent = () => {
    const {setHistory: setHistory} = useHistoryContext();
    const [name, onChangeName] = useState("");

    const save = () => {

        const history = new History(name, []);

        setHistory(history);
    }
    
    return (
        // Create a view with a text input and a button
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Entre ton nom"
                keyboardType="default"
            />
            <Button
                onPress={save}
                title="Save"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap:10
      },
      input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
      },
});

export default AddNameComponent;