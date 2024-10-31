import { Pressable, StyleSheet, Text, View } from "react-native";
import { Session } from "../../domain/Session"
import { useState } from "react";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useHistoryContext } from "../../context/HistoryContext";

const HistoySessionsComponent = () => {
    const {history: history} = useHistoryContext();
    const [openedSessions, setOpenedSessions] = useState<number[]>([0]);

    return history.sessions.sort((a: Session, b: Session) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    ).map((session, index) => {
        const totalWorkTimeSession = new Date(session.totalWorkTime);
        return <View key={index}
          style={{width: '100%'}}
        >
          {openedSessions.includes(index) &&
          <Pressable onPress={() => {setOpenedSessions(openedSessions.filter((value) => value !== index))}} style={styles.sessionContainer}>
            <View style={styles.toggle}>
              <Icon name='arrow-down' size={10}/>
              <Text style={styles.listTitle}>{new Date(session.date).toLocaleDateString("fr")}</Text>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%', gap: 5, paddingLeft:30}}>
              <Text>Number of sessions : {session.nbOfPomodoris}</Text>
              <Text>Work time : {totalWorkTimeSession.getUTCHours().toString()}h {" "}
                {totalWorkTimeSession.getUTCMinutes().toString().padStart(2, "0")}min {" "}
                {totalWorkTimeSession.getUTCSeconds().toString().padStart(2, "0")}sec {" "}
              </Text>
            </View>
          </Pressable>
        }
        {!openedSessions.includes(index) &&
          <Pressable onPress={() => {
            setOpenedSessions([...openedSessions, index]);
          }} style={styles.sessionContainer}
          >
            <View style={styles.toggle}>
              <Icon name='arrow-right' size={10}/>
              <Text style={styles.listTitle}>{new Date(session.date).toLocaleDateString("fr")}</Text>
            </View>
          </Pressable>
        }
          
        </View>
      });
}

const styles = StyleSheet.create(({
    toggle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: 10,
      },
      listTitle: {
        fontWeight: "900"
      },
      sessionContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 10
      }
}));

export default HistoySessionsComponent;