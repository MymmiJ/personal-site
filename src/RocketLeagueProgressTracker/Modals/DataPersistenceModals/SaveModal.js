import { Button, Dialog, FormGroup, FormHelperText, Input, Typography } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { SavedLocalFiles } from "../../ProgressTracker/DataPersistence/SavedLocalFiles";

const SaveFormContainer = styled.div`
    padding: 12px;
`;

// const SAVE_TARGETS = {
//     LOCAL: 'local',
//     REDIS: 'redis',
//     CUSTOM: 'custom',
// }

const ERROR_NO_SAVE_NAME = 'Please fill out a name for your saved data';

export const PROGRESS_TRACKER_NAMESPACE = '__rocket_league_progress_tracker_'

export const SaveModal = ({ data, showModal, closeModal }) => {
    const [saveName, setSaveName] = useState('');
    const [customValidity, setCustomValidity] = useState(ERROR_NO_SAVE_NAME);
    // const [saveTarget, setSaveTarget] = useState(SAVE_TARGETS.LOCAL);

    const resetAndQuit = () => {
        setSaveName('');
        setCustomValidity(ERROR_NO_SAVE_NAME);
        closeModal();
    };

    const onSubmit = () => {
        if(customValidity === '') {
            try {
                window.localStorage.setItem(
                    `${PROGRESS_TRACKER_NAMESPACE}${saveName}`,
                    JSON.stringify(data),
                )
            } catch(e) {
                console.error(e);
                setCustomValidity(e);
                return;
            }
            resetAndQuit();
        }
    };

    return <Dialog
            PaperProps={{ style: { width: '40%' } }}
            open={showModal}
            onClose={resetAndQuit}
        >
        <SaveFormContainer>
            <h2>Save Locally</h2>
            <Typography>Save your progress tracking data locally in your browser.</Typography>
            <FormGroup style={{ marginTop: '12px', marginBottom: '12px' }}>
                <Input
                    value={saveName}
                    helperText={customValidity}
                    onChange={({ target: { value } }) => {
                        setSaveName(value);
                        if(value.length > 0) {
                            setCustomValidity('');
                        } else {
                            setCustomValidity(ERROR_NO_SAVE_NAME);
                        }
                    }} />
                <FormHelperText error={customValidity !== ''}>{customValidity}</FormHelperText>
                <Button type="submit" onClick={onSubmit}>Save</Button>
            </FormGroup>
            <Typography><em>Coming soon - </em>save your progress tracking data to a RedisCloud instance, so you can share saved progress.</Typography>
            <h2>Saved Progress Trackers</h2>
            <SavedLocalFiles />
        </SaveFormContainer>
    </Dialog>;
};
