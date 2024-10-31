import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "./Session";

export class History {
    name: string;
    sessions: Session[];
    lastUpdate: Date;

    constructor(
        name: string, sessions: Session[]
    ) {
        this.name = name;
        this.sessions = sessions;
        this.lastUpdate = new Date();
    }

    addSession(session: Session) {
        this.sessions.push(session);
        this.lastUpdate = new Date();
    }

    updateSession(session: Session, date: string) {
        const index = this.sessions.findIndex((session) => session.date === date);
        this.sessions[index] = session;
        this.lastUpdate = new Date();
    }

    getNbOfDaysWorked() {
        return this.sessions.length;
    }

    getNbOfPomodoris() {
        return this.sessions.reduce((acc, session) => acc + session.nbOfPomodoris, 0);
    }

    getNbOfPomodoros() {
        return this.sessions.reduce((acc, session) => acc + session.nbOfPomodoros, 0);
    }

    getTotalWorkTime() {
        return this.sessions.reduce((acc, session) => acc + session.totalWorkTime, 0);
    }

    async saveInStorage() {
        try {
            await AsyncStorage.setItem('history', JSON.stringify(this));
        } catch (e) {
            // saving error
            console.log(e);
        }
    }

}