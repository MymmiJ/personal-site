import { createContext, useContext } from "react"
import { SkillGroupsContext } from "./SkillGroupsContextProvider"
import { replacePeopleAction } from "../Reducers/Actions/SkillGroupsActions/replacePeopleAction";

export const SkillGroupsPeopleContext = createContext();

export const SkillGroupsPeopleProvider = ({ children }) => {
    const [skillGroups, dispatch] = useContext(SkillGroupsContext);
    
    const dispatchPeopleToSkillGroup = (people, skillGroupIndex) => dispatch(
        replacePeopleAction(people, skillGroupIndex)    
    );

    const getPeopleFromSkillGroup = (skillGroupIndex) => skillGroups[skillGroupIndex].people;

    return <SkillGroupsPeopleContext.Provider value={[getPeopleFromSkillGroup, dispatchPeopleToSkillGroup]}>
        {children}
    </SkillGroupsPeopleContext.Provider>
}