import { Button, ButtonGroup, Dialog, Typography } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";

const LoadFormContainer = styled.div`
    padding: 12px;
`

const LOAD_TARGETS = {
    LOCAL: 'local',
    REDIS: 'redis',
    CUSTOM: 'custom',
}

export const PROGRESS_TRACKER_NAMESPACE = '__rocket_league_progress_tracker_'

export const LoadModal = ({ loadFunction, showModal, closeModal }) => {
    const [selectedDataToLoad, setSelectedDataToLoad] = useState(null);
    const [loadTarget, setLoadTarget] = useState(LOAD_TARGETS.LOCAL);

    const storedItems = Object.keys(window.localStorage)
        .filter(name => name.startsWith(PROGRESS_TRACKER_NAMESPACE));

    return <Dialog
            PaperProps={{ style: { width: '40%' } }}
            open={showModal}
            onClose={closeModal}
        >
        <LoadFormContainer>
            <h2>Load Locally</h2>
            <Typography>Load your progress tracking data from files saved locally in your browser.</Typography>
            <Button
                onClick={() => {
                    const dataToLoad = window.localStorage.getItem(selectedDataToLoad);
                    loadFunction(JSON.parse(dataToLoad));
                    closeModal();
                }}
                variant={ selectedDataToLoad ? 'contained' : 'text' }>
                Load data: { selectedDataToLoad?.replace(PROGRESS_TRACKER_NAMESPACE, '') || 'None selected' }
            </Button>
            <br />
            <ButtonGroup orientation="vertical">
            {
                storedItems.map(name =>
                    <Button onClick={() => setSelectedDataToLoad(name)}>{name.replace(PROGRESS_TRACKER_NAMESPACE, '')}</Button>)
            }
            </ButtonGroup>
            <Typography><em>Coming soon - </em>save your progress tracking data to a RedisCloud instance, so you can share saved progress.</Typography>
        </LoadFormContainer>
    </Dialog>;
};
