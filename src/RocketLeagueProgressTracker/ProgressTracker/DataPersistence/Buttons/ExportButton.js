import { Button } from "@material-ui/core";
import { ExportModal } from "../../../Modals/DataPersistenceModals/ExportModal";
import { useState } from "react";

export const ExportButton = ({ data, ...buttonGroupProps }) => {
    const [showModal, setShowModal] = useState(false);
    return <>
        <Button onClick={() => setShowModal(true)} { ...buttonGroupProps }>Export</Button>
        <ExportModal data={data} showModal={showModal} closeModal={() => setShowModal(false)} />
    </>;
}