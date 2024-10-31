import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY_COLOR } from "../../utils";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useHistoryContext } from "../../context/HistoryContext";
import HistoySessionsComponent from "./HistorySessionComponent";

const HistoryComponent = () => {
  const { history: history, setHistory: setHistory } = useHistoryContext();
    const [modalVisible, setModalVisible] = useState(false);

    const totalWorkTime = new Date(history.getTotalWorkTime());

    return (
        <View>
          <Pressable onPress={()=>setModalVisible(true)}>
          <Icon name='notebook' size={24} color={PRIMARY_COLOR}/>
          </Pressable>
          <Modal
            style={styles.modalContainer}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>HISTORY</Text>
              <Text style={styles.modalText}>Total of worked days : {history.sessions.length} jours</Text>
              <Text style={styles.modalText}>Total of sessions : {history.getNbOfPomodoris()}</Text>
              <Text style={styles.modalText}>Total Work Time : {" "}
                {totalWorkTime.getUTCHours().toString()}h {" "}
                {totalWorkTime.getUTCMinutes().toString().padStart(2, "0")}min {" "}
                {totalWorkTime.getUTCSeconds().toString().padStart(2, "0")}sec {" "}
              </Text>
              <ScrollView
                style={{width: '100%'}}
              >
                <TouchableOpacity activeOpacity={1}
                  style={{width: '100%'}}
                >
                  <HistoySessionsComponent/>
                </TouchableOpacity>
              </ScrollView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={styles.textStyle}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
};

const styles = StyleSheet.create(({
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20
      },
    centeredView: {
        height: '50%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalContainer: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        height: '60%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        marginTop: 10,
        backgroundColor: PRIMARY_COLOR,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
}))

export default HistoryComponent;