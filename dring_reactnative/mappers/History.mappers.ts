import { History } from "../domain/History";
import { Session } from "../domain/Session";

export const StorageToDomain = (storage: string | null): History => {
    if (!storage) {
        throw new Error("No data found");
    }
    const parsed = JSON.parse(storage);

    const sessions = parsed.sessions.map((session: any) => {
        return new Session(session.date, session.nbOfPomodoris, session.totalWorkTime, session.nbOfPomodoros);
    });

    if (parsed.sessions) {

        return new History(parsed.name, sessions);
    } else {
        throw new Error("Invalid storage data");
    }

};

export const DomainToStorage = (domain: History): string => {

    return JSON.stringify(domain);

};