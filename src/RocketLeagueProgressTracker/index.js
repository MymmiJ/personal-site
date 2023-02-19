import { ExperimentContainer } from "../Common/Containers/ExperimentContainer";
import { SkillGroupsProvider } from "./ContextProviders/SkillGroupsContextProvider";

import { ProgressTracker } from "./ProgressTracker/ProgressTracker";

// TODO: Enable switch between local and remote.
const RocketLeagueProgressTracker = () =><ExperimentContainer>
    <SkillGroupsProvider>
        <ProgressTracker />
    </SkillGroupsProvider>
</ExperimentContainer>;

export default RocketLeagueProgressTracker;
