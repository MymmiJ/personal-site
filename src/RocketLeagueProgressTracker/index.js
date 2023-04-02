import { ExperimentContainer } from "../Common/Containers/ExperimentContainer";
import { GlobalMeasurementsProvider } from "./ContextProviders/GlobalMeasurementsContextProvider";
import { GlobalPeopleProvider } from "./ContextProviders/GlobalPeopleProvider";
import { SkillGroupsProvider } from "./ContextProviders/SkillGroupsContextProvider";
import { SkillGroupsPeopleProvider } from "./ContextProviders/SkillGroupsPeopleProvider";
import { ProgressTracker } from "./ProgressTracker/ProgressTracker";

const RocketLeagueProgressTracker = () =><ExperimentContainer>
    <SkillGroupsProvider>
        <SkillGroupsPeopleProvider>
            <GlobalMeasurementsProvider>
                <GlobalPeopleProvider>
                    <ProgressTracker />
                </GlobalPeopleProvider>
            </GlobalMeasurementsProvider>
        </SkillGroupsPeopleProvider>
    </SkillGroupsProvider>
</ExperimentContainer>;

export default RocketLeagueProgressTracker;
