import { Button } from "@material-ui/core";
import { useState } from "react";
import { SaveModal } from "../../../Modals/DataPersistenceModals/SaveModal";

export const SaveButton = ({ data, ...buttonGroupProps }) => {
    const [showModal, setShowModal] = useState(false);
    return <>
        <Button onClick={() => setShowModal(true)}{...buttonGroupProps}>Save</Button>
        <SaveModal data={data} showModal={showModal} closeModal={() => setShowModal(false)} />
    </>;
}