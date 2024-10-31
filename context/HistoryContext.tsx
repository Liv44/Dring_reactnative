import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { History } from "../domain/History";
import { StorageToDomain } from "../mappers/History.mappers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "../domain/Session";

interface HistoryContextType {
    history: History;
    setHistory: React.Dispatch<React.SetStateAction<History>>;
}

export const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const [history, setHistory] = useState<History>(new History("nameToChange", []));

    useEffect(()=> {
        const getHistory = async () => {
            try {

                // decomment to reset the history with data
                // await AsyncStorage.clear();
                // await AsyncStorage.setItem('history', JSON.stringify(
                //     new History("Olivia", [
                //         new Session("2024-10-23", 3, 54000, 0),
                //         new Session("2024-10-24", 4, 68000, 1),
                //         new Session("2024-10-25", 1, 9000, 0),
                //         new Session("2024-10-26", 1, 35000, 0),
                //         new Session("2024-10-27", 8, 52381000, 2),
                //     ])
                // ));
                const history : History = StorageToDomain(await AsyncStorage.getItem('history'));
                if(history) {
                    setHistory(history);
                }
            } catch (e) {
              // saving error
              console.log(e);
            }
          };
            getHistory();
    }, [])

    const value = useMemo(()=> 
        ({
            history: history,
            setHistory: setHistory
        }), [
            history,
            setHistory
        ]
    )

    return <HistoryContext.Provider value={value}>
        { children }
        </HistoryContext.Provider>
}

export const useHistoryContext = () => {
    const context = useContext(HistoryContext);
    if(!context) {
        throw new Error("useHistoryContext must be used within a HistoryProvider")
    }
    return context;
}