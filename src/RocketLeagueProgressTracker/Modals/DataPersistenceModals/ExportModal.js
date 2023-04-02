import { Button, Dialog, Typography } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";

const ExportFormContainer = styled.div`
    padding: 12px;
`;

// const EXPORT_TARGETS = {
//     URL: 'url',
//     CSV_FILE: 'csv',
//     JSON_FILE: 'json',
//     CUSTOM: 'custom',
// };

export const PROGRESS_TRACKER_NAMESPACE = '__rocket_league_progress_tracker_'

export const ExportModal = ({ data, showModal, closeModal }) => {
    const [url, setUrl] = useState(null);
    // const [exportTarget, setExportTarget] = useState(EXPORT_TARGETS.URL);

    return <Dialog
            PaperProps={{ style: { width: '40%' } }}
            open={showModal}
            onClose={closeModal}
        >
        <ExportFormContainer>
            <h2>Export & Share</h2>
            <Typography>Export your progress tracking data to share with others.</Typography>
            <Button onClick={() => {
                const urlQuery = btoa(encodeURIComponent(JSON.stringify(data)));
                const currentUrl = window.location;
                const url = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}?import-data=${urlQuery}`;
                setUrl(url);
                window.navigator.clipboard.writeText(url);
            }}>Get URL</Button>
            <br />
            <p style={{ overflowWrap: 'break-word', maxHeight: '64px' }}>
                {url ?? ''}
            </p>
        </ExportFormContainer>
    </Dialog>;
};
