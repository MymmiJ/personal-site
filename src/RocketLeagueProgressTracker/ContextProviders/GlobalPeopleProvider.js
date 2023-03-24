import { createContext, useReducer } from "react";
import { globalPeopleReducer } from "../Reducers/globalPeopleReducer";

export const GlobalPeopleContext = createContext();

export const GlobalPeopleProvider = ({ children }) => {
    const [globalPeople, dispatch] = useReducer(globalPeopleReducer, [
        {
            name: 'AntiSkub'
        },
        {
            name: 'BeesMode'
        }
    ]);

    return <GlobalPeopleContext.Provider value={[globalPeople, dispatch]}>
        {children}
    </GlobalPeopleContext.Provider>;
}
