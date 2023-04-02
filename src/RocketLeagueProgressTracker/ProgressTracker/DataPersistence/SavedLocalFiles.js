import { Typography } from "@material-ui/core";
import { PROGRESS_TRACKER_NAMESPACE } from "../../Modals/DataPersistenceModals/SaveModal";

export const SavedLocalFiles = () => {
    const storedItems = Object.keys(window.localStorage)
        .filter(name => name.startsWith(PROGRESS_TRACKER_NAMESPACE));
    return <>{
        storedItems.map(name => <Typography key={name}>{name.replace(PROGRESS_TRACKER_NAMESPACE, '')}</Typography>)
    }</>
}