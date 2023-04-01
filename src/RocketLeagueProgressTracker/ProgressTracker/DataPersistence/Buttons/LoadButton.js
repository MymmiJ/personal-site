import { Button } from "@material-ui/core";
import { useState } from "react";
import { LoadModal } from "../../../Modals/DataPersistenceModals/LoadModal";

export const LoadButton = ({ loadFunction, ...buttonGroupProps }) => {
    const [showModal, setShowModal] = useState(false);
    return <>
        <Button onClick={() => setShowModal(true)} { ...buttonGroupProps }>Load</Button>
        <LoadModal loadFunction={loadFunction} showModal={showModal} closeModal={() => setShowModal(false)} />
    </>;
}